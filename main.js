let app = {
  maxWords: 200,
  counted: 0,
  ctrl: false,
  shift: false,
}

$('textarea').keyup(react).keydown(block);

function react(e) {
  const str = $('textarea').val();
  app.counted = calc(str);
  if (e.which === 17) {
    app.ctrl = false;
  }
  if (e.which === 16) {
    app.shift = false;
  } 
  
  $('span').text(app.counted); // display counted

  if (app.counted >= app.maxWords) { // colorised output
    $('.card-text').removeClass('text-secondary').addClass('text-danger');
  } else {
    $('.card-text').removeClass('text-danger').addClass('text-secondary');
  }
} 

function block(e) {
  const str = $('textarea').val();
  app.counted = calc(str);
  const key = e.which;
  if (key === 16) {
    app.shift = true;
  }
  if (app.counted >= app.maxWords ) {
    const wordChar = String.fromCharCode(key).search(/\w/);
    const specSymbol = String.fromCharCode(key).search(/\d/);
    const other = key.toString().search(/(^[1-9]{1}$|^[1-4]{1}[0-9]{1}$|^50$)/);
    if (key === 13 || key === 32 || (specSymbol === 0 && app.shift) || (other!== 0 && wordChar !== 0)) {
      e.preventDefault()
    } 
  }
}

function calc(str) {  
  arr = str.trim().match(/([A-z0-9'-]+)/g); // put words in array
  arr === null ? arr=[] : arr = arr; // remove empty string 
  return arr.length; 
}

const stopPasting = event => {
  const str = event.clipboardData.getData('text');
  const len = calc(str)
  if (app.counted > 0) {
    app.counted = app.counted + len; // prevent pasting over limit 
  } else {
    app.counted = len;
  }
  
	if (app.counted >= app.maxWords) {
    alert('You are trying to insert too many words!');
		return event.preventDefault();
  }
};

window.addEventListener('paste', stopPasting);