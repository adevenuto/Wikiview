    $(document).ready(function(){
        $(document).on('keypress', function(e) {
            var inputField = $('#input-field').val();
            if (e.which === 13 && inputField !== "") {
              $.ajax({
                  url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cpageimages&generator=search&gsrsearch='+inputField+'&redirects=1&exlimit=10&exintro=1&piprop=thumbnail&pithumbsize=240&pilimit=10&grnnamespace=0&grnlimit=10",true)',
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


    for(var i = 0;i<tracker.length;i++) {

      var p1 = tracker[0]
      var p2 = tracker[1]
      $('#display').append('<div class="result row">' +
                            '<div class="col-sm-6 page">' +
                               '<a href="https://en.wikipedia.org/wiki/' + pages[p1].title + '">' +
                               '<h3>' + pages[p1].title + '</h3>' +
                               '<p>' + pages[p1].extract + '</p>' +
                               // '<img src=' + pages[p1].thumbnail.source + '>' +
                               '</a>' +
                             '</div>' +
                             '<div class="col-sm-6 page">' +
                               '<a href="https://en.wikipedia.org/wiki/' + pages[p2].title + '">' +
                               '<h3>' + pages[p2].title + '</h3>' +
                               '<p>' + pages[p2].extract + '</p>' +
                               // '<img src=' + pages[p2].thumbnail.source + '>' +
                               '</a>' +
                             '</div>' +
                            '</div>');
      tracker.splice(0,2);
    }
  }


// https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cpageimages&generator=random&redirects=1&exlimit=10&exintro=1&piprop=thumbnail&pithumbsize=240&pilimit=10&grnnamespace=0&grnlimit=10",true)