'use strict'

function renderGallery() {
    const elContainer = document.querySelector('.images-container')
    let strHtml = '<label class ="img-uploader" >Upload your own image!\
                    <input type="file" class="file-input hidden" name="image" onchange="onUploadImg(event)" /></label>'
     strHtml += getImages().map(img => {
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

    resizeCanvas()
}

function onUploadImg(ev){
    loadImageFromInput(ev, onImageInput)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = (event) => {
        let img = new Image()
        img.src = event.target.result 
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function onImageInput(img){
    const imgId = addImage(img)
    onImgSelect(imgId)
}

