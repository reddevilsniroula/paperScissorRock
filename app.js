// Get elements
const buttons = document.querySelectorAll(".choices");
const resultDiv = document.querySelector(".result");

// Choices array
const choices = ["paper", "scissor", "rock"];

// Score tracking
let playerScore = 0;
let computerScore = 0;

// Function to get computer choice
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to determine the winner of a round
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "draw"; // Return "draw" instead of string message
    }
    if (
        (userChoice === "rock" && computerChoice === "scissor") ||
        (userChoice === "scissor" && computerChoice === "paper") ||
        (userChoice === "paper" && computerChoice === "rock")
    ) {
        playerScore++;
        return "win"; // Return "win" instead of message
    }
    computerScore++;
    return "lose"; // Return "lose" instead of message
}

// Function to check if someone won the Best of 3
function checkGameWinner() {
    if (playerScore === 2) {
        resultDiv.innerHTML += `<br><br>🎊 YOU WON THE GAME! 🎊 <br> <button onclick="resetGame()">Play Again</button>`;
        disableButtons();
    } else if (computerScore === 2) {
        resultDiv.innerHTML += `<br><br>💀 COMPUTER WINS THE GAME! 💀 <br> <button onclick="resetGame()">Play Again</button>`;
        disableButtons();
    }
}

// Function to disable buttons after game ends
function disableButtons() {
    buttons.forEach(button => button.disabled = true);
}

// Function to reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    resultDiv.innerHTML = "Click Your Choice";
    buttons.forEach(button => button.disabled = false);
}

// Function to apply animations
function applyAnimation(result) {
    resultDiv.classList.remove("win", "lose", "draw"); // Remove old animation classes

    if (result === "win") {
        resultDiv.classList.add("win"); // Add bounce effect for win
    } else if (result === "lose") {
        resultDiv.classList.add("lose"); // Add shake effect for loss
    } else {
        resultDiv.classList.add("draw"); // Add pulse effect for draw
    }

    // Remove animation after 1 second to reset for next round
    setTimeout(() => {
        resultDiv.classList.remove("win", "lose", "draw");
    }, 1000);
}

// Event Listener for Click
buttons.forEach((button) => {
    button.addEventListener("click", function () {
        const userChoice = this.textContent.trim().toLowerCase();
        const computerChoice = getComputerChoice();
        const roundResult = determineWinner(userChoice, computerChoice);

        // Apply animations
        applyAnimation(roundResult);

        // Update UI with result
        let message = `You chose: <b>${userChoice}</b> <br> 
                       Computer chose: <b>${computerChoice}</b> <br>`;

        if (roundResult === "win") {
            message += "🎉 You Win this Round!";
        } else if (roundResult === "lose") {
            message += "😢 Computer Wins this Round!";
        } else {
            message += "😐 It's a Draw!";
        }

        resultDiv.innerHTML = `${message} <br><br> 🟢 Your Score: ${playerScore} | 🔴 Computer Score: ${computerScore}`;

        checkGameWinner();
    });
});
