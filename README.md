# EmmyLua for VSCode

![logo](/res/logo.png)

EmmyLua is a powerful Lua language support extension for Visual Studio Code, providing intelligent code completion, debugging, and analysis capabilities.

## 📋 Quick Links

- 📖 [Documentation](https://github.com/EmmyLuaLs/emmylua-analyzer-rust/blob/main/docs/config/emmyrc_json_EN.md)
- 📝 [Changelog (English)](CHANGELOG.md)
- 📝 [更新日志 (中文)](CHANGELOG_CN.md)
- 🔧 [Language Server (Rust)](https://github.com/CppCXY/emmylua-analyzer-rust)
- 💬 QQ Group: `1063151386`

[![Online EmmyLua Doc](https://img.shields.io/badge/emmy-doc-46BC99.svg?style=flat-square)](https://emmylua.github.io)
[![donate](https://img.shields.io/badge/donate-emmy-FF69B4.svg?style=flat-square)](https://emmylua.github.io/donate.html)
[![加入QQ群](https://img.shields.io/badge/chat-QQ群-46BC99.svg?style=flat-square)](https://qm.qq.com/q/umy5IBl0NU)

## 🚀 Features

- **Smart Code Completion**: Intelligent auto-completion with type inference
- **Real-time Diagnostics**: Error detection and warnings as you type
- **Cross-platform**: Works on Windows, macOS, and Linux
- **LSP-based**: Built on Language Server Protocol for reliability

## 📦 Related Extensions

Enhance your Lua development experience with these complementary extensions:

- [EmmyLuaCodeStyle](https://marketplace.visualstudio.com/items?itemName=CppCXY.emmylua-codestyle) - Code formatting and style enforcement
- [EmmyLuaUnity](https://marketplace.visualstudio.com/items?itemName=CppCXY.emmylua-unity) - Unity3D integration

## 🔧 Configuration

### Project Configuration

Create a `.emmyrc.json` file in your project root to customize behavior:

```json
{
  "diagnostics": {
    "undefined-global": false
  }
}
```

For detailed configuration options, see:
- [English Documentation](https://github.com/CppCXY/emmylua-analyzer-rust/blob/main/docs/config/emmyrc_json_EN.md)
- [中文文档](https://github.com/CppCXY/emmylua-analyzer-rust/blob/main/docs/config/emmyrc_json_CN.md)


## ❓ Frequently Asked Questions

<details>
<summary><strong>Why do I see many "undefined variable" warnings?</strong></summary>

**English**: Create `.emmyrc.json` in your project root and disable the `undefined-global` diagnostic:
```json
{
  "diagnostics": {
    "undefined-global": false
  }
}
```

**中文**: 在项目根目录创建 `.emmyrc.json` 文件并禁用 `undefined-global` 诊断。
</details>

<details>
<summary><strong>Can I use EmmyLua analysis in other editors?</strong></summary>

**English**: Yes! EmmyLua uses a standard Language Server Protocol implementation. Any LSP-compatible editor can use it.

**中文**: 可以！EmmyLua 基于标准的语言服务器协议，任何支持 LSP 的编辑器都可以使用。
</details>

<details>
<summary><strong>Why use .emmyrc.json instead of VSCode settings?</strong></summary>

**English**: Project-specific configuration files work across different editors and platforms without requiring IDE-specific setup.

**中文**: 项目配置文件可以跨平台和编辑器使用，无需在每个 IDE 中重复配置。
</details>

<details>
<summary><strong>Why was the language server rewritten in Rust?</strong></summary>

**English**: The Rust implementation provides better performance, memory safety, and cross-platform compatibility compared to the previous .NET and Java versions.

**中文**: Rust 实现提供了更好的性能、内存安全性和跨平台兼容性。（作者说：因为我想试试 rust 😄）
</details>

## 🤝 Contributing

We welcome contributions! Please feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Join our QQ group for discussions

## 📄 License

This project is licensed under the MIT License.
