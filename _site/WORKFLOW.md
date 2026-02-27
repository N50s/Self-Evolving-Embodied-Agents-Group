# 网站日常维护工作流 (Website Maintenance Workflow)

这个文档将指导你如何进行 Jekyll 网站的日常维护，特别是关于存放图片、添加或移除代表性成果（Publications）等操作。

## 1. 文件夹结构介绍

你的网站现在是一个遵循最佳实践的 Jekyll 项目：

- `_data/`：存放了结构化的数据。
  - `news.yml`：新闻动态数据。
  - `publications.yml`：所有的代表性成果数据。
- `_layouts/`：存放了页面的公共布局。
  - `default.html`：网站的基础框架（包含页眉、页脚、导航栏等）。
- `assets/images/publications/`：专门用于存放论文预览图的文件夹。
- `index.html`：网站首页，会展示带有 `selected: true` 标记的精选成果。
- `publications.html`：展示全部论文成果的子页面。

---

## 2. 如何添加一篇新的论文 (Publication)

假设你有一篇新的论文需要添加到网站上：

### 第一步：保存论文图片
将论文的预览图（例如命名为 `new-paper-2026.png`）放入 `assets/images/publications/` 文件夹中。

### 第二步：更新数据文件
打开 `_data/publications.yml`，在文件的最上方（或者你希望它展示的位置）添加以下格式的数据块（注意 YAML 的缩进）：

```yaml
- image: "new-paper-2026.png"
  selected: true # 如果展示在首页设为 true，仅在子页展示设为 false
  date: "2026-12-01" # 关键：网页将根据这里的时间数值进行自动倒序排列（越新的在越上面）
  title: "论文的完整英文标题"
  venue_html: "<strong>会议或期刊名称</strong> (例如 CCF-A)"
  links:
    - label: "Project"
      url: "https://你的项目主页链接..."
    - label: "arXiv"
      url: "https://arxiv.org/abs/..."
    - label: "Code"
      url: "https://github.com/..."
  abstract: "这里是论文的简介或摘要，支持中文或英文。"
```

*如果你不需要某个链接（例如还没开源 Code），直接把关于 Code 的那两行删掉即可。*

**原理解读（进阶操作）：自动获取 arXiv 论文时间**

为了避免每次手动输入日期的麻烦，我为你编写了一个特殊的自动化小工具：`update_dates.py`。
当你在 YAML 中添加好论文后，如果这篇论文包含 arXiv 的链接（`label: "arXiv"`），那么你**其实不需要手动填写 `date`**，而是可以直接在终端运行以下命令：

```bash
python3 update_dates.py
```

这个工具会自动读取你填写的网址，向 arXiv 的官方数据库发起请求，提取真实的发布/更新日期（精确到年月日），然后自动写回你的 `_data/publications.yml` 中！之后网站再编译时，就会依据这个完美的真实日期来进行完美排序。

---

## 3. 如何撤下（隐藏）一篇论文

如果你想将某篇论文从网站上彻底隐藏，你有两种方式：

- **方式一（临时隐藏某篇论文不让它在首页展示，但保留在子页面中）：**
  只需将这篇论文在 `_data/publications.yml` 中的 `selected: true` 改为 `selected: false`。

- **方式二（从网站彻底下架，推荐注释法）：**
  如果不想在任何页面（包括子页面）展示这篇论文，在 `_data/publications.yml` 中，找到对应的论文代码块，在每一行前面加上 `#` 号将其注释掉。如果想恢复，把 `#` 删掉就行了。
  
  ```yaml
  # - image: "old-paper.png"
  #   selected: false
  #   title: "旧论文标题"
  #   venue_html: "..."
  ```

---

## 4. 如何更新“近期动态” (News)

和论文类似，新闻动态存放在 `_data/news.yml` 中。要发布一条新动态，只需在最前面添加：

```yaml
- date: "2026.12.01"
  en_html: "Our new paper was accepted!"
  zh_html: "祝贺！我们的新论文被接收。"
```

---

## 5. 本地预览你的修改

在你修改了图片或者 `.yml` 文件后，如果你当前正在终端运行着：

```bash
bundle exec jekyll serve
```

Jekyll 会**自动检测**到文件的修改，并重新生成网站（注意：如果是修改了 `_config.yml` 则需要重启命令，修改 `_data` 里的文件通常会自动刷新）。刷新浏览器 `http://127.0.0.1:4000/` 即可看到最新效果！
