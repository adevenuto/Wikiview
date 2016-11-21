function appendChar(char, start) {
  var display = $('#user-query-show');
  if (display.text().length === start) {
    display.append(char);
  } else {
    var addToMiddle = display.text().slice(0, start)+char+display.text().substring(start);
    display.html(addToMiddle);
  }
}
function removeChar(start) {
  var display = $('#user-query-show');
  if (start === 1) { // remove first char if cursor position === 1
    var x = display.text().substring(1);
    display.html(x);
  } else if (display.text().length === start) { // remove last char if cursor is at the end of string
    var y = display.text().slice(0,-1);
    display.html(y);
  } else { // remove inner char
    var z = display.text().slice(0, start-1) + display.text().substring(start);
    display.html(z);
  }
}

function alterString() {
  var input = document.getElementById('input-field');
  var display = $('#user-query-show');
  var start = input.selectionStart;
  var end = input.selectionEnd;
  // call removeChar() if text is not highlighted
  if (start === end && start !== 0) {
    removeChar(start);
    // remove highlighted char's from the front
  } else if (start === 0) {
    var rmFront = display.text().substring(end);
    display.html(rmFront);
    // remove highlighted char's from the end
  } else if (display.text().length === end) {
    var rmEnd = display.text().slice(0, start);
    display.html(rmEnd);
  } else {
    // remove highlighted char's from the middle
    var rmMiddle = display.text().slice(0, start) + display.text().substring(end);
    display.html(rmMiddle);
  }
}

$(document).on('keypress', function(e) {
  var input = document.getElementById('input-field');
  // pass this to appendChar() to insert char's into the middle when cursor is not at the end
  var start = input.selectionStart;
  if (e.which !== 13 && $('#input-field').is(':focus')) {
    appendChar(String.fromCharCode(e.which), start);
  }
});
$(document).on('keydown', function(e) {
  if (e.which === 8 && $('#input-field').is(':focus')) {
    alterString()
  }
});
