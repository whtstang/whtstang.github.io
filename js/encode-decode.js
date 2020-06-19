
// --- Show Code Function --- //

$('#show-1').click(function() {
  $('#hiddenCode-1').show(1000);
});

$('#show-2').click(function() {
  $('#hiddenCode-2').show(1000);
});

// ---- Encode Function --- //

encode = (string) => {
  const newString = string
    .replace(/a/g, 1)
    .replace(/e/g, 2)
    .replace(/i/g, 3)
    .replace(/o/g, 4)
    .replace(/u/g, 5)
  
  return (newString);
}

// --- Decode Function ---//

decode = (string) => {
  const newString = string
    .replace(/1/g, "a")
    .replace(/2/g, "e")
    .replace(/3/g, "i")
    .replace(/4/g, "o")
    .replace(/5/g, "u")
  
  return (newString);
}

// --- User input to encode ---//

$('#runBtn-1').click(function() {
  const userString = $('#inputString-1').val();
  const encoded = encode(userString);
  
  $('#encodedString').text(encoded);
  $('#inputString-1').val('');
 
});

// --- User input to decode ---//

$('#runBtn-2').click(function() {
  const userString = $('#inputString-2').val();
  const encoded = decode(userString);
  
  $('#decodedString').text(encoded);
  $('#inputString-2').val('');
 
});







