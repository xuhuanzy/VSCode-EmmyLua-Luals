import { LanguageConfiguration, IndentAction, AutoClosingPair, SyntaxTokenType } from "vscode";
import { workspace } from "vscode";
export class LuaLanguageConfiguration implements LanguageConfiguration {
    public onEnterRules: any[];

    public autoClosingPairs: AutoClosingPair[] = [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: "'", close: "'", notIn: [SyntaxTokenType.String] },
        { open: '"', close: '"', notIn: [SyntaxTokenType.String] },
        { open: "[=", close: "=]" },
        { open: "[==", close: "==]" },
        { open: "[===", close: "===]" },
        { open: "[====", close: "====]" },
        { open: "[=====", close: "=====]" },
    ];

    constructor() {
        this.onEnterRules = [
            {
                beforeText: /\)\s*$/,
                afterText: /^\s*end\b/,
                action: {
                    indentAction: IndentAction.IndentOutdent,
                }
            },
            {
                beforeText: /\b()\s*$/,
                afterText: /^\s*end\b/,
                action: {
                    indentAction: IndentAction.IndentOutdent,
                }
            },
            {
                beforeText: /\b(repeat)\s*$/,
                afterText: /^\s*until\b/,
                action: {
                    indentAction: IndentAction.IndentOutdent,
                }
            },

        ];

        const config = workspace.getConfiguration(
            undefined,
            workspace.workspaceFolders?.[0]
        );
        // 是否自动补全注释
        const completeAnnotation = config.get<boolean>('emmylua.language.completeAnnotation', true);
        if (completeAnnotation) {
            this.onEnterRules = [
                {
                    beforeText: /^\s*---@/,
                    action: {
                        indentAction: IndentAction.None,
                        appendText: "---@"
                    }
                },
                {
                    beforeText: /^\s*--- @/,
                    action: {
                        indentAction: IndentAction.None,
                        appendText: "--- @"
                    }
                },
                {
                    beforeText: /^\s*--- /,
                    action: {
                        indentAction: IndentAction.None,
                        appendText: "--- "
                    }
                },
                {
                    beforeText: /^\s*---/,
                    action: {
                        indentAction: IndentAction.None,
                        appendText: "---"
                    }
                },
                ...this.onEnterRules
            ];
        }
    }
}