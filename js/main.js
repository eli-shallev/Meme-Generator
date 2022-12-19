'use srtict'

let gElCanvas
let gCtx

function onInit() {
    renderGallery()
    renderWordPool()
    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')

    document.querySelector('.fill-color').value = '#ffffff'
    gCtx.textBaseline = "top"
    gCtx.lineWidth = 3

    setGalleryHeight()
    setImageContainerHeight()
    emojiScroll(0)
    window.addEventListener('resize', (event) => {
        setGalleryHeight()
        setImageContainerHeight()
    })
}

function setGalleryHeight() {
    const diff = document.body.offsetWidth > 600 ? 80 : 15
    let height = document.querySelector('html').clientHeight - document.querySelector('.main-header').offsetHeight - diff
    document.querySelector('.main-gallery').style.height = `${height}px`
}

function setImageContainerHeight() {
    const diff = document.body.offsetWidth > 600 ? 60 : 10
    let height = document.querySelector('.main-gallery').clientHeight - document.querySelector('.fillters').offsetHeight - diff
    document.querySelector('.images-container').style.height = `${height}px`
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onAbout(){
    const elMsg = document.querySelector('.about-msg')
    elMsg.classList.add('shown')
    setTimeout(() => {
        elMsg.classList.remove('shown')
    }, 2000);
    if(document.body.classList.contains('menu-open')) onToggleMenu()
}