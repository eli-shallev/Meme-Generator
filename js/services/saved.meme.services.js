'use strict'
let gSavedMemes = []
const SAVED_MEMES_STORAGE_KEY = "savedMemesDB"

function loadSavedMemes() {
    gSavedMemes = loadFromStorage(SAVED_MEMES_STORAGE_KEY)
    if (!gSavedMemes) gSavedMemes = []
}

function getSavedMemes() {
    return gSavedMemes
}

function addToSavedMemes() {
    const imgUrl = gElCanvas.toDataURL('image/jpeg')
    gSavedMemes.push(createSavedMeme(gMeme, imgUrl))
    saveToStorage(SAVED_MEMES_STORAGE_KEY, gSavedMemes)
}

function createSavedMeme(gMeme, imgUrl) {
    return {
        id: makeId(),
        meme: JSON.parse(JSON.stringify(gMeme)),
        imgUrl
    }
}

function getSavedMemeById(savedMemeId) {
    return gSavedMemes.find(savedMeme => savedMeme.id === savedMemeId)
}