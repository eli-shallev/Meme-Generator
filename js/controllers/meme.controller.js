'use strict'
let gIsdown = false
let gStartPos = { x: 0, y: 0 }
let gIsTouch = false
let gIsMarkShown = true
let gResizeMarkerLocation
let gIsTextResizing = false


function renderMeme() {
    const elImg = new Image()
    let selectedImg = getImages().find(img => img.id === getselectedImgId())
    elImg.src = selectedImg.url

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.clientWidth, gElCanvas.clientHeight)

        if (!getLines().length) return

        getLines().forEach((line, idx) => {
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.fillStyle = line.color.fill
            gCtx.strokeStyle = line.color.stroke

            if (getSelectedLineIdx() === idx && gIsMarkShown) markLine(line)

            gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
            gCtx.fillText(line.txt, line.pos.x, line.pos.y)

        })
    }
}

function onShare() {
    document.querySelector('.sharing-options').classList.toggle('options-open')
}

function onDown(ev) {
    ev.preventDefault()
    if (ev.touches) gIsTouch = true
    var { offsetX, offsetY } = ev
    if (gIsTouch) {
        const { x, y, width, height } = ev.target.getBoundingClientRect();
        var offsetX = (ev.touches[0].clientX - x) / width * ev.target.offsetWidth;
        var offsetY = (ev.touches[0].clientY - y) / height * ev.target.offsetHeight;
    }
    let lineIdx = findLine(ev, gIsTouch)

    if (isOnResizeMarker(offsetX, offsetY)) {
        console.log('on target')
        gIsTextResizing = true
        lineIdx = gResizeMarkerLocation.lineIdx
    }

    if (lineIdx === -1 && !gIsTextResizing) {
        gIsMarkShown = false
        renderMeme()
        return
    }

    gIsMarkShown = true
    setSelectedLineIdx(lineIdx)
    gIsdown = true
    renderMeme()
    gStartPos.x = offsetX
    gStartPos.y = offsetY
}

function onUp(ev) {
    ev.preventDefault()
    gIsTextResizing = false
    gIsdown = false
    gIsTouch = false
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

    if (gIsTextResizing) {
        if (dx > 0 && dy > 0) {
            changeFontSize(1)
        }
        if (dx < 0 && dy < 0) {
            changeFontSize(-1)
        }
    } else {
        updateLinePosX(dx)
        updateLinePosY(dy)
    }

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
    gCtx.strokeRect(line.pos.x - 5, line.pos.y - height * 0.85, width, height)

    gCtx.fillStyle = 'black'
    gCtx.font = `20px impact`
    gCtx.fillText('⨷', line.pos.x - 15 + width, line.pos.y - 40 + height)
    gResizeMarkerLocation = {
        x: line.pos.x - 15 + width,
        y: line.pos.y - 40 + height,
        width: gCtx.measureText('⨷').width + 5,
        height: gCtx.measureText('M').width + 5,
        lineIdx: getSelectedLineIdx()
    }

    gCtx.restore()
}

function isOnResizeMarker(x, y) {
    return (x >= gResizeMarkerLocation.x - 3 && x <= gResizeMarkerLocation.x + gResizeMarkerLocation.width - 5
        && y >= gResizeMarkerLocation.y - 20 && y <= gResizeMarkerLocation.y + gResizeMarkerLocation.height - 15)
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

function onEmojiAdd(emoji) {
    addLine(emoji)
    updateSelectedLine()
    renderMeme()
}

function onEmojiScroll(val) {
    emojiScroll(val)
}

function onFacebookShare() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }

    doUploadImg(imgDataUrl, onSuccess)
}

async function onWebShare() {
    const dataUrl = gElCanvas.toDataURL()
    const blob = await (await fetch(dataUrl)).blob()
    const filesArray = [
        new File(
            [blob],
            'Meme.jpg',
            {
                type: blob.type,
                lastModified: new Date().getTime()
            }
        )
    ]
    const shareData = {
        files: filesArray,
    }
    navigator.share(shareData)
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