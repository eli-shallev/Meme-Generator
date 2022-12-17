'use strict'

function renderGallery() {
    const elContainer = document.querySelector('.images-container')
    let strHtml = '<label class ="img-uploader" >Upload your own image!\
                    <input type="file" class="file-input hidden" name="image" onchange="onUploadImg(event)" /></label>'
    strHtml += '<label class ="random-meme" onclick="onRandomMeme()">Im flexible, surprise me!</label>'
    strHtml += getImages().map(img => {
        return `<img src="${img.url}" onclick = "onImgSelect(${img.id})" >`
    }).join('')
    elContainer.innerHTML = strHtml
}

function onGoToGallery() {
    const elGallery = document.querySelector('.main-gallery')
    elGallery.classList.remove('hidden')
    const elEditor = document.querySelector('.editor')
    elEditor.classList.add('hidden')
    const elMemes = document.querySelector('.memes-container')
    elMemes.classList.add('hidden')
}

function onImgSelect(imgId) {
    setImg(imgId)
    resetLines()
    const elGallery = document.querySelector('.main-gallery')
    elGallery.classList.add('hidden')
    const elEditor = document.querySelector('.editor')
    elEditor.classList.remove('hidden')

    resizeCanvas()
}

function onUploadImg(ev) {
    loadImageFromInput(ev, onImageInput)
}

function onRandomMeme() {
    const imgId = getRandomIntInclusive(1, getImages().length)
    const numOfLines = getRandomIntInclusive(1, 2)

    var rndLines = []
    for (var i = 0; i < numOfLines; i++) {
        let align
        const alignNum = getRandomIntInclusive(1, 3)
        switch (alignNum) {
            case 1:
                align = 'left'
                break;
            case 2:
                align = 'center'
                break;
            case 3:
                align = 'right'
                break;
        }
        const posY = i === 0 ? 60 : gElCanvas.height - 20
        const numOfWords = getRandomIntInclusive(1, 6)
        let txt = ''
        for (var j = 0; j < numOfWords; j++) {
            txt += getRndStrings()[getRandomIntInclusive(0, 14)]
            txt += " "
        }
        const newLine = {
            txt: txt,
            size: getRandomIntInclusive(20, 70),
            align: align,
            font: 'Impact',
            color: { stroke: randomRgba(), fill: randomRgba() },
            pos: { x: 10, y: posY }
        }

        rndLines.push(newLine)
    }

    const rndMeme = {
        selectedImgId: imgId,
        selectedLineIdx: rndLines.length - 1,
        lines: rndLines
    }

    setMeme(rndMeme)
    const elGallery = document.querySelector('.main-gallery')
    elGallery.classList.add('hidden')
    const elEditor = document.querySelector('.editor')
    elEditor.classList.remove('hidden')

    resizeCanvas()

}

function randomRgba() {
    var s = 255;
    return 'rgba(' + Math.round(Math.random() * s) + ',' + Math.round(Math.random() * s) + ',' + Math.round(Math.random() * s)  + ')';
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function onImageInput(img) {
    const imgId = addImage(img)
    onImgSelect(imgId)
}

