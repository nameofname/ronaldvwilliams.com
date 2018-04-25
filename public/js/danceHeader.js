const { randomColor } = require('./circle');

function getTextNodes() {
    let node;
    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    while(node = walker.nextNode()) nodes.push(node);
    return nodes;
}

function getPosition(node) {
    const leftVal = node.attributes.left ? node.attributes.left.value : 0;
    const left = parseInt(leftVal, 10);
    const topVal = node.attributes.left ? node.attributes.left.value : 0;
    const top = parseInt(topVal, 10);
    return { left, top };
}

function danceHeader() {
    const svgs = document.querySelectorAll('.header svg')
    const intervals = [];

    svgs.forEach((node, idx) => {
        node.style.position = 'relative';

        intervals[idx] = setInterval(() => {
            const { left, top } = getPosition(node);
            const newLeft = Math.random() > 0.5 ? (left + 10) : (left - 10);
            const newTop = Math.random() > 0.5 ? (top + 10) : (top - 10);

            node.style.left = newLeft
            node.style.top = newTop
            node.firstElementChild.setAttribute('fill', randomColor())
        }, 100);

        setTimeout(() => {
            node.style.position = '';
            node.firstElementChild.setAttribute('fill', '#333');
            clearInterval(intervals[idx]);
        }, 1000);
    });
}  

module.exports = danceHeader;
