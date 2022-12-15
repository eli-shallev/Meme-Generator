'use srtict'

let gElCanvas
let gCtx

function onInit() {
    renderGallery()

    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')

    document.querySelector('.fill-color').value = '#ffffff'
    gCtx.textBaseline = "top"
    gCtx.lineWidth = 3
    
    setGalleyHeight()
    setImageContaineryHeight()
    window.addEventListener('resize', () => {
        setGalleyHeight()
        setImageContaineryHeight()
    
    })

}

function setGalleyHeight(){
    let height = document.querySelector('html').clientHeight - 80 - document.querySelector('.main-header').offsetHeight
    console.log('h:', height)
    document.querySelector('.main-gallery').style.height = `${height}px`
}

function setImageContaineryHeight(){
    let height = document.querySelector('.main-gallery').clientHeight - 60 - document.querySelector('.fillters').offsetHeight
    console.log('h:', height)
    document.querySelector('.images-container').style.height = `${height}px`
}


function onToggleMenu(){
    document.body.classList.toggle('menu-open')
}