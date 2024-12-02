let kraje = null
let x = 0
let correct = 0
let wrong = 0
let running = true

async function getData() {
    const res = await fetch("https://restcountries.com/v3.1/region/europe")
    const data = await res.json()
    return data
}

async function nazwy() {
    kraje = await getData()
    console.log(kraje)

    x = Math.floor((Math.random() * kraje.length))

    document.querySelector("img").setAttribute("src", kraje[x].flags.png)
        
    document.querySelector("#name").textContent = kraje[x].name.common

}

nazwy()

localStorage.setItem("theme", localStorage.getItem("theme"))

function checkTheme() {
    if(localStorage.getItem("theme") == "white" || localStorage.getItem("theme") == null) {
        document.querySelector("body").style.backgroundColor = "white"
        document.querySelector("body").style.color = "black"
    }
    else if(localStorage.getItem("theme") == "black") {
        document.querySelector("body").style.backgroundColor = "black"
        document.querySelector("body").style.color = "white"
    }
}

checkTheme()

function changeTheme() {
    // check if theme is white or black and toggle it to the other theme
    // also store the selected theme in localStorage
    if(localStorage.getItem("theme") == "white" || localStorage.getItem("theme") == null) {
        localStorage.setItem("theme", "black")
    }
    else if(localStorage.getItem("theme") == "black") {
        localStorage.setItem("theme", "white")
    }
    
    checkTheme()
    
    console.log(localStorage.getItem("theme"))
}

function checkAnswer() {
    let answer = document.querySelector("#input").value.trim()

    answer = answer.slice(0,1).toUpperCase() + answer.slice(1).toLowerCase()

    if(answer.length <= 1) {
        console.log("No answer given (must be longer than 1 character)")
    }
    else {
        if(answer == kraje[x].capital) {
            console.log("Answer: " + answer + " (correct)")
            correct++
            document.querySelector("#right").textContent = "correct: " + correct
            document.querySelector("input").style.backgroundColor = "lime"
            
            const li = document.createElement("li")
                li.textContent = "Answer: " + answer
                li.style.color = "lime"
            document.querySelector("ol").appendChild(li)

            nazwy()
        }
        else {
            console.log("Answer: " + answer + " (incorrect)")

            wrong++
            document.querySelector("#wrong").textContent = "incorrect: " + wrong + " / 5"
            document.querySelector("input").style.backgroundColor = "red"
            
            const li = document.createElement("li")
                li.textContent = "Answer: " + answer
                li.style.color = "red"
            document.querySelector("ol").appendChild(li)
            
            nazwy()
        }
    }

    let color = "red"

    // determine color for the game end message
    switch(correct) {
        case 0: {
            color = "red"
            break
        }
        case 1, 2: {
            color = "coral"
            break
        }
        case 3: {
            color = "orange"
            break
        }
        case 4: {
            color = "lightgreen"
            break
        }
        case 5: {
            color = "lime"
            break
        }
    }

        
    // if wrong answers hit 5, output a message with the right color
    if(wrong >= 5) {
        const li = document.createElement("li")
                li.textContent = "Game over! Corrent answers: " + correct + " (refresh the page to play again)"
                li.style.color = color
        document.querySelector("ul").appendChild(li)

        running = false
    }

    // check if the game has finished
    if(running == false) {
        document.querySelector("#name").style.display = "none"
        document.querySelector("img").style.display = "none"
        document.querySelector("#input").style.display = "none"
        document.querySelector("#check").style.display = "none"
    }
}