'use strict';

import * as vscode from 'vscode';
import * as path from "path";
import * as net from "net";
import * as process from "process";

import { LanguageClient, LanguageClientOptions, ServerOptions, StreamInfo } from "vscode-languageclient/node";
import { LuaLanguageConfiguration } from './languageConfiguration';
import { EmmyContext } from './emmyContext';
import * as os from 'os';
import * as fs from 'fs';
import { IServerLocation, IServerPosition } from './lspExt';

export let ctx: EmmyContext;

export function activate(context: vscode.ExtensionContext) {
    console.log("emmy lua actived!");

    // 注册动态JSON验证
    context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider('emmyrc-schema', new EmmyrcSchemaContentProvider(context)));

    ctx = new EmmyContext(
        process.env['EMMY_DEV'] === "true",
        context
    );

    context.subscriptions.push(vscode.commands.registerCommand("emmy.stopServer", stopServer));
    context.subscriptions.push(vscode.commands.registerCommand("emmy.restartServer", restartServer));
    context.subscriptions.push(vscode.commands.registerCommand("emmy.showReferences", showReferences));
    context.subscriptions.push(vscode.languages.setLanguageConfiguration("lua", new LuaLanguageConfiguration()));
    startServer();
    return {
        reportAPIDoc: (classDoc: any) => {
            ctx?.client?.sendRequest("emmy/reportAPI", classDoc);
        }
    }
}

export function deactivate() {
    ctx.dispose();
}




async function startServer() {
    doStartServer().then(() => {
    }).catch(reason => {
        ctx.setServerStatus({
            health: "error",
            message: `Failed to start "EmmyLua" language server!\n${reason}`,
            command: "emmy.restartServer"
        })
    });
}

async function doStartServer() {
    const context = ctx.extensionContext;
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: ctx.LANGUAGE_ID }],
        initializationOptions: {},
        markdown: {
            isTrusted: true,
            supportHtml: true,
        },
    };

    let serverOptions: ServerOptions;
    if (ctx.debugMode) {
        // The server is a started as a separate app and listens on port 5007
        const connectionInfo = {
            port: 5007
        };
        serverOptions = () => {
            // Connect to language server via socket
            let socket = net.connect(connectionInfo);
            let result: StreamInfo = {
                writer: socket,
                reader: socket as NodeJS.ReadableStream
            };
            socket.on("close", () => {
                console.log("client connect error!");
            });
            return Promise.resolve(result);
        };
    } else {
        const config = vscode.workspace.getConfiguration(
            undefined,
            vscode.workspace.workspaceFolders?.[0]
        );
        let configExecutablePath = config.get<string>("emmylua.misc.executablePath")?.trim();
        if (!configExecutablePath || configExecutablePath.length == 0) {
            let platform = os.platform();
            let executableName = platform === 'win32' ? 'emmylua_ls.exe' : 'emmylua_ls';
            configExecutablePath = path.join(context.extensionPath, 'server', executableName);

            if (platform !== 'win32') {
                fs.chmodSync(configExecutablePath, '777');
            }
        }

        serverOptions = {
            command: configExecutablePath,
            args: [],
            options: { env: {} }
        };

        let parameters = config.get<string[]>("emmylua.ls.startParameters");
        if (parameters && parameters.length > 0) {
            serverOptions.args = parameters;
        }

        let globalConfigPath = config.get<string>("emmylua.misc.globalConfigPath")?.trim();
        if (globalConfigPath && globalConfigPath.length > 0) {
            if (!serverOptions.options || !serverOptions.options.env) {
                serverOptions.options = { env: {} }
            }
            serverOptions.options.env['EMMYLUALS_CONFIG'] = globalConfigPath;
        }
    }

    ctx.client = new LanguageClient(ctx.LANGUAGE_ID, "EmmyLua plugin for vscode.", serverOptions, clientOptions);
    ctx.registerProtocol();
    ctx.client.start().then(() => {
        console.log("client ready");
    })
}

function restartServer() {
    const client = ctx.client;
    if (!client) {
        startServer();
    } else {
        client.stop().then(startServer);
    }
}

function showReferences(uri: string, pos: IServerPosition, locations: IServerLocation[]) {
    const u = vscode.Uri.parse(uri);
    const p = new vscode.Position(pos.line, pos.character);
    const vscodeLocations = locations.map(loc =>
        new vscode.Location(
            vscode.Uri.parse(loc.uri),
            new vscode.Range(
                new vscode.Position(loc.range.start.line, loc.range.start.character),
                new vscode.Position(loc.range.end.line, loc.range.end.character)
            )));
    vscode.commands.executeCommand("editor.action.showReferences", u, p, vscodeLocations);
}

function stopServer() {
    ctx.stopServer();
}


/**
 * 用于动态提供 JSON Schema 内容。
 */
class EmmyrcSchemaContentProvider implements vscode.TextDocumentContentProvider {
    private readonly schemaBaseDir: string;

    constructor(context: vscode.ExtensionContext) {
        this.schemaBaseDir = path.join(context.extensionPath, 'syntaxes');
    }

    async provideTextDocumentContent(uri: vscode.Uri): Promise<string> {
        const schemaIdentifier = path.posix.basename(uri.path);
        const locale = vscode.env.language;
        let schemaFileName: string;

        if (schemaIdentifier === 'emmyrc') {
            switch (locale) {
                case 'zh-cn':
                case 'zh-CN':
                case 'zh':
                    schemaFileName = 'schema.zh-cn.json';
                    break;
                case 'en':
                case 'en-US':
                case 'en-GB':
                default:
                    schemaFileName = 'schema.json';
                    break;
            }
        } else {
            return '';
        }

        // 检查schema文件是否存在，如果不存在则使用默认的
        let schemaFilePath = path.join(this.schemaBaseDir, schemaFileName);
        if (!fs.existsSync(schemaFilePath)) {
            schemaFilePath = path.join(this.schemaBaseDir, 'schema.json');
        }

        try {
            return await fs.promises.readFile(schemaFilePath, 'utf8');
        } catch (error: any) {
            return JSON.stringify({
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": "Error Loading Schema",
                "description": `Could not load schema: ${schemaFileName}. Error: ${error.message}.`
            });
        }
    }
}