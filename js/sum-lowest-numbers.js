// --- Show Code Function --- //

$('#show-3').click(function() {
  $('#hiddenCode-3').show(1000);
});

// --- Function: Add numbers in a blank array and display--- //

let inputArray = [];
let size = 4;

(function() {
  const input = document.querySelector("#add-input");
  const btnAdd = document.querySelector("#add-button");
  const btnSum = document.querySelector("#sum-button");
  const show = document.querySelector("#userArray");
  const showSum = document.querySelector("#sumArray");
  let index = 0;
  
  btnAdd.onclick = () => {
    
    for(var i=0; i<size; i++) {
        inputArray[i] = prompt('Enter an Integer ' + (i+1));
    }
    show.innerHTML += inputArray.join();
    
  }
  btnSum.onclick = () => {
    inputArray.sort((a, b) => a - b);
    showSum.innerHTML = parseInt(inputArray[0]) + parseInt(inputArray[1]);
  }
})();



