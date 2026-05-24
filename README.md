# DCN_Review · 数据通信网络期末复习站

> A bilingual (CN/EN) interactive study site for the Data Communication Networks final exam — covering Physical / Link / Network / Transport / Application layers, with exam-focused highlights, worked examples, Winsock socket-programming templates, and per-chapter self-tests.

中英对照、考点高亮、含 Hamming/CRC/Dijkstra/距离向量/TCP 拥塞控制/最小帧长等算法例题与 Winsock Socket 代码模板，每章带自测题。**纯前端，无构建步骤，无依赖。**

## 在线访问 / Live

启用 GitHub Pages 后访问：`https://xingxingchengju-oss.github.io/DCN_Review/`

启用方式：仓库 → **Settings** → **Pages** → Source 选 `Deploy from a branch` → Branch 选 `main` / `/ (root)` → Save。约 1 分钟后链接生效。

## 本地使用 / Local Use

直接双击 `index.html` 即可在默认浏览器中打开，无需任何服务器。

## 内容覆盖 / Coverage

| 章节 | 主题 |
|------|------|
| **Ch 1** | 数字编码 (NRZ/Manchester/AMI)、4B/5B、AM/FM/PM 调制、Nyquist 定理、Shannon-SNR、协议分层、网络拓扑 |
| **Ch 2** | 传输介质分类、无线频谱、传播方式（地波/天波/视距）|
| **Ch 3** | 成帧（字节/位填充）、错误检测/纠正、CRC、Hamming 码、流控、Go-Back-N ARQ |
| **Ch 4** | IPv6、Dijkstra 链路状态、距离向量 (Bellman-Ford)、TCP 三次握手/拥塞控制、UDP |
| **Ch 5** | Socket 编程（C/Winsock，TCP/UDP，含 Echo 示例与代码挖空）|
| **Ch 6** | CSMA/CD 最小帧长公式、二进制指数退避、WLAN/CSMA/CA、隐藏终端 |

## 主要功能 / Features

- ⭐ / ⭐⭐ 标记考试重点与高频考点
- 📝 可展开的完整解题例题
- 💡 难懂概念的中文折叠解释
- 🎯 每章 5–8 道自测题（选择 + 填空），实时反馈与解析
- 💻 代码块一键复制
- 🌙 深浅色切换（自动记忆偏好）
- 🖨 打印友好（Ctrl+P 可导出 PDF）
- 📱 响应式（手机/平板可读）

## 文件结构 / Structure

```
.
├── index.html         首页 / 总览
├── ch1.html ~ ch6.html  各章节页面
├── assets/
│   ├── styles.css     主题、组件样式
│   └── script.js      交互（主题切换、滚动监听、Quiz）
└── README.md
```

## 技术栈 / Tech Stack

- HTML5 + CSS3 (CSS variables for theming)
- Vanilla JavaScript (ES6+, no framework)
- 0 dependencies, 0 build step
- 兼容现代浏览器（Chrome / Edge / Firefox / Safari）

## License / 许可

仅供个人学习与复习使用。内容基于公开 DCN 教材整理，最终请以本课课件原文为准。

---

🎓 祝考试顺利 · Good luck with the exam!
