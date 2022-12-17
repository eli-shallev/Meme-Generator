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

    window.addEventListener('resize', (event) => {
        console.log(event)
        setGalleyHeight()
        setImageContaineryHeight()


    })
}

function setGalleyHeight() {
    const diff = document.body.offsetWidth > 600 ? 80 : 15
    let height = document.querySelector('html').clientHeight - document.querySelector('.main-header').offsetHeight - diff
    document.querySelector('.main-gallery').style.height = `${height}px`
}

function setImageContaineryHeight() {
    const diff = document.body.offsetWidth > 600 ? 60 : 10
    let height = document.querySelector('.main-gallery').clientHeight - document.querySelector('.fillters').offsetHeight - diff
    document.querySelector('.images-container').style.height = `${height}px`
}


function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}