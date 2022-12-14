'use strict'

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

function removeSelectedLine() {
    //if (gMeme.lines.length === 1) { setLineTxt(''); return }
    if (!gMeme.lines.length) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function addLine() {
    gMeme.lines.push(_createLine())
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

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff
    gMeme.lines[gMeme.selectedLineIdx].size = gMeme.lines[gMeme.selectedLineIdx].size < 5 ? 5 : gMeme.lines[gMeme.selectedLineIdx].size
}

function setFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function _createLine() {
    let posY = 220
    if (!gMeme.lines.length) posY = 20
    if (gMeme.lines.length === 1) posY = 420

    const stroke = document.querySelector('.stroke-color').value
    const fill = document.querySelector('.fill-color').value
    const font = document.querySelector('.font-family-input').value
    return {
        txt: '',
        size: 48,
        align: 'left',
        font,
        color: { stroke, fill },
        pos: { x: 10, y: posY }
    }
}
