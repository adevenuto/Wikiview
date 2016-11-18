function appendChar(char) {
  var display = $('#user-query-show');
  display.append(char);
}
function removeChar() {
  var display = $('#user-query-show');
  var pop = display.text().slice(0,-1);
  $('#user-query-show').html(pop);
}
$(document).on('keypress', function(e) {
  if (e.which !== 13) {
    appendChar(String.fromCharCode(e.which));
  }
});
$(document).on('keydown', function(e) {
  if (e.which === 8) {
    removeChar();
  }
});
