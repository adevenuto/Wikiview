
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
    var search = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cpageimages&generator=search&redirects=1&exlimit=10&exintro=1&piprop=thumbnail&pithumbsize=240&pilimit=10&gsrsearch=' +inputField+ '&gsrnamespace=0&gsrlimit=10&gsrenablerewrites=1';
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
      var k = key;
      var img = pages[k].thumbnail;
      $('#display').append('<div class="page item">' +
                               '<a href="https://en.wikipedia.org/wiki/' + pages[k].title + '">' +
                               '<h1>' + pages[k].title + '</h1>' +
                                  (img ? '<img src=' + pages[k].thumbnail.source + '>' : '') +
                               '<p>' + pages[k].extract + '</p>' +
                               '</a>' +
                            '</div>');
    })
  }
