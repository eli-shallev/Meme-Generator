'use strict'

function renderMeme(){
    const meme = getMeme()
    const elImg = new Image()
    const selectedImg = getImages().find(img => img.id === meme.selectedImgId)
    elImg.src = selectedImg.url

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.font = "48px impact";
        gCtx.fillStyle = 'white'
        gCtx.strokeStyle = 'black'
        gCtx.fillText(meme.lines[meme.selectedLineIdx].txt, 10, 50)
        gCtx.strokeText(meme.lines[meme.selectedLineIdx].txt, 10, 50)
    }
}

function onTxtChange(txt){
    setLineTxt(txt)
    renderMeme ()
}

function resizeCanvas(){
    const elContainer = document.querySelector('.canvas-container')
    console.log(elContainer)
    console.log(gElCanvas)
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.style.height
}