$(function() {

  var $form = $("#urlForm");
  var $trieData = $("#trie-data");
  var $responseArea = $("#response-area");
  var $autocompleteVal = $("#autocomplete-val");
  var $wordCount = $("#word-count");
  var $url = $("#url");
  var $uniqueWordCount = $("#unique-word-count");

  $responseArea.hide();

  $form.on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).find('input').val();

    console.log('formData outside get', formData);

    $.get('/text?url='+encodeURIComponent(formData), function(res) {

      console.log('formData inside get', formData);

      $wordCount.text(res.length);
      $uniqueWordCount.text(res.uniqueLength);
      debugger;
      $url.text(formData);

      res.data.forEach(function(word) {
        $trieData.append('<li>' + word + '</li>');
      });
      
      $responseArea.fadeIn(1000);

    });
  });

});