![logo](/res/logo.png)
# EmmyLua for VSCode Adapt Luals

更倾向于`Luals`使用习惯的`EmmyLua-Rust`.

QQ交流群：`1063151386` (最新版本以及部分视频演示在群文件中下载)

[![Online EmmyLua Doc](https://img.shields.io/badge/emmy-doc-46BC99.svg?style=flat-square)](https://emmylua.github.io)
[![donate](https://img.shields.io/badge/donate-emmy-FF69B4.svg?style=flat-square)](https://emmylua.github.io/donate.html)
[![加入QQ群](https://img.shields.io/badge/chat-QQ群-46BC99.svg?style=flat-square)](https://qm.qq.com/q/umy5IBl0NU)

[更新日志](CHANGELOG_CN.md)

[CHANGELOG](CHANGELOG.md)

[EmmyLua Langauge Server](https://github.com/CppCXY/emmylua-analyzer-rust)

## FAQ (中文 & English)

**Q (中文)**: vscode-emmylua 全家桶还有哪些？  
**Q (English)**: Which other extensions are included in the vscode-emmylua suite?  
**A (中文)**: [EmmyLuaCodeStyle](https://marketplace.visualstudio.com/items?itemName=CppCXY.emmylua-codestyle), [EmmyLuaUnity](https://marketplace.visualstudio.com/items?itemName=CppCXY.emmylua-unity)  
**A (English)**: Install [EmmyLuaCodeStyle](https://marketplace.visualstudio.com/items?itemName=CppCXY.emmylua-codestyle) and [EmmyLuaUnity](https://marketplace.visualstudio.com/items?itemName=CppCXY.emmylua-unity)  

**Q (中文)**: 为什么打开项目后会有大量未定义变量警告？  
**Q (English)**: Why do many undefined variable warnings appear after opening the project?  
**A (中文)**: 未定义的全局变量会触发提示，可在项目根目录创建 .emmyrc.json 并禁用 undefined-global  
**A (English)**: Undefined globals trigger warnings; create .emmyrc.json in your project root and disable undefined-global  

**Q (中文)**: 我能否在其他平台使用 vscode-emmylua 的代码分析？  
**Q (English)**: Can I use vscode-emmylua’s code analysis on other platforms?  
**A (中文)**: 可以，它基于 [emmylua-analyzer-rust](https://github.com/CppCXY/emmylua-analyzer-rust)，兼容支持 LSP 的客户端  
**A (English)**: Yes, it uses [emmylua-analyzer-rust](https://github.com/CppCXY/emmylua-analyzer-rust), which is a standard LSP  

**Q (中文)**: 为什么不用 VSCode 配置，而是用 .emmyrc.json？  
**Q (English)**: Why use .emmyrc.json instead of VSCode settings?  
**A (中文)**: 方便在其他平台上使用，无需在每个 IDE 中重复配置  
**A (English)**: It works across platforms without extra IDE configuration  

**Q (中文)**: 为什么用 Rust 重写语言服务器？放弃.net和java语言服务器 
**Q (English)**: Why rewrite the language server in Rust? and abandon the .NET and Java servers?
**A (中文)**: 因为我想试试 rust
**A (English)**: I want to try rust

**Q (中文)**: 为什么没有文档？  
**Q (English)**: Why is there no documentation?  
**A (中文)**: 配置文件文档见 https://github.com/CppCXY/emmylua-analyzer-rust/blob/main/docs/config/emmyrc_json_CN.md  
**A (English)**: See configuration docs at https://github.com/CppCXY/emmylua-analyzer-rust/blob/main/docs/config/emmyrc_json_EN.md  

## 编译

```bash
vsce package
```