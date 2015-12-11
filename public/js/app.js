$(function() {

  var $form = $("#urlForm");
  var $formArea = $("#form-area");
  var $trieData = $("#trie-data");
  var $responseArea = $("#response-area");
  var $autocompleteVal = $("#autocomplete-val");
  var $wordCount = $("#word-count");
  var $url = $("#url");
  var $uniqueWordCount = $("#unique-word-count");
  var $reset = $("#reset");
  var wordTrie;

  $responseArea.hide();

  $form.on('submit', function(e) {
    e.preventDefault();
    var $urlInput = $(this).find('input');
    var formData = $urlInput.val();

    $.get('/text?url='+encodeURIComponent(formData), function(res) {

      $wordCount.text(res.length);
      $uniqueWordCount.text(res.uniqueLength);
      $url.text(formData);

      wordTrie = new Trie();

      res.data.forEach(function(word) {
        wordTrie.learn(word);
      });
      
      $formArea.slideUp(1000, function() {
        $urlInput.val("");
      });
      $responseArea.fadeIn(1000);

    });
  });

  $autocompleteVal.on('keyup', function() {
    var $this = $(this);
    $trieData.empty();
    wordTrie.autoComplete($this.val().trim()).forEach(function(word) {
      $trieData.append('<li>' + word + '</li>');
    });
  });

  $reset.on('click', function() {
    $formArea.slideDown(1000);
    $responseArea.fadeOut(1000, function() {
      $autocompleteVal.val("");
      $trieData.empty();
    });
  });

});