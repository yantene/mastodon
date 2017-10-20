function mathjaxify(div) {
  for (let desc of div.getElementsByTagName('p')) {
    if (desc.getAttribute('med')) continue;
    desc.setAttribute('med', true);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, div]);
  }
}
function highlight(div) {
  for (let desc of div.getElementsByTagName('code')) {
    hljs.highlightBlock(desc);
  }
}

function codeblockify(div) {
  // クオート部分を<pre><code>タグで括る
  div.innerHTML = div.innerHTML.replace(
    /(?:<br>)?```(.*?)<br>(.*?)<br>```/g,
    '</p><pre><code class="$1">$2</code></pre><p>'
  );

  for (let i = div.children.length - 1; i >= 0; i--) {
    let child = div.children[i];
    let gson = child.children[0];
    if (child.nodeName == 'P' && child.innerHTML == '') {
      // 発生した空のタグを取り除く
      div.removeChild(child)
    } else if (child.nodeName == 'PRE' && gson.getAttribute('class') == '') {
      // 言語が指定されていなければ class 属性も要らない
      gson.removeAttribute('class');
    }
  }
}

export default function flare(node) {
  window.setTimeout(() => {
    codeblockify(node);
    highlight(node);
    mathjaxify(node);
  }, 0);
}
