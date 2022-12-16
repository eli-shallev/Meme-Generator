'use strict'

function renderGallery() {
    const elContainer = document.querySelector('.images-container')
    const strHtml = getImages().map(img => {
        return `<img src="${img.url}" onclick = "onImgSelect(${img.id})" >`
    }).join('')
    elContainer.innerHTML = strHtml
}

function onImgSelect(imgId) {
    setImg(imgId)

    const elGallery = document.querySelector('.main-gallery')
    elGallery.classList.add('hidden')
    const elEditor = document.querySelector('.editor')
    elEditor.classList.remove('hidden')

    setEditorHeight()
    setCanvasContainerHeight()
    resizeCanvas()
}

