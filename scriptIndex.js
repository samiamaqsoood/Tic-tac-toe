start();

async function start(params) {
    await chooseSymbol();
    await tossing(); // Start the tossing process
    console.log("tossing done");
    startGame(tossWinner); // Start the game based on toss winner

};
async function startGame(tossWinner) {
     document.querySelector("#reset-button").style.display = "block";
    if (tossWinner === 'user') {    
        document.querySelector("#status-box").textContent = "It's your turn!";
        usersTurn(); // User starts first
    }
    else if (tossWinner === 'computer') {
        document.querySelector("#status-box").textContent = "It's computer's turn!";
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
        computersTurn(); // Computer makes the first move
    }

}
// first symbol will be decided for user and computer

let userSymbol = '';
let computerSymbol = '';

function chooseSymbol() {
    return new Promise(resolve => {
     const radioButtons = document.querySelectorAll('input[name="symbol"]');

     // Remove any previous listeners (optional cleanup if needed)
      radioButtons.forEach(radio => {
         const newRadio = radio.cloneNode(true); // clone it
         newRadio.checked = radio.checked;
         radio.parentNode.replaceChild(newRadio, radio); // replace it
     });

       // Re-select the now-cleaned buttons
     const cleanedButtons = document.querySelectorAll('input[name="symbol"]');

      cleanedButtons.forEach(radio => {
      radio.addEventListener('change', () => {
     if (radio.checked) {
      userSymbol = radio.value;  // Store selected symbol in variable
      console.log("User chose:", userSymbol); // Optional debug
      }
      let symbolSection = document.querySelector("#symbol-choice");
      symbolSection.style.display = "none";

       let statusBox = document.querySelector("#status-box");
       statusBox.textContent = `You selected ${userSymbol.toUpperCase()}. Click the toss button to start!`;

       let tossButton = document.querySelector("#toss-button");
      tossButton.style.display = "block";
      resolve(); // Resolve the promise after setting up the event listeners
 
  },{ once: true });
  
});

    
  })};


//   tossing will haappen after user chooses symbol
let turn = ''; // starts first
let tossWinner = '';
let isWinner = false;

function tossing() {
    return new Promise(resolve => {
// Toss button functionality
 let tossButton = document.querySelector("#toss-button");
    tossButton.addEventListener('click', () => {
    tossButton.style.display = "none";

    let statusBox = document.querySelector("#status-box");
    statusBox.style.display= "none";

    let tossResult = document.querySelector("#toss-result");
    tossResult.style.display = "block";
    tossResult.textContent = "Tossing...";


    setTimeout(()=>{
    let randomNumber = Math.floor(Math.random()*2);
    console.log("Toss result:", randomNumber); // Optional debug
    if (randomNumber === 0) {
        turn = 'x';
        document.querySelector("#toss-result").textContent = "X wins the toss! X starts first.";
        document.querySelector("#toss-result").style.backgroundColor = "lightblue";
        if(userSymbol === 'x' && turn === 'x') {
            tossWinner = 'user';
            document.querySelector("#status-box").textContent = "It's X's turn!";
        }
        else if (userSymbol === 'o' && turn === 'x') {
            tossWinner = 'computer';
        }
    }
    else if (randomNumber === 1) {
        turn = 'o';
        document.querySelector("#toss-result").textContent = "O wins the toss! O starts first.";
         document.querySelector("#toss-result").style.backgroundColor = "lightgreen";
        if(userSymbol === 'o' && turn === 'o') {
            tossWinner = 'user';
            document.querySelector("#status-box").textContent = "It's O's turn!";

        }
        else if (userSymbol === 'x' && turn === 'o') {
            tossWinner = 'computer';
        }
        
    }
    if (userSymbol === 'x') {
    computerSymbol = 'o';
    }   
    else if (userSymbol === 'o') {
    computerSymbol = 'x';
    }
        console.log("Computer symbol:", computerSymbol); // Optional debug
        console.log("User symbol:", userSymbol); // Optional debug
        console.log("Toss winner:", tossWinner); // Optional debug

        resolve(); // Resolve the promise after the toss is completed

}, 2000);


});
})
};

const cells = document.querySelectorAll('.cell');

// Computer's turn logic
async function computersTurn() {
    const emptyCells = Array.from(cells).filter(cell => cell.innerHTML.trim() === "");
    if (emptyCells.length === 0) {
        return; // No empty cells left, exit the function
    }
    
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const selectedCell = emptyCells[randomIndex];

    await new Promise(resolve => setTimeout(resolve, 800));

   if (computerSymbol === 'x') {
    selectedCell.innerHTML = `<img src="/images/x.png" alt="O" style="width: 100%; height: 100%;">`;
    selectedCell.style.backgroundColor = 'lightgreen';
    selectedCell.removeEventListener('click', handleCellClick); // Remove click event after computer's move
     if (checkForWinner()) {
         document.querySelector("#toss-result").style.display = "block";
         document.querySelector("#status-box").style.display = "none";
         document.querySelector("#toss-result").textContent = "Computer wins!";
         isWinner = true; // Set winner flag
         return; // Stop if there's a winner
     }
     else if (checkForDraw()) {
         document.querySelector("#status-box").style.display = "none";
        document.querySelector("#toss-result").style.display = "block";
        document.querySelector("#toss-result").textContent = "It's a draw!";
        return; // Stop if it's a draw      
     }
     
     else {
          if (computerSymbol === 'x' && turn === 'x') {
              turn = 'o'; // Switch turn
               document.querySelector("#toss-result").style.display = "none";
               document.querySelector("#status-box").style.display = "block";
               document.querySelector("#status-box").textContent = "It's O's turn!";
            }
          else if (computerSymbol === 'o' && turn === 'o') {
              turn = 'x'; // Switch turn 
               document.querySelector("#toss-result").style.display = "none";
               document.querySelector("#status-box").style.display = "block"; 
              document.querySelector("#status-box").textContent = "It's X's turn!";
            }
          usersTurn(); // Call user's turn after computer's move
       }
    }
   else if (computerSymbol === 'o') {
    selectedCell.innerHTML = `<img src="/images/o.png" alt="O" style="width: 100%; height: 100%;">`;
    selectedCell.style.backgroundColor = 'lightgreen';
     selectedCell.removeEventListener('click', handleCellClick); // Remove click event after computer's move
     if (checkForWinner()) {
         document.querySelector("#toss-result").style.display = "block";
         document.querySelector("#status-box").style.display = "none";
         document.querySelector("#toss-result").textContent = "Computer wins!";
        isWinner = true; // Set winner flag
        return; // Stop if there's a winner
     }
     else if (checkForDraw()) {
         document.querySelector("#toss-result").style.display = "block";
         document.querySelector("#status-box").style.display = "none";
         document.querySelector("#toss-result").textContent = "It's a draw!";
        return; // Stop if it's a draw      
     }
     
     else {
        if (computerSymbol === 'x' && turn === 'x') {
            turn = 'o'; // Switch turn
             document.querySelector("#toss-result").style.display = "none";
             document.querySelector("#status-box").style.display = "block";
             document.querySelector("#status-box").textContent = "It's O's turn!";
            }
             else if (computerSymbol === 'o' && turn === 'o') {
             turn = 'x'; // Switch turn  
               document.querySelector("#toss-result").style.display = "none";
                document.querySelector("#status-box").style.display = "block";
             document.querySelector("#status-box").textContent = "It's X's turn!";
             }
           usersTurn(); // Call user's turn after computer's move
     }

   }

   
}


// users turn logic
function usersTurn() {
      cells.forEach(cell => {
        if (cell.innerHTML.trim() === "") {
            cell.addEventListener('click', handleCellClick);
        }
    });
};

// Add click event to each cell
function addCellClickEvents() {
     cells.forEach(cell => {
        cell.addEventListener('click',handleCellClick);
    });
}
// remove click event
function removeAllCellClickEvents() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}
function handleCellClick(event) {
         if (userSymbol === 'x' && turn === 'x') {
           if (event.target.innerHTML.trim() !== "") return;
              event.target.innerHTML = `<img src="/images/x.png" alt="X" style="width: 100%; height: 100%;">`;
              event.target.style.backgroundColor = 'lightblue';

              removeAllCellClickEvents();

              
             if (checkForWinner()) {
                 document.querySelector("#toss-result").style.display = "block";
                 document.querySelector("#status-box").style.display = "none";
                  document.querySelector("#toss-result").textContent = "You win!";
                  isWinner = true; // Set winner flag
                  return; // Stop if there's a winner
                }
              else if(checkForDraw()){
                 document.querySelector("#toss-result").style.display = "block";
                 document.querySelector("#status-box").style.display = "none";
                 document.querySelector("#toss-result").textContent = "It's a draw!";
                  return; // Stop if it's a draw
                }
             
             else{
                 if (userSymbol === 'x' && turn === 'x') {
                     turn = 'o'; // Switch turn
                      document.querySelector("#toss-result").style.display = "none";
                      document.querySelector("#status-box").style.display = "block";
                     document.querySelector("#status-box").textContent = "It's O's turn!";
                    }
                 computersTurn(); // Call computer's turn after user's move
                 }


              
            }
         else if (userSymbol === 'o' && turn === 'o') {
            if (event.target.innerHTML.trim() !== "") return;
              event.target.innerHTML = `<img src="/images/o.png" alt="O" style="width: 100%; height: 100%;">`;
              event.target.style.backgroundColor = 'lightblue';
              removeAllCellClickEvents();

              
               if (checkForWinner()) {
                 document.querySelector("#toss-result").style.display = "block";
                 document.querySelector("#status-box").style.display = "none";
                  document.querySelector("#toss-result").textContent = "You win!";
                   isWinner = true; // Set winner flag
                   return; // Stop if there's a winner
              }
              else if(checkForDraw()){
                 document.querySelector("#toss-result").style.display = "block";
                 document.querySelector("#status-box").style.display = "none";
                  document.querySelector("#toss-result").textContent = "It's a draw!";
                   return; // Stop if it's a draw
                }
             
              else{
                  if (userSymbol === 'o' && turn === 'o') {
                      turn = 'x'; // Switch turn  
                       document.querySelector("#toss-result").style.display = "none";
                      document.querySelector("#status-box").style.display = "block";
                      document.querySelector("#status-box").textContent = "It's X's turn!";
                   }
                  computersTurn(); // Call computer's turn after user's move

                }

            }
}

function checkForWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].innerHTML.trim() !== "" && 
            cells[a].innerHTML === cells[b].innerHTML && 
            cells[a].innerHTML === cells[c].innerHTML) {
            isWinner = true;
            document.querySelector("#status-box").textContent = `${cells[a].innerHTML.trim()} wins!`;
            return true; // Winner found
        }
    }

    return false; // No winner yet
}

function checkForDraw() {
    for (const cell of cells) {
        if (cell.innerHTML.trim() === "") {
            return false; // At least one cell is empty, so not a draw
        }
    }
    document.querySelector("#status-box").textContent = "It's a draw!";
    return true; // All cells are filled, and no winner
}

let resetBtn = document.querySelector("#reset-button");
resetBtn.addEventListener('click',resetGame);
function resetGame() {
    // 1. Clear all cells
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.style.backgroundColor = ""; // reset background
        cell.removeEventListener('click', handleCellClick);
    });

    // 2. Reset all game state variables
    userSymbol = '';
    computerSymbol = '';
    turn = '';
    tossWinner = '';
    isWinner = false;

    const radioButtons = document.querySelectorAll('input[name="symbol"]');
    radioButtons.forEach(radio => radio.checked = false); // Uncheck all

    // 3. Reset UI elements
    document.querySelector("#symbol-choice").style.display = "block";
    document.querySelector("#toss-button").style.display = "none";
    document.querySelector("#toss-result").style.display = "none";
    document.querySelector("#status-box").style.display = "none";
    document.querySelector("#reset-button").style.display = "none"; // hide reset again

    // 4. Restart game flow
    start();
}