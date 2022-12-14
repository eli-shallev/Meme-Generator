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

}