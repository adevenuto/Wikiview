    $(document).ready(function(){
        $(document).on('keypress', function(e) {
            var inputField = $('#input-field').val();
            if (e.which === 13 && inputField !== "") {
              $.ajax({
                  url: 'https://en.wiktionary.org/w/api.php',
                  data: { action: 'query', list: 'search', srsearch: inputField, format: 'json' },
                  dataType: 'jsonp',
                  success: function (data) {
                    console.log(data);
                    processResult(data);
                  }
              });
            }
        });
    });

  function processResult(apiResult){
    $('#display').empty();
    for (var i = 0; i < apiResult.query.search.length; i++) {
      $('#display').append('<div class="result">' +
                             '<a href="https://en.wikipedia.org/wiki/' + apiResult.query.search[i].title + '">' +
                             '<h3>' + apiResult.query.search[i].title + '</h3>' +
                             '<p>' + apiResult.query.search[i].snippet + '</p>' +
                             '</a>' +
                           '</div>');
      $('.result').addClass('effect');
     }
  }


