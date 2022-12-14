'use strict'

function renderGallery(){
    const elContainer = document.querySelector('.images-container')
    const strHtml = getImages().map(img =>{
        return `<img src="${img.url}" onclick="onOpenEditor(${img.id})" >`
    }).join('')
    elContainer.innerHTML = strHtml
}

function onOpenEditor(imgId){
    getMeme().selectedImgId = imgId
    renderMeme()
    
    const elGallery = document.querySelector('.gallery')
    console.log(elGallery)
    elGallery.classList.add('hidden')
    console.log(elGallery)
    const elEditor = document.querySelector('.editor')
    elEditor.classList.remove('hidden')
}