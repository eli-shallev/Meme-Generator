'use srtict'

let gElCanvas
let gCtx

function onInit(){
    renderGallery()

    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')

    gCtx.font = "48px impact";
    gCtx.lineWidth = 3
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = 'black'

}