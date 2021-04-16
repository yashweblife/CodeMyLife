function id(a) {
    return (document.getElementById(a));
}

function create(a) {
    return (document.createElement(a))
}
var ht = id("html");
var cs = id("css");
var op = id("output");
var style = create("style");
op.contentDocument.head.append(style);

addEventListener("keyup", (e) => {
    op.contentDocument.body.innerHTML = ht.innerText;
    style.innerText = cs.innerText;
})