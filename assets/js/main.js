function appendChar(char, start, end) {
  var display = $('#user-query-show');
  if (start !== end) {
    alterString(start, end)
  }
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

function alterString(start, end) {
  var display = $('#user-query-show');
  var pos1 = start;
  var pos2 = end;
  if (pos1 === pos2 && pos1 !== 0) {
    removeChar(pos1);
    // remove highlighted char's from the front
  } else if (pos1 === 0) {
    var rmFront = display.text().substring(pos2);
    display.html(rmFront);
    // remove highlighted char's from the end
  } else if (display.text().length === pos2) {
    var rmEnd = display.text().slice(0, pos1);
    display.html(rmEnd);
  } else {
    // remove highlighted char's from the middle
    var rmMiddle = display.text().slice(0, pos1) + display.text().substring(pos2);
    display.html(rmMiddle);
  }
}

$(document).on('keypress', function(e) {
  var input = document.getElementById('input-field');
  // pass this to appendChar() to insert char's into the middle when cursor is not at the end
  var start = input.selectionStart;
  var end = input.selectionEnd;
  if (e.which !== 13 && $('#input-field').is(':focus')) {
    appendChar(String.fromCharCode(e.which), start, end);
  }
});
$(document).on('keydown', function(e) {
  var input = document.getElementById('input-field');
  var start = input.selectionStart;
  var end = input.selectionEnd;
  if (e.which === 8 && $('#input-field').is(':focus')) {
    alterString(start, end)
  }
});
