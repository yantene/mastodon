function eqblockify(html) {
  // クオート部分を<pre>タグで括る
  return html.replace(
    /\$(.*?)\$/g,
    '<span class="equation">$1</span>'
  ).replace(
    /(?:<br>)?\\\[<br>(.*?)<br>\\\](?:<br>)?/g,
    '</p><div class="equation">$1</div><p>'
  ).replace(/<p>\s*<\/p>/g, '');
}
function codeblockify(html) {
  // クオート部分を<pre><code>タグで括る
  return html.replace(
    /(?:<br>)?(`{3,})(.*?)<br>(.*?)<br>\1(?:<br>)?/g,
    '</p><pre><code class="$2 hljs">$3</code></pre><p>'
  ).replace(/<p>\s*<\/p>/g, '');
}
function format(html) {
  console.log(html);
  html = html.replace(/<\/p>\s*<p>/g, '<br><br>').replace(/<br \/>/g, '<br>');
  html = eqblockify(html);
  html = codeblockify(html);
  html = html.replace(/<p>\s*<br>/g, '<p>');
  console.log(html);
  return html;
}

function to_formula(div) {
  for (let desc of div.getElementsByClassName('equation')) {
    if (desc.firstChild == null || desc.firstChild.className != 'katex') {
      let textContent = desc.textContent;
      try {
        katex.render(desc.textContent, desc);
      } catch (e) {
        desc.textContent = textContent;
        desc.classList.add('invalid_equation');
      }
    }
  }
}
function highlight(div) {
  for (let desc of div.getElementsByClassName('hljs')) {
    hljs.highlightBlock(desc);
  }
}
function decorate(node) {
  highlight(node);
  to_formula(node);
}

export { format, decorate }
