let inputArray = [];
let size = 4;

//for(var i=0; i<size; i++) {
//        inputArray[i] = prompt('Enter Element ' + (i+1));
//}
//
//console.log(inputArray);
//
//
//sumNum = () => {
//  inputArray.sort((a, b) => a - b);
//  console.log(inputArray);
//  sum = parseInt(inputArray[0]) + parseInt(inputArray[1]);
//  console.log(sum);
//}


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
    //showSum.innerHTML = sum;
  }
})();