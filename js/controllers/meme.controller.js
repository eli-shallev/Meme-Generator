'use strict'
let gIsdown = false
let gStartPos = { x: 0, y: 0 }

function renderMeme() {
    const elImg = new Image()
    const selectedImg = getImages().find(img => img.id === getselectedImgId())
    elImg.src = selectedImg.url

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.clientWidth, gElCanvas.clientHeight)

        if (!getLines().length) return

        getLines().forEach((line, idx) => {
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillStyle = line.color.fill
            gCtx.strokeStyle = line.color.stroke

            if (getSelectedLineIdx() === idx) markLine(line)

            gCtx.fillText(line.txt, line.pos.x, line.pos.y)
            gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
        })
    }
}

function onDown(ev) {
    let lineIdx = findLine(ev)
    if (lineIdx === -1) return
    setSelectedLineIdx(lineIdx)
    gIsdown = true
    renderMeme()

    const { offsetX, offsetY } = ev
    gStartPos.x = offsetX
    gStartPos.y = offsetY

    document.body.style.cursor = 'grabbing'
}

function onUp() {
    gIsdown = false
    document.body.style.cursor = 'auto'
}

function onMove(ev) {
    if (!gIsdown) return
    const { offsetX, offsetY } = ev
    const dx = offsetX - gStartPos.x
    const dy = offsetY - gStartPos.y
    updateLinePosX(dx)
    updateLinePosY(dy)
    gStartPos.x = offsetX
    gStartPos.y = offsetY

    renderMeme()
}




function onTxtChange(txt) {
    setLineTxt(txt)
    renderMeme()
}


function markLine(line) {
    gCtx.save()
    gCtx.strokeStyle = 'white'
    const width = gCtx.measureText(line.txt).width + 20
    const height = gCtx.measureText('M').width + 20
    gCtx.strokeRect(line.pos.x - 5, line.pos.y - 45, width, height)
    gCtx.restore()
}


function onLineAdd() {
    addLine()
    updateSelectedLine()
    document.querySelector('.txt-input').value = ''
}

function onLineSwitch() {
    updateSelectedLine()
    document.querySelector('.txt-input').value = !getLines().length ? '' : getSelectedLine().txt
    let font = document.querySelector('.font-family-input').value
    document.querySelector('.font-family-input').value = !getLines().length ? font : getSelectedLine().font
    renderMeme()
}

function onLineRemove() {
    removeSelectedLine()
    updateSelectedLine()
    document.querySelector('.txt-input').value = !getLines().length ? '' : getSelectedLine().txt
    renderMeme()
}

function onLineUp() {
    if (!getLines().length) return
    updateLinePosY(-10)
    renderMeme()
}
function onLineDown() {
    if (!getLines().length) return
    updateLinePosY(10)
    renderMeme()
}

function onStrokeColorChange(color) {
    if (!getLines().length) return
    strokeColorChange(color)
    renderMeme()

}

function onFillColorChange(color) {
    if (!getLines().length) return
    fillColorChange(color)
    renderMeme()

}

function onMatchToPalete() {
    if (!getLines().length) return
    const fillColor = document.querySelector('.fill-color').value
    const strokeColor = document.querySelector('.stroke-color').value
    fillColorChange(fillColor)
    strokeColorChange(strokeColor)
    renderMeme()

}

function onChangeFontSize(val) {
    if (!getLines().length) return
    const incDec = val === 'increase' ? 1 : -1
    changeFontSize(5 * incDec)
    renderMeme()
}

function onFontFamilyChange(font) {
    if (!getLines().length) return
    setFontFamily(font)
    renderMeme()
}

function onAlignChange(alignment) {
    if (!getLines().length) return
    alignChange(alignment)
    renderMeme()
}

function onDownload(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}



function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    console.log(elContainer.clientWidth)
    console.log(gElCanvas)
    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.clientHeight

    console.log(gElCanvas)
    renderMeme()
}