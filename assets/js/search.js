    $(document).ready(function(){
        $(document).on('keypress', function(e) {
            var inputField = $('#input-field').val();
            if (e.which === 13 && inputField !== "") {
              $.ajax({
                  url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cpageimages&generator=search&gsrlimit=20&gsrsearch='+inputField+'&redirects=1&exlimit=20&exintro=1&piprop=thumbnail&pithumbsize=240",true)',
                  data: {
                          // action: 'query',
                          // list: 'search',
                          // srsearch: inputField,
                          // format: 'json'
                        },
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
    var pages   = apiResult.query.pages;
    var tracker = Object.keys(pages);

    tracker.forEach(function(key) {
      $('#display').append('<div class="page item">' +
                               '<a href="https://en.wikipedia.org/wiki/' + pages[key].title + '">' +
                               '<h3>' + pages[key].title + '</h3>' +
                               '<p>' + pages[key].extract + '</p>' +
                               // '<img src=' + pages[key].thumbnail.source + '>' +
                               '</a>' +
                            '</div>');
    })
  }


// https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cpageimages&generator=random&redirects=1&exlimit=10&exintro=1&piprop=thumbnail&pithumbsize=240&pilimit=10&grnnamespace=0&grnlimit=10",true)