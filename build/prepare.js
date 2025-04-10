const fs = require('fs');
const download = require('download');
const decompress = require('decompress')
const decompressTargz = require('decompress-targz')
const config = require('./config').default;
const args = process.argv;

async function downloadTo(url, path) {
    return new Promise((r, e) => {
        const d = download(url);
        d.then(r).catch(err => e(err));
        d.pipe(fs.createWriteStream(path));
    });
}

async function downloadDepends() {
    await Promise.all([
        downloadTo(`${config.newLanguageServerUrl}/${config.newLanguageServerVersion}/${args[2]}`, `temp/${args[2]}`)
    ]);
}

async function build() {
    if (!fs.existsSync('temp')) {
        fs.mkdirSync('temp')
    }

    await downloadDepends();

    // new ls
    if (args[2].endsWith('.tar.gz')) {
        await decompress(`temp/${args[2]}`, `server/`, { plugins: [decompressTargz()] });
    } else if (args[2].endsWith('.zip')) {
        await decompress(`temp/${args[2]}`, `server/`);
    }
}

build().catch(console.error);
