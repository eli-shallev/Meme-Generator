'use strict'
let gEmojiScrollIdx = 0

var gMeme = {
    selectedImgId: "",
    selectedLineIdx: 0,
    lines: [
        // {
        //     txt: '',
        //     size: 20,
        //     align: 'left',
        //     color: 'red',
        //     pos: { x: 10, y: 50 }
        // }
    ]
}

function getMeme() {
    return gMeme
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}

function getselectedImgId() {
    return gMeme.selectedImgId
}

function getLines() {
    return gMeme.lines
}

function setLineTxt(txt) {
    if (!gMeme.lines.length) addLine()
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}
function setSelectedLineIdx(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
}

function removeSelectedLine() {
    if (!gMeme.lines.length) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function addLine(lineTxt) {
    gMeme.lines.push(_createLine(lineTxt))
}

function strokeColorChange(color) {
    gMeme.lines[gMeme.selectedLineIdx].color.stroke = color
}

function fillColorChange(color) {
    gMeme.lines[gMeme.selectedLineIdx].color.fill = color
}

function updateSelectedLine() {
    gMeme.selectedLineIdx += 1
    gMeme.selectedLineIdx = gMeme.selectedLineIdx >= gMeme.lines.length ? 0 : gMeme.selectedLineIdx

}

function updateLinePosY(diff) {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += diff
}

function updateLinePosX(diff) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += diff
}


function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
    gMeme.lines[gMeme.selectedLineIdx].size = gMeme.lines[gMeme.selectedLineIdx].size < 5 ? 5 : gMeme.lines[gMeme.selectedLineIdx].size
}

function setFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function alignChange(alignment) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    currLine.align = alignment
    gCtx.save()
    gCtx.font = `${currLine.size}px ${currLine.font}`
    switch (currLine.align) {
        case 'left':
            currLine.pos.x = 10
            break;
        case 'right':
            currLine.pos.x = gElCanvas.width - 10 - gCtx.measureText(currLine.txt).width
            break;
        case 'center':
            currLine.pos.x = (gElCanvas.width - gCtx.measureText(currLine.txt).width) / 2
            break;
    }
}

function findLine(ev, isTouch) {
    var { offsetX, offsetY } = ev

    if (isTouch) {
        const { x, y, width, height } = ev.target.getBoundingClientRect();
        var offsetX = (ev.touches[0].clientX - x) / width * ev.target.offsetWidth;
        var offsetY = (ev.touches[0].clientY - y) / height * ev.target.offsetHeight;
    }

    return gMeme.lines.findIndex(line => {
        const width = gCtx.measureText(line.txt).width + 20
        const height = gCtx.measureText('M').width + 20
        return (
            offsetX >= line.pos.x - 5 && offsetX <= line.pos.x + width - 5 &&
            offsetY >= line.pos.y - 45 && offsetY <= line.pos.y - 45 + height
        )
    })
}

function emojiScroll(val) {
    gEmojiScrollIdx += val
    gEmojiScrollIdx = gEmojiScrollIdx > 4 ? 0 : gEmojiScrollIdx
    gEmojiScrollIdx = gEmojiScrollIdx < 0 ? 4 : gEmojiScrollIdx
    let strHtml
    switch (gEmojiScrollIdx) {
        case 0:
            strHtml = `<span onclick="onEmojiAdd(this.innerText)">💖</span> <span onclick="onEmojiAdd(this.innerText)">😂</span> 
            <span onclick="onEmojiAdd(this.innerText)">🌭</span> <span onclick="onEmojiAdd(this.innerText)">💎</span>
            <span onclick="onEmojiAdd(this.innerText)">🎅</span><span onclick="onEmojiAdd(this.innerText)">⛲</span>`
            break;
        case 1:
            strHtml = `<span onclick="onEmojiAdd(this.innerText)">🛺</span> <span onclick="onEmojiAdd(this.innerText)">👨‍💻</span> 
            <span onclick="onEmojiAdd(this.innerText)">🤴</span> <span onclick="onEmojiAdd(this.innerText)">🧨</span>
            <span onclick="onEmojiAdd(this.innerText)">🎀</span><span onclick="onEmojiAdd(this.innerText)">😎</span>`
            break;
        case 2:
            strHtml = `<span onclick="onEmojiAdd(this.innerText)">😜</span> <span onclick="onEmojiAdd(this.innerText)">👿</span> 
            <span onclick="onEmojiAdd(this.innerText)">🙈</span> <span onclick="onEmojiAdd(this.innerText)">🍬</span>
            <span onclick="onEmojiAdd(this.innerText)">🍇</span><span onclick="onEmojiAdd(this.innerText)">🚧</span>`
            break;
        case 3:
            strHtml = `<span onclick="onEmojiAdd(this.innerText)">😍</span> <span onclick="onEmojiAdd(this.innerText)">🎺</span> 
            <span onclick="onEmojiAdd(this.innerText)">🏀</span> <span onclick="onEmojiAdd(this.innerText)">👓</span>
            <span onclick="onEmojiAdd(this.innerText)">🏆</span><span onclick="onEmojiAdd(this.innerText)">💪</span>`
            break;
        case 4:
            strHtml = `<span onclick="onEmojiAdd(this.innerText)">👍</span> <span onclick="onEmojiAdd(this.innerText)">😴</span> 
            <span onclick="onEmojiAdd(this.innerText)">🍕</span> <span onclick="onEmojiAdd(this.innerText)">🌙</span>
            <span onclick="onEmojiAdd(this.innerText)">🔥</span><span onclick="onEmojiAdd(this.innerText)">👀</span>`
            break;

    }

    document.querySelector('.emoji-container').innerHTML = strHtml
}

function _createLine(lineTxt = '') {

    let posY = gElCanvas.height / 2 + 20
    if (!gMeme.lines.length) posY = 60
    if (gMeme.lines.length === 1) posY = gElCanvas.height - 20

    const stroke = document.querySelector('.stroke-color').value
    const fill = document.querySelector('.fill-color').value
    const font = document.querySelector('.font-family-input').value
    return {
        txt: lineTxt,
        size: 48,
        align: 'left',
        font,
        color: { stroke, fill },
        pos: { x: 10, y: posY }
    }
}
