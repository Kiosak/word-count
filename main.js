// Set the maximum number of words in the textarea field.
let maxWords = 200;

// Executes on .card click
// Listen only to the focused textarea for all keyboard events.
$('.card').click(function(event) {
  const target = $(event.target);
  
  if (target.is('textarea')) {
    target.keydown(calcucalteWords);
  }
});

// Count the number of words
function calcucalteWords(event) {
  // A temporary array for the maximum number of words to prevent an over limit.
  // Executes only when the maximum number of words is reached.
  let maxWordsArr;

  // Get the entered data
  // Trim the words into an array
  // Count words
  const getInput = event.currentTarget.value;
  const words = getInput.trim().split(/\s+/);
  const wordsArr = words.map(x => x != '');
  const len = wordsArr.length;
  // Check the last element in wordsArr, if it is equal to an empty string, avoid counting this element
  const countWords = wordsArr[len - 1] == '' ? len - 1 : len;
  

  // Get the output field
  const outputCount = event.target.parentElement.parentNode.children[2].children[0];
  const outputLine = event.target.parentElement.parentNode.childNodes[5];

  // Check the number of words entered limit of words
  if (countWords >= maxWords) {
    // Avoid input over limit and copy paste
    if (event.which === 86 || event.which === 32) {
      event.preventDefault();
    }
    // Set warning color when limit of words is reached
    $(outputLine)
      .removeClass('text-secondary')
      .addClass('text-danger');

    // Cut extra words
    maxWordsArr = words.slice(0, maxWords).join(' ');
    event.currentTarget.value = maxWordsArr;
  } else {
    // Set the normal color when below the word limit.
    $(outputLine)
      .removeClass('text-danger')
      .addClass('text-secondary');
  }

  // Display counted words
  outputCount.innerText = countWords;
}
