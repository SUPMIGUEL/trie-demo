$(function() {

  var $form = $("#urlForm");
  var $trieData = $("#trie-data");
  var $responseArea = $("#response-area");
  var $autocompleteVal = $("#autocomplete-val");
  $responseArea.hide();

  $form.on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).find('input').val();

    $.get('/text?url='+encodeURIComponent(formData), function(res) {

      $trieData.append(res.data);
      $responseArea.fadeIn(1000);

    });
  });

});