const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const readmePath = path.join(repoRoot, "README.md");
const outputPath = path.join(process.env.USERPROFILE, "Downloads", "index.html");

const markdown = fs.readFileSync(readmePath, "utf8").trim();
const markdownJson = JSON.stringify(markdown);

const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>StoreHub - README de Apresentacao</title>
  <style>
    :root {
      --bg: #eef3fb;
      --bg-strong: #dfe9fb;
      --card: #ffffff;
      --text: #18243b;
      --muted: #5b6475;
      --accent: #3259d8;
      --accent-soft: #e5edff;
      --border: #d8e0ef;
      --shadow: 0 18px 40px rgba(24, 36, 59, 0.08);
      --code-bg: #0f172a;
      --code-text: #e2e8f0;
      --inline-code-bg: #eff3fb;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }

    body {
      margin: 0;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(50, 89, 216, 0.12), transparent 32%),
        radial-gradient(circle at top right, rgba(12, 164, 120, 0.08), transparent 25%),
        linear-gradient(180deg, var(--bg-strong) 0%, var(--bg) 24%, var(--bg) 100%);
      font: 16px/1.65 "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    }

    .hero { padding: 56px 24px 28px; }

    .hero-card {
      max-width: 1400px;
      margin: 0 auto;
      padding: 32px;
      border: 1px solid rgba(255, 255, 255, 0.55);
      border-radius: 28px;
      background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(247, 250, 255, 0.92)),
        linear-gradient(120deg, rgba(50, 89, 216, 0.12), rgba(12, 164, 120, 0.08));
      box-shadow: var(--shadow);
      backdrop-filter: blur(18px);
    }

    .eyebrow {
      margin: 0 0 10px;
      color: var(--accent);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    .hero h1 {
      margin: 0;
      font-size: clamp(2.2rem, 5vw, 4rem);
      line-height: 1.05;
    }

    .hero p {
      max-width: 880px;
      margin: 18px 0 0;
      color: var(--muted);
      font-size: 1.05rem;
    }

    .layout {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      gap: 24px;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 24px 40px;
      align-items: start;
    }

    .panel {
      border: 1px solid var(--border);
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.92);
      box-shadow: var(--shadow);
      backdrop-filter: blur(16px);
    }

    .toc {
      position: sticky;
      top: 24px;
      padding: 20px;
    }

    .toc h2 {
      margin: 0 0 14px;
      font-size: 1rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .toc nav {
      display: grid;
      gap: 6px;
      max-height: calc(100vh - 110px);
      overflow: auto;
      padding-right: 4px;
    }

    .toc a {
      display: block;
      padding: 8px 10px;
      border-radius: 12px;
      color: var(--muted);
      text-decoration: none;
      transition: 0.18s ease;
    }

    .toc a:hover,
    .toc a:focus-visible {
      color: var(--accent);
      background: var(--accent-soft);
      outline: none;
    }

    .toc a.depth-3 {
      margin-left: 12px;
      font-size: 0.95rem;
    }

    article { padding: 32px; }
    article > *:first-child { margin-top: 0; }

    h1, h2, h3, h4 {
      color: #12203a;
      line-height: 1.2;
      scroll-margin-top: 24px;
    }

    h1 { margin: 0 0 24px; font-size: 2.3rem; }
    h2 { margin: 44px 0 16px; padding-bottom: 10px; border-bottom: 1px solid var(--border); font-size: 1.75rem; }
    h3 { margin: 32px 0 12px; font-size: 1.28rem; }
    h4 { margin: 24px 0 10px; font-size: 1.08rem; }
    p { margin: 14px 0; }
    ul, ol { margin: 12px 0 18px 22px; padding: 0; }
    li + li { margin-top: 6px; }
    hr { margin: 32px 0; border: 0; border-top: 1px solid var(--border); }

    code {
      padding: 0.16em 0.45em;
      border-radius: 8px;
      background: var(--inline-code-bg);
      color: #14326d;
      font-family: "Cascadia Code", "Fira Code", Consolas, monospace;
      font-size: 0.95em;
    }

    pre {
      margin: 18px 0 22px;
      padding: 18px 20px;
      overflow: auto;
      border-radius: 18px;
      background: var(--code-bg);
      color: var(--code-text);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
    }

    pre code {
      padding: 0;
      background: transparent;
      color: inherit;
      font-size: 0.94rem;
      line-height: 1.65;
    }

    pre[data-lang]::before {
      content: attr(data-lang);
      display: inline-block;
      margin-bottom: 12px;
      padding: 4px 8px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      color: #cbd5e1;
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    @media (max-width: 1080px) {
      .layout { grid-template-columns: 1fr; }
      .toc { position: static; }
    }

    @media (max-width: 680px) {
      .hero { padding: 28px 14px 18px; }
      .hero-card, article, .toc { padding: 20px; }
      .layout { padding: 0 14px 24px; }
    }
  </style>
</head>
<body>
  <header class="hero">
    <div class="hero-card">
      <p class="eyebrow">StoreHub / README / Apresentacao</p>
      <h1>Guia do Projeto, Arquitetura e Manual de Uso</h1>
      <p>
        Este HTML foi gerado a partir do README tecnico do projeto para facilitar leitura,
        compartilhamento e apresentacao em entrevista. O conteudo abaixo preserva a estrutura
        em markdown, incluindo blocos de comando formatados, estrutura de pastas e o roteiro
        de explicacao do backend e do frontend.
      </p>
    </div>
  </header>

  <main class="layout">
    <aside class="panel toc">
      <h2>Indice</h2>
      <nav id="toc"></nav>
    </aside>

    <article class="panel" id="content"></article>
  </main>

  <script>
    const markdown = ${markdownJson};
    const content = document.getElementById("content");
    const toc = document.getElementById("toc");
    const tick = String.fromCharCode(96);
    const codeFence = tick.repeat(3);

    function escapeHtml(value) {
      return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function slugify(value) {
      return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\\u0300-\\u036f]/g, "")
        .replace(new RegExp("[" + tick + "\\\\\"]", "g"), "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    function renderInline(value) {
      let html = escapeHtml(value);
      html = html.replace(/\\*\\*(.+?)\\*\\*/g, "<strong>$1</strong>");
      html = html.replace(new RegExp(tick + "([^" + tick + "]+)" + tick, "g"), "<code>$1</code>");
      return html;
    }

    function renderMarkdown(source) {
      const lines = source.replace(/\\r\\n/g, "\\n").split("\\n");
      const html = [];
      let paragraph = [];
      let inCode = false;
      let codeLanguage = "";
      let codeLines = [];
      let listType = null;

      function closeParagraph() {
        if (!paragraph.length) return;
        html.push("<p>" + renderInline(paragraph.join(" ")) + "</p>");
        paragraph = [];
      }

      function closeList() {
        if (!listType) return;
        html.push(listType === "ul" ? "</ul>" : "</ol>");
        listType = null;
      }

      function closeCode() {
        if (!inCode) return;
        const langAttr = codeLanguage ? " data-lang=\\"" + escapeHtml(codeLanguage) + "\\"" : "";
        html.push("<pre" + langAttr + "><code>" + escapeHtml(codeLines.join("\\n")) + "</code></pre>");
        inCode = false;
        codeLanguage = "";
        codeLines = [];
      }

      for (const line of lines) {
        if (inCode) {
          if (line.startsWith(codeFence)) {
            closeCode();
          } else {
            codeLines.push(line);
          }
          continue;
        }

        if (line.startsWith(codeFence)) {
          closeParagraph();
          closeList();
          inCode = true;
          codeLanguage = line.slice(3).trim();
          codeLines = [];
          continue;
        }

        if (!line.trim()) {
          closeParagraph();
          closeList();
          continue;
        }

        if (/^---+$/.test(line.trim())) {
          closeParagraph();
          closeList();
          html.push("<hr>");
          continue;
        }

        const heading = line.match(/^(#{1,4})\\s+(.*)$/);
        if (heading) {
          closeParagraph();
          closeList();
          const level = heading[1].length;
          const rawText = heading[2].trim();
          const id = slugify(rawText);
          html.push("<h" + level + " id=\\"" + id + "\\">" + renderInline(rawText) + "</h" + level + ">");
          continue;
        }

        const unordered = line.match(/^- (.*)$/);
        if (unordered) {
          closeParagraph();
          if (listType !== "ul") {
            closeList();
            html.push("<ul>");
            listType = "ul";
          }
          html.push("<li>" + renderInline(unordered[1]) + "</li>");
          continue;
        }

        const ordered = line.match(/^\\d+\\.\\s+(.*)$/);
        if (ordered) {
          closeParagraph();
          if (listType !== "ol") {
            closeList();
            html.push("<ol>");
            listType = "ol";
          }
          html.push("<li>" + renderInline(ordered[1]) + "</li>");
          continue;
        }

        paragraph.push(line.trim());
      }

      closeParagraph();
      closeList();
      closeCode();
      return html.join("\\n");
    }

    function buildToc() {
      const headings = content.querySelectorAll("h2, h3");
      const links = [];

      headings.forEach((heading) => {
        if (!heading.id) {
          heading.id = slugify(heading.textContent || "");
        }

        const depthClass = heading.tagName.toLowerCase() === "h3" ? "depth-3" : "depth-2";
        links.push("<a class=\\"" + depthClass + "\\" href=\\"#" + heading.id + "\\">" + heading.textContent + "</a>");
      });

      toc.innerHTML = links.join("");
    }

    content.innerHTML = renderMarkdown(markdown);
    buildToc();
  </script>
</body>
</html>`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, html, "utf8");
console.log(outputPath);
