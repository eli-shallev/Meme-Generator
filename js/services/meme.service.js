'use strict'

var gMeme = {
    selectedImgId: "",
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Starter',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

// function _createLine(txt) {
//     return {
//         txt,
//         size: 20,
//         align: 'left',
//         color: 'red'
//     }
// }
