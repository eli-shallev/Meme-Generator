'use strict'
let gIsdown = false
let gStartPos = { x: 0, y: 0 }
let gIsTouch = false
let gIsMarkShown = true

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

            if (getSelectedLineIdx() === idx && gIsMarkShown) markLine(line)

            gCtx.fillText(line.txt, line.pos.x, line.pos.y)
            gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
        })
    }
}

function onDown(ev) {
    ev.preventDefault()
    if (ev.touches) gIsTouch = true
    let lineIdx = findLine(ev, gIsTouch)
    if (lineIdx === -1) {
        gIsMarkShown = false
        renderMeme()
        return
    }
    gIsMarkShown = true
    setSelectedLineIdx(lineIdx)

    gIsdown = true
    renderMeme()

    var { offsetX, offsetY } = ev

    if (gIsTouch) {
        const { x, y, width, height } = ev.target.getBoundingClientRect();
        var offsetX = (ev.touches[0].clientX - x) / width * ev.target.offsetWidth;
        var offsetY = (ev.touches[0].clientY - y) / height * ev.target.offsetHeight;
    }

    gStartPos.x = offsetX
    gStartPos.y = offsetY

    document.body.style.cursor = 'grabbing'
}

function onUp(ev) {
    ev.preventDefault()
    gIsdown = false
    gIsTouch = false
    document.body.style.cursor = 'auto'
}

function onMove(ev) {
    ev.preventDefault()
    if (!gIsdown) return

    var { offsetX, offsetY } = ev
    if (gIsTouch) {
        const { x, y, width, height } = ev.target.getBoundingClientRect();
        var offsetX = (ev.touches[0].clientX - x) / width * ev.target.offsetWidth;
        var offsetY = (ev.touches[0].clientY - y) / height * ev.target.offsetHeight;
    }

    const dx = offsetX - gStartPos.x
    const dy = offsetY - gStartPos.y
    updateLinePosX(dx)
    updateLinePosY(dy)
    gStartPos.x = offsetX
    gStartPos.y = offsetY
    renderMeme()
}




function onTxtChange(txt) {
    gIsMarkShown = true
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
    gIsMarkShown = true
    addLine()
    updateSelectedLine()
    document.querySelector('.txt-input').value = ''
}

function onLineSwitch() {
    gIsMarkShown = true
    updateSelectedLine()
    document.querySelector('.txt-input').value = !getLines().length ? '' : getSelectedLine().txt
    let font = document.querySelector('.font-family-input').value
    document.querySelector('.font-family-input').value = !getLines().length ? font : getSelectedLine().font
    renderMeme()
}

function onLineRemove() {
    gIsMarkShown = true
    removeSelectedLine()
    updateSelectedLine()
    document.querySelector('.txt-input').value = !getLines().length ? '' : getSelectedLine().txt
    renderMeme()
}

function onLineUp() {
    if (!getLines().length) return
    gIsMarkShown = true
    updateLinePosY(-10)
    renderMeme()
}
function onLineDown() {
    if (!getLines().length) return
    gIsMarkShown = true
    updateLinePosY(10)
    renderMeme()
}

function onStrokeColorChange(color) {
    if (!getLines().length) return
    gIsMarkShown = true
    strokeColorChange(color)
    renderMeme()

}

function onFillColorChange(color) {
    if (!getLines().length) return
    gIsMarkShown = true
    fillColorChange(color)
    renderMeme()

}

function onMatchToPalete() {
    if (!getLines().length) return
    gIsMarkShown = true
    const fillColor = document.querySelector('.fill-color').value
    const strokeColor = document.querySelector('.stroke-color').value
    fillColorChange(fillColor)
    strokeColorChange(strokeColor)
    renderMeme()

}

function onChangeFontSize(val) {
    if (!getLines().length) return
    gIsMarkShown = true
    const incDec = val === 'increase' ? 1 : -1
    changeFontSize(5 * incDec)
    renderMeme()
}

function onFontFamilyChange(font) {
    gIsMarkShown = true
    if (!getLines().length) return
    setFontFamily(font)
    renderMeme()
}

function onAlignChange(alignment) {
    gIsMarkShown = true
    if (!getLines().length) return
    alignChange(alignment)
    renderMeme()
}

function onDownload(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onEmojiAdd(emoji){
    addLine(emoji)
    updateSelectedLine()
    renderMeme()
}

function onEmojiScroll(val){
    emojiScroll(val)
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