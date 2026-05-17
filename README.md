# PROMEIA · 普罗米娅 粉丝向展示页

> 《绝区零》2.8 版本 S 级冰属性异常代理人 · 坎卜斯黑枝裁决官「普罗米娅」的粉丝向单页展示，纯前端三件套打造，致敬 ZZZ 都市潮酷美学与处刑式裁决主题。

[![Live Preview](https://img.shields.io/badge/LIVE-zzz--promeia.vercel.app-7af6ff?style=for-the-badge&logo=vercel&logoColor=white&labelColor=05060a)](https://zzz-promeia.vercel.app/)
[![GitHub](https://img.shields.io/badge/SOURCE-Magicdover%2FZZZ--Promeia-9b6bff?style=for-the-badge&logo=github&logoColor=white&labelColor=05060a)](https://github.com/Magicdover/ZZZ-Promeia)
[![License](https://img.shields.io/badge/USE-Fan--Made%20%2F%20Non--Commercial-ff3aa5?style=for-the-badge&labelColor=05060a)](#十一致谢与免责)

**🌐 在线访问**：<https://zzz-promeia.vercel.app/>

---

## 一、项目简介

本项目是为《绝区零》（Zenless Zone Zero）中 **普罗米娅（Promeia）** 制作的单页粉丝展示站点。围绕角色的三大关键词——**冰属性处刑者**、**坎卜斯黑枝裁决官**、**外环清扫者**——构建出一份模拟"内部档案 / 案件卷宗"的沉浸式浏览体验。

- **风格定位**：ZZZ 原生 UI 潮酷 + 故障艺术 + 处刑式裁决
- **核心色板**：冰蓝 `#7af6ff` × 深紫 `#6a32d6` × 霓虹洋红 `#ff3aa5` × 漆黑 `#05060a`
- **字体语言**：`Orbitron` / `Rajdhani`（标题与数据）+ `Noto Sans SC`（中文正文）+ `Share Tech Mono`（HUD 与代号）

---

## 二、技术栈

| 类别 | 选用 |
| --- | --- |
| 结构 | 原生 HTML5 |
| 样式 | 原生 CSS3（自定义属性、Grid、Flex、3D Transform、clip-path） |
| 交互 | 原生 JavaScript（ES2017，IIFE，无框架、无依赖） |
| 字体 | Google Fonts CDN |
| 媒体 | 本地 `.mp4` 视频 + 本地图片 23 张 |

**零依赖**，浏览器直接打开即可运行（推荐通过本地静态服务以确保视频自动播放）。

---

## 三、目录结构

```
4.7-ZZZ-Promeia-2/
├── index.html                  # 页面骨架与各章节结构
├── style.css                   # 完整视觉与动效样式
├── script.js                   # 交互逻辑（光标 / 画廊 / 灯箱 / HUD）
├── Dockerfile                  # 容器构建文件（nginx:alpine）
├── nginx.conf                  # nginx 站点配置
├── .dockerignore               # Docker 构建忽略清单
├── vercel.json                 # Vercel 部署配置（缓存 / 安全头）
├── README.md                   # 当前文件
├── 提示词.txt                  # 原始需求描述
└── images/                     # 角色图片素材（23 张，含 Hero 背景 LOALO.jpg）
    ├── 142618475_p0.jpg
    ├── 142755332_p1.png
    ├── ...
    ├── PROMEIA.webp            # 终章背景主图
    ├── MY Promeia.jpg          # 档案立绘
    ├── 阵营徽章.png             # 坎卜斯黑枝徽章
    └── ...
```

---

## 四、章节构成

页面采用纵向滚动叙事，共五大章节，配合左侧/顶部 HUD 索引与滚动激活：

### 00 · HERO  首屏
- **Hero 背景**：使用 `images/LOALO.jpg` 作为全屏背景（线上仓库版本，便于轻量部署）
- 缓慢 Ken Burns 缩放动效，配合多层覆盖：径向紫 / 冰蓝渐变光晕、网格、扫描遮罩
- **三层错位 Glitch 故障标题** "PROMEIA"（白主色 + 冰蓝上残影 + 洋红下残影）
- 22 条自上而下飘落的伪数据流（`KRAMPUS://SCAN_OK` 等）
- 四角 UI 切角 + 5 格底部数据条（HEIGHT / FACTION / ELEMENT / WEAPON / RANK）
- 滚动提示动效
- 💡 **可选视频背景**：若需还原最初的视频版 Hero，将视频文件放入 `videos/` 目录（默认被 `.gitignore` 忽略，本地保留），并把 `index.html` 中的 `<img class="hero-video">` 替换为 `<video class="hero-video" autoplay muted loop playsinline><source src="videos/xxx.mp4"></video>` 即可，JS 与样式已自动兼容

### 01 · DOSSIER  角色档案
- 左侧立绘卡：角框 + 扫描光带循环 + `SUBJECT_ID` 标签
- 右侧 6 格信息网格 + 5 条战斗数值进度条（进入视口后才动画填充）
- 坎卜斯黑枝徽章卡 + 角色引言卡

### 02 · CHARM  魅力解析
- 三张卡片：**冰封·处刑式裁决 / 镣锁·与赦罪同行 / 外环·神秘的清扫者**
- 悬停展开详细解析文本
- 所有段落两端对齐（`text-align: justify`）

### 03 · GALLERY  立体卷宗
- **3D Coverflow** 轮播 17 张图（`rotateY + translate3d` 透视）
- 支持：◂▸ 按钮 / ← → 键盘 / 滚轮 / 鼠标拖拽 / 触屏滑动 / 点击切换
- **灯箱（Lightbox）**：点击居中卡片打开全屏查看，支持左右切换、键盘、滑动、Esc 关闭
- 底部 `FRAME` 元信息条

### 04 · VERDICT  最终裁决（尾声）
- 主图 Ken Burns 缓动背景 + 双层遮罩
- 居中的致敬段落 + Glitch 收尾签章
- 版权与免责声明

### 全局 HUD
- **顶栏**：徽章 / 案件编号 / 主导航 / 实时时钟（REC·LIVE FEED 闪烁）
- **左侧索引**：滚动激活高亮，IntersectionObserver 同步
- **自定义鼠标**：荧光圆圈 + 洋红内点，悬停可交互元素时放大变色
- **自定义滚动条**：透明轨道 + 冰蓝紫洋红三段渐变滑块 + 外发光
- **全局遮罩**：扫描线 / 噪点纹理 / 暗角

---

## 五、设计语言

| 元素 | 表现 |
| --- | --- |
| 切角 | `clip-path: polygon(...)` 制造 ZZZ 式按钮与边框斜切 |
| Glitch | 三层 `data-text` 伪元素 + `clip-path` 残影 + 触发式 keyframes |
| 网格 | 64px 等间距网格 + 顶/底 mask 渐隐 |
| 数据流 | 随机文本节点垂直坠落，模拟终端日志 |
| 角框 | T/B + L/R 四角硬切线条，HUD/卡片/灯箱通用 |
| 渐变 | 冰蓝 → 紫 → 洋红，贯穿标题、滚动条、按钮、数据条 |

---

## 六、响应式适配

| 断点 | 行为 |
| --- | --- |
| `> 1180px` | 桌面完整布局，左侧索引、双栏档案、三栏魅力卡 |
| `820 ~ 1180px` | 档案改单栏，魅力卡 2 栏，隐藏侧索引 |
| `≤ 820px` | 移动端：禁用自定义鼠标 / 顶部导航简化 / 单栏 / 画廊缩放至 220×330 / 数据格 2×N 排布 |

---

## 七、改版进度

### V1.0 · 初版构建
- 创建三件套分离结构（`index.html` / `style.css` / `script.js`）
- 23 张图片自动归档至 `images/` 文件夹
- 实现首屏视频、Glitch 标题、HUD 顶栏、左侧索引、自定义光标
- 实现 01 档案 / 02 魅力 / 03 画廊 / 04 终章 全部章节
- 实现 3D Coverflow 画廊：17 张图预加载、滚轮/键盘/拖拽/触屏多种交互、自动轮播
- 全段落两端对齐（`text-align: justify; text-align-last: left`）
- 桌面/平板/移动端三档响应式

### V1.1 · 画廊体验升级 & 终章排版修正
- **🐛 问题 1**：画廊浏览卡顿
  - 移除每张卡片上的 `filter: blur()` 与 `filter: brightness()`（最大元凶）
  - 卡片定位由 `translate(-50%,-50%)` 改为 `margin` 负偏移，减少每帧 transform 计算
  - 超出可视范围（|offset| > 4）卡片直接 `visibility:hidden`
  - 过渡时间 0.9s → 0.55s
  - 加上 `will-change`、`backface-visibility: hidden`、`contain: paint`
- **✨ 新增**：图片点击查看（Lightbox 灯箱）
  - 全屏查看 + 霓虹角框 + 内发光阴影 + 背景模糊
  - 支持按钮 / 键盘 / 拖拽 / 触屏滑动 / 空白区域点击 / Esc 关闭
  - 切换带左右滑入淡出动效，预加载相邻图避免抖动
  - 与外层 Coverflow 索引双向同步
- **🐛 问题 2**：终章段落两端对齐应居中
  - `.verdict-text` 改为 `text-align: center; text-align-last: center;`

### V1.2 · 性能深度优化 & 首屏排版修正
- **🐛 问题**：画廊仍存在卡顿
  - 扫描线移除 `mix-blend-mode: overlay`（强制整页每帧合成的隐性元凶）
  - 噪点遮罩 `transform` 抖动动画移除，保留静态颗粒
  - 卡片角框移除 4 × 17 = 68 个 `drop-shadow` 滤镜
  - 卡片图像移除 `saturate / contrast` 滤镜
  - `box-shadow` 进一步降级
  - 渲染范围由 ±4 收紧至 ±3，其余完全隐藏
  - 透视深度 stepZ 200 → 150，旋转角度 50° → 42°
  - 过渡 0.55s → 0.42s
  - 画廊离开视口时自动停止轮播 `setInterval`
  - **首屏视频离开视口时自动 `pause()`**（节省持续解码开销）
- **🐛 问题**：首屏副标题段落应居中
  - `.hero-desc` 改为 `text-align: center; text-align-last: center;`

### V1.3 · 滚动条主题化
- **🎨 新增**：右侧滚动条与项目视觉统一
  - 轨道完全透明
  - 滑块采用冰蓝 → 紫 → 洋红三段渐变 + 外发光
  - 悬停时颜色变亮、发光叠加
  - Firefox `scrollbar-color` / `scrollbar-width` 同步生效

---

## 八、如何运行

由于首屏使用了本地视频文件，浏览器自动播放策略要求页面以 `http://` 或 `https://` 协议加载（直接双击 `file://` 也能跑，但某些浏览器会阻止自动播放）。推荐：

```bash
# 进入项目目录
cd 4.7-ZZZ-Promeia-2

# Python 3
python -m http.server 8000

# 或 Node.js
npx serve .
```

浏览器访问 `http://localhost:8000` 即可。

**推荐浏览器**：最新版 Chrome / Edge / Firefox / Safari（需支持 `clip-path`、`backdrop-filter`、`scrollbar-color`）。

---

## 九、Docker 部署

项目自带 `Dockerfile`、`nginx.conf` 与 `.dockerignore`，基于轻量级 `nginx:alpine` 镜像，开箱即用。

### 9.1 构建镜像

```bash
# 在项目根目录执行
docker build -t promeia-tribute:latest .
```

### 9.2 运行容器

```bash
# 前台运行（用于调试）
docker run --rm -p 8080:80 promeia-tribute:latest

# 后台常驻
docker run -d --name promeia --restart unless-stopped -p 80:80 promeia-tribute:latest
```

打开 `http://localhost:8080`（或服务器对应端口）即可访问。

### 9.3 nginx 已包含的优化

- **gzip** 压缩 HTML / CSS / JS / SVG 等文本资源
- **视频字节范围请求**（`Accept-Ranges: bytes`），支持拖动进度条与流式播放
- **静态资源长缓存**（图片/视频/字体 30 天，CSS/JS 7 天，HTML 不缓存）
- **UTF-8 字符集**，保障中文文件名（如 `普罗米娅 2026-05-16.mp4`）正确解析
- 基础安全头：`X-Content-Type-Options` / `X-Frame-Options` / `Referrer-Policy`
- 隐藏 nginx 版本号

### 9.4 部署到云端

镜像可直接推送至任意容器镜像仓库后部署到：

- **国内**：阿里云 ACR / 腾讯云 TCR + ACK / TKE / Serverless 容器
- **国际**：Docker Hub / GHCR + Fly.io / Railway / Render / Google Cloud Run / AWS ECS

示例（推送至 Docker Hub）：

```bash
docker tag promeia-tribute:latest <your-username>/promeia-tribute:latest
docker push <your-username>/promeia-tribute:latest
```

### 9.5 反向代理 / HTTPS

若部署在 80 端口已被占用的服务器，建议前置 Caddy / Traefik / Nginx 做 TLS 终止与域名转发，例如：

```bash
docker run -d --name promeia -p 127.0.0.1:8080:80 promeia-tribute:latest
# 然后由宿主机的 Caddy 反代 8080 端口并自动签发证书
```

### 9.6 部署到 Vercel（推荐：零配置自动部署）

项目根目录已包含 `vercel.json`（缓存策略 + 安全头，与 nginx 配置对齐）。两种方式任选其一：

**方式 1 · GitHub 联动（推荐）**

1. 访问 https://vercel.com/new
2. Import 选择 GitHub 仓库 `Magicdover/ZZZ-Promeia`
3. Framework Preset 选 **Other**（纯静态），其余保持默认，点 **Deploy**
4. 约 10 秒后即可获得 `https://zzz-promeia.vercel.app`（或自定义域名）形式的访问地址
5. 之后每次 `git push origin main` 都会自动触发部署

**方式 2 · Vercel CLI**

```bash
# 一次性 npx 调用，无需全局安装
npx vercel        # 首次会引导浏览器登录
npx vercel --prod # 直接发布到生产环境
```

**方式 3 · Vercel 拖拽部署**

将整个项目根目录（除 `videos/`）打包成 zip 上传到 https://vercel.com/new 也可，但失去自动部署能力，不推荐。

---

## 十、键鼠/触控操作速查

| 操作 | 效果 |
| --- | --- |
| 滚轮 / 滚动条 | 浏览页面 |
| 点击顶栏 / 侧栏导航 | 平滑跳转章节 |
| 悬停魅力卡片 | 展开详细文本 |
| 点击画廊卡片（居中） | 打开灯箱查看大图 |
| 点击画廊卡片（非居中） | 切换为当前居中 |
| 画廊：滚轮 / 拖拽 / ←→ | 切换图片 |
| 灯箱：← → | 上一张 / 下一张 |
| 灯箱：Esc / 点击空白 | 关闭 |
| 移动端 | 滑动手势支持画廊与灯箱切换 |

---

## 十一、致谢与免责

- 角色「普罗米娅 / Promeia」、《绝区零 / Zenless Zone Zero》及相关视觉素材的全部版权归 **米哈游（miHoYo / HoYoverse）** 所有。
- 本项目为**非商业的粉丝向二次创作**致敬页，不参与任何盈利与分发。
- 所用素材均为公开来源的爱好者画作或玩家社区分享，如有侵权请联系移除。

> "镣锁，是我背负的过去；弯刀，是我裁定的现在。"
> ——`PROMEIA / 内部录音 #07`

---

**// END OF FILE //**
