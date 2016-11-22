
  $(document).on('keypress', function(e) {
    var inputField = $('#input-field').val();
    if (e.which === 13 && inputField !== "") {
      wikiReq(true, inputField);
    }
  });
  $('.fa-search').on('mousedown', function(){
    var inputField = $('#input-field').val();
    if (inputField !== "") {
      wikiReq(true, inputField);
    }
  })
  $('#rand').on('mousedown', function(){
    var inputField = $('#input-field').val();
      wikiReq(false, inputField);
  })
  function wikiReq(isRand, inputField) {
    var searchType;
    var search = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cpageimages&generator=search&gsrlimit=20&gsrsearch='+inputField+'&redirects=1&exlimit=20&exintro=1&piprop=thumbnail&pithumbsize=240",true)';
    var random = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cpageimages&generator=random&redirects=1&exlimit=20&exintro=1&piprop=thumbnail&pithumbsize=240&pilimit=20&grnnamespace=0&grnlimit=20",true)';
    if (isRand) {searchType = search} else {searchType = random};
    $.ajax({
        url: searchType,
        data: {},
        dataType: 'jsonp',
        success: function (data) {
          console.log(data);
          processResult(data);
        }
    });
  }

  function processResult(apiResult){
    $('#display').empty();
    var pages   = apiResult.query.pages;
    var tracker = Object.keys(pages);

    tracker.forEach(function(key) {
      $('#display').append('<div class="page item">' +
                               '<a href="https://en.wikipedia.org/wiki/' + pages[key].title + '">' +
                               '<h1>' + pages[key].title + '</h1>' +
                               // '<img src=' + pages[key].thumbnail.source + '>' +
                               '</a>' +
                               '<p>' + pages[key].extract + '</p>' +
                            '</div>');
    })
  }


// https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cpageimages&generator=random&redirects=1&exlimit=10&exintro=1&piprop=thumbnail&pithumbsize=240&pilimit=10&grnnamespace=0&grnlimit=10",true)