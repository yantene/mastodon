function eneq(div) {
  for (let desc of div.getElementsByClassName('equation')) {
    if (desc.children.length == 0) {
      katex.render(desc.textContent, desc);
    }
  }
}
function texify(div) {
  for (let divchild of div.children) {
    if (divchild.nodeName != 'P') continue;
    // クオート部分を<pre>タグで括る
    divchild.outerHTML = divchild.outerHTML.replace(
      /\$(.*?)\$/g,
      '<span class="equation">$1</span>'
    ).replace(
      /(?:<br>)?\\\[<br>(.*?)<br>\\\](?:<br>)?/g,
      '</p><div class="equation">$1</div><p>'
    ).replace(/<p>\s*<\/p>/g, '');
  }
}

function highlight(div) {
  for (let desc of div.getElementsByTagName('hljs')) {
    hljs.highlightBlock(desc);
  }
}
function codeblockify(div) {
  for (let divchild of div.children) {
    if (divchild.nodeName != 'P') continue;
    // クオート部分を<pre><code>タグで括る
    divchild.outerHTML = divchild.outerHTML.replace(
      /(?:<br>)?```(.*?)<br>(.*?)<br>```(?:<br>)?/g,
      '</p><pre><code class="$1 hljs">$2</code></pre><p>'
    ).replace(/<p>\s*<\/p>/g, '');
  }
}

export default function flare(node) {
  //window.setTimeout(() => {
    codeblockify(node);
    highlight(node);
    texify(node);
    eneq(node);
  //}, 0);
}
