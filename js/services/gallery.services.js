'use strict'
var gfillter = ''
var gkeywordsMap = [{ funny: 1 }, { cat: 2 }, { politics: 0 }, { dog: 3 }, { cute: 1 }, { success: 0 }, { classics: 4 }, { german: 0 }, { tv: 1 }, { celeb: 3 }, { kids: 6 }]
var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'trump', 'politics', 'celeb'] },
    { id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['cute', 'kids', 'dog'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cute', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['success', 'kids', 'classics'] },
    { id: 6, url: 'img/6.jpg', keywords: ['german', 'classics', 'tv'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'kids', 'cute'] },
    { id: 8, url: 'img/8.jpg', keywords: ['tv', 'classics'] },
    { id: 9, url: 'img/9.jpg', keywords: ['kids', 'cute', 'classics'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'politics', 'celeb'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cute'] },
    { id: 12, url: 'img/12.jpg', keywords: ['celeb', 'tv'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'celeb', 'tv', 'classics'] },
    { id: 14, url: 'img/14.jpg', keywords: ['celeb', 'classics', 'tv'] },
    { id: 15, url: 'img/15.jpg', keywords: ['celeb', 'classics', 'tv'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'classics', 'tv'] },
    { id: 17, url: 'img/17.jpg', keywords: ['politics'] },
    { id: 18, url: 'img/18.jpg', keywords: ['kids', 'funny', 'tv'] },
]

function getImages() {
    return gImgs
}

function getImageById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

function getKeyWordsMap() {
    return gkeywordsMap
}

function updatekeywordsMap(key) {
    const keyword = gkeywordsMap.find(keyword => Object.keys(keyword)[0] === key)
    keyword[key] += 1
    document.getElementById(key).style.fontSize = `${24 + (keyword[key] * 2)}px`
}

function setfillter(fillter) {
    gfillter = fillter
}

function getImagesForDisplay() {
    const images = gImgs.reduce((acc, img) => {
        if (img.keywords.find(key => key.includes(gfillter))) acc.push(img)
        return acc
    }, [])
    return images
}

function addImage(img) {
    const newImage = {
        id: gImgs.length + 1,
        url: img.src,
        keywords: []
    }
    gImgs.push(newImage)
    return newImage.id
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

