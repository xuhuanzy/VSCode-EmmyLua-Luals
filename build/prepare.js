import { existsSync, mkdirSync } from "fs";
import decompress from "decompress";
import decompressTarGz from "decompress-targz";
import config from "./config.json" with { type: "json" };
import { downloadTo } from "./util.js";

const args = process.argv;

async function downloadDepends() {
    await Promise.all([
        downloadTo(
            `${config.newLanguageServerUrl}/${config.newLanguageServerVersion}/${args[2]}`,
            `temp/${args[2]}`
        ),
        // revert wrong url and path
        // downloadTo(`${newLanguageServerSchemaUrl}`, schemaPath),
    ]);
}

async function build() {
    if (!existsSync("temp")) {
        mkdirSync("temp");
    }

    await downloadDepends();

    // new ls
    if (args[2].endsWith(".tar.gz")) {
        await decompress(`temp/${args[2]}`, `server/`, {
            plugins: [decompressTarGz()],
        });
    } else if (args[2].endsWith(".zip")) {
        await decompress(`temp/${args[2]}`, `server/`);
    }
}

build().catch(console.error);
