// Author:  Giovanni Santini
// Mail:    giovanni.santini@proton.me
// License: MIT

let svgns = "http://www.w3.org/2000/svg"
let width = 500
let height = 500
let scaleSlider = document.getElementById("scaleSlider")
let scale = parseFloat(scaleSlider.value)
scaleSlider.oninput = function() {
    scale = parseFloat(this.value)
    render()
}

let aSlider = document.getElementById("aSlider")
let a = parseFloat(aSlider.value) / 100.0
aSlider.oninput = function() {
    a = parseFloat(this.value) / 100.0
    render()
}
let bSlider = document.getElementById("bSlider")
let b = parseFloat(bSlider.value) / 100.0
bSlider.oninput = function() {
    b = parseFloat(this.value) / 100.0
    render()
}

let image = document.getElementById("svg-image")
image.setAttribute("width", width)
image.setAttribute("height", height)
image.setAttribute("viewBox", "" + (-width) + " " + (-height) + " " + (width * 2) + " " + (height * 2) )

function f(t)
{
    if (b === 0) return { x: 0, y: 0 };
    return {
        "x": (a + b) * Math.cos(t) + b * Math.cos((a + b) / b * t),
        "y": (a + b) * Math.sin(t) + b * Math.sin((a + b) / b * t)
    }
}

function render()
{
    image.replaceChildren()
    
    let border = document.createElementNS(svgns, "rect")
    border.setAttribute("x", -width)
    border.setAttribute("y", -height)
    border.setAttribute("width", width * 2)
    border.setAttribute("height", height * 2)
    border.setAttribute("fill", "none")
    border.setAttribute("stroke", "white")
    border.setAttribute("stroke-width", "3")
    image.appendChild(border)

    for (let t = 0.0; t < 20 * Math.PI; t += 0.02)
    {
        let circle = document.createElementNS(svgns, "circle")
        let point = f(t)
        circle.setAttribute("cx", scale * point.x)
        circle.setAttribute("cy", scale * point.y)
        circle.setAttribute("r", "1")
        circle.setAttribute("fill", "white")
        image.appendChild(circle)
    }

    console.log("Rendered")
}

render()

console.log("OK")
