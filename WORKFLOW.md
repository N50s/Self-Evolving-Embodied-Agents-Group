# 网站日常维护与更新指南 (Website Maintenance Guide)

这份文档将指导你如何在未来独立地进行各个版块的内容更新、样式微调以及最终的网站发布。

## 1. 核心文件与结构介绍

你的网站是由 Jekyll 引擎驱动的，主要的代码和数据被分成了以下几个核心模块：

- `_data/`：存放了网页里循环展示的**纯数据内容**（不需要改代码，只需填空）。
  - `news.yml`：新闻动态数据。
  - `publications.yml`：所有的代表性成果数据。
- `_layouts/`：存放了页面的**公共排版框架**。
  - `default.html`：网站的基础框架（包含吸顶导航栏、毛玻璃特效、底部版权、中英文切换的 JavaScript 等）。
- `assets/images/`：所有的图片资产。
  - `team/`：团队成员的头像照片。
  - `publications/`：论文的预览展示图。
- `index.html`：**网站首页结构**。包含课题组介绍、Team 成员列表和 Join Us 卡片。

---

## 2. 团队成员 (Team) 管理

团队成员的展示代码直接写在根目录的 `index.html` 的 `<div class="team-section">` 区域内。

### 想要添加或修改头像？
1. 将照片存入 `assets/images/team/` 文件夹（建议为正方形或比例不要太极端的长方形，jpg/png 均可）。
2. 在 `index.html` 里找到对应人的 `<img>` 标签，修改 `src` 路径。

**关键技巧：如何调整头像由于自动圆形裁剪导致的“脸部偏离”？**
由于 CSS 使用了 `object-fit: cover` 强制裁成正圆，如果人脸不在照片正中心，你需要去代码里微调“聚焦点”坐标：
```html
<img src="..." alt="..." class="team-photo" style="object-position: 70% 20%;">
```
- 第一个数字 `70%`：代表**左右**的偏移（0%代表死死贴住左边，100%代表贴住最右侧）。如果是竖图，这个数字怎么改都没用。
- 第二个数字 `20%`：代表**上下**的偏移（0%是对准头顶，100%是对准脚底）。如果是横平图，这个数字怎么改都没用。

---

## 3. 代表性成果 (Publications) 管理

所有的科研成果都集中存放在 `_data/publications.yml`，你**绝对不需要去改复杂的 HTML** 来新增论文，只需要在这个文件里“照猫画虎”地填空即可。

### 插入新论文的固定格式（注意缩进对齐）：
```yaml
- image: "new-paper-2026.png" # 图片放在 assets/images/publications/
  selected: true # true: 首页和子页都展示; false: 仅在"全部成果"子页展示
  date: "2026-12-01" # 关键：网页将严格根据这里的年月进行自动倒序排列
  title: "论文的完整英文标题"
  venue_html: "<strong>会刊缩写</strong> (例如 CCF-A, Oral)"
  links:
    - label: "Project"
      url: "https://你的项目主页链接..."
    - label: "arXiv"
      url: "https://arxiv.org/abs/..."
    - label: "Code"
      url: "https://github.com/..."
  abstract: "论文摘要简介，支持直接写文字。"
```

> **特别提醒：自动更新日期脚本**
> 只要你填写的链接里有一个是 `label: "arXiv"` 的 arxiv 官网链接，你连 `date` 都不用自己去查！
> 直接在终端运行 `python3 update_dates.py`，这个爬虫脚本会自动帮你抓取 arXiv 最新发布时间并写到 yml 里供排序使用！

---

## 4. 近期动态 (News) 管理

存放在 `_data/news.yml` 中。格式同样非常简单，且支持双语分离：
```yaml
- date: "2026.12.01"
  en_html: "Our new paper was accepted to CVPR!"
  zh_html: "祝贺！我们的新论文被 CVPR 2026 接收。"
```

---

## 5. 样式微调手册 (Advanced CSS)

如果你临时起意想微调网页的外观，所有的核心设计参数都在 `_layouts/default.html` 文件顶部的 `<style>` 标签内。

- **修改毛玻璃导航栏的透明度**：搜索 `background-color: rgba(255, 255, 255,`，把后面的数字 `0.9` 改成 `0.5`（更透明） 或 `1.0`（纯白不透明）。
- **修改文字大小或边距**：搜索诸如 `font-size` 或 `margin-bottom` 属性即可。

---

## 6. 如何发布你的网站 (GitHub Pages 部署)

你的网站目前完美搭载在原生的 GitHub Pages 框架中，**你没有任何服务器或域名的续费烦恼**。

### 标准发布流程 (Push to Deploy)
你在本地（`http://127.0.0.1:4000/Self-Evolving-Embodied-Agents-Group/`）确认一切修改和新增文字都无误之后，只需要在终端运行这三条终极命令：

```bash
# 这一条命令代表：将所有增加的新图片和改动的文字添加到打包车中并贴上提交标签
git add . && git commit -m "Update publications and team members"

# 这一条命令代表：把代码车推送到云端仓库
git push
```

**推送完毕后需要做什么？**
**什么都不需要做。** 你只需要去泡一杯茶，等待 1~2 分钟。GitHub 后台会自动拦截你的推送，帮你把它实时编译成网页并强行覆盖线上的旧网站。
2分钟后刷新你的网址：`https://[你的GitHub账号].github.io/Self-Evolving-Embodied-Agents-Group/`，你的最新成果就会展示在全世界面前了。
