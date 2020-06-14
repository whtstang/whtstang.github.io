//function encode(string) {
//  const newString = string
//    .replace(/a/g, 1)
//    .replace(/e/g, 2)
//    .replace(/i/g, 3)
//    .replace(/o/g, 4)
//    .replace(/u/g, 5)
//  
//  console.log(newString);
//}

// --- Show Code Function --- //

$('#show-1').click(function() {
  $('#hiddenCode-1').show();
});

$('#show-2').click(function() {
  $('#hiddenCode-2').show();
});

// ---- Encode Function --- //

encode = (string) => {
  const newString = string
    .replace(/a/g, 1)
    .replace(/e/g, 2)
    .replace(/i/g, 3)
    .replace(/o/g, 4)
    .replace(/u/g, 5)
  
  console.log(newString);
}

// --- Decode Function ---//

decode = (string) => {
  const newString = string
    .replace(/1/g, "a")
    .replace(/2/g, "e")
    .replace(/3/g, "i")
    .replace(/4/g, "o")
    .replace(/5/g, "u")
  
  console.log(newString);
}





