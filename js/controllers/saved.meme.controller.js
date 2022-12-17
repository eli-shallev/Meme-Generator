
function renderSavedMemes() {
    const elContainer = document.querySelector('.memes-container')
    const strHtml = getSavedMemes().map(savedMeme => {
        const elImg = new Image()
        elImg.src = savedMeme.imgUrl
        return  `<img src="${elImg.src}" onclick = "onMemeSelect('${savedMeme.id}')" >`
    }).join('')

    elContainer.innerHTML = strHtml
}

function onGoToMemes(){
    loadSavedMemes()
    renderSavedMemes()
    const elGallery = document.querySelector('.main-gallery')
    elGallery.classList.add('hidden')
    const elEditor = document.querySelector('.editor')
    elEditor.classList.add('hidden')
    const elMemes = document.querySelector('.memes-container')
    elMemes.classList.remove('hidden')
}

function onSave(){
    addToSavedMemes()
}

function onMemeSelect(savedMemeId) {
    const savedMeme = getSavedMemeById(savedMemeId)
    setMeme(JSON.parse(JSON.stringify(savedMeme.meme)))

    const elMemes = document.querySelector('.memes-container')
    elMemes.classList.add('hidden')
    const elEditor = document.querySelector('.editor')
    elEditor.classList.remove('hidden')

    resizeCanvas()

    
}