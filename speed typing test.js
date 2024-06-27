let speedTypingTest = document.getElementById("speedTypingTest");
let timer = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let result = document.getElementById("result");
let quoteInput = document.getElementById("quoteInput")
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinner = document.getElementById("spinner");

let uniqueId;

function displayTimer() {
    let time = 0
    uniqueId = setInterval(function() {
        time += 1
        timer.textContent = time
    }, 1000)
}

function displayQuote() {
    let url = "https://apis.ccbp.in/random-quote"
    let options = {
        method: "GET"
    }
    spinner.classList.remove("d-none")
    speedTypingTest.classList.add("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json()
        })
        .then(function(jsonData) {
            let quote = jsonData.content;
            spinner.classList.add("d-none");
            speedTypingTest.classList.remove("d-none");
            quoteDisplay.textContent = quote;
            result.textContent = ""
            displayTimer()
        });
}
displayQuote();
resetBtn.addEventListener("click", function() {
    clearInterval(uniqueId);
    displayQuote()
})
submitBtn.addEventListener("click", function() {
    let quoteDsiplayed = quoteDisplay.textContent
    let quoteInputValue = quoteInput.value;
    if (quoteDsiplayed !== quoteInputValue || quoteInputValue === "") {
        result.textContent = "You typed incorrect sentence"
    } else {
        clearInterval(uniqueId);
        let resultTime = timer.textContent
        result.textContent = "You typed in " + resultTime + " seconds."
    }
})