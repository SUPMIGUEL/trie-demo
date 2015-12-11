function Trie (){
  this.characters = {};
}

Trie.prototype.learn = function(word, index){

  index = index || 0;

  if(index === word.length){
    this.isWord = true;
  } else if(index < word.length){
    var char = word[index];
    var subTrie = this.characters[char] || new Trie();
    subTrie.learn(word, index+1);
    this.characters[char] = subTrie;
  }
  return this;
};

Trie.prototype.getWords = function(words, currentWord){

  currentWord = currentWord || "";
  words = words || [];

  if(this.isWord){
    words.push(currentWord);
  }
  for(var char in this.characters){
    var nextWord = currentWord + char;
    this.characters[char].getWords(words,nextWord);
  }
  return words;
};

Trie.prototype.find = function(word, index){

  index = index || 0;
  var char = word[index];
  if(index < word.length - 1 && this.characters[char]){
    index += 1;
    return this.characters[char].find(word, index);
  } else {
    return this.characters[char];
  }
};

Trie.prototype.autoComplete = function(prefix){

  var subTrie = this.find(prefix);
  if(subTrie){
    return subTrie.getWords([], prefix);
  } else{
    return [];
  }

};