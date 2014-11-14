Parse.initialize("8Sgr1uNFMCv5QAXlH7o68GGnbbhm5A88P7hb0XAV", "JQdOMEwo8T6ENLZxXJokE9hzT6TNJak3o9UVvutm");

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};


var cssTool = function(){

  var self = this;
  self.list = [];

  self.originalCss = "";

  self.cssSubmit = function(e) {
    e.preventDefault();
    self.do(document.getElementById('input').value);

    // PARSE

    var InputObject = Parse.Object.extend("UserCssDB");
    var inputInstance = new InputObject();

       inputInstance.save({
         inputCSS: document.getElementById('input').value
       }, {
         success: function(object) {
           // The object was saved successfully.
           alert("Success!!");
         },
         error: function(model, error) {
           // The save failed.
           // error is a Parse.Error with an error code and message.
           alert("Failed to create new object, with error code: " + error.message);
         }
       });

  }


  self.do = function(originalCss) {

    self.list = [];

    self.originalCss = originalCss;

    var stripedCss = self.stripCss(originalCss);

    var dirtyElements = self.breakCssToElements(stripedCss);

    self.importElements(dirtyElements);

    self.sortRules();

    //the list at this point is sorted
    //TODO: output the list
    console.log(self.list);
  }


  self.stripCss = function(originalCss){
    return originalCss.replace(/\n/g, '');
  }

    self.breakCssToElements = function(stripCSS) {
        return stripCSS.split('}').clean("");
    }

  self.importElements = function(dirtyElements) {

    for (var i =  0; i < dirtyElements.length; i++) {
        self.list.push(new cssRule(dirtyElements[i]));
    };

  }

  self.sortRules = function(){
    for (var i = 0; i < self.list.length; i++) {
      self.list[i].sortRules();
    };
  }

 

  document.getElementById('submitBtn').addEventListener('click', self.cssSubmit); 

}

var cssRule = function(dirtyElement){
  var self = this;

  self.selectors = [];
  self.rules = [];

  self.cleanDirtyElement = function(dirtyElement){

    var tmp = self.breakElement(dirtyElement);

    self.parseSelectors(tmp[0]);

    self.parseRules(tmp[1]);

    
  }

  self.breakElement = function(dirtyElement){

    dirtyElement = dirtyElement.trim();

    return dirtyElement.split('{').clean("");
  }

  self.parseSelectors = function(dirtySelectors){

    dirtySelectors = dirtySelectors.trim();

    self.selectors = dirtySelectors.split(',').clean("");

  }

  self.parseRules = function(dirtyRules){

    dirtyRules = dirtyRules.trim();

    var tmpRules = dirtyRules.split(';').clean("");

    for (var i = 0; i < tmpRules.length; i++) {
        self.parseRule(tmpRules[i]);
    };



  }

  self.parseRule = function(dirtyRule){

    dirtyRule = dirtyRule.trim();

    var tmp = dirtyRule.split(':').clean("");


    self.rules.push({ key: tmp[0].trim(), value: tmp[1].trim() });

  }

   self.sortRules = function() {
    self.rules.sort(self.compare);
  }

  self.compare = function(a, b){
    if(cssOrder.indexOf(a.key) < cssOrder.indexOf(b.key)){
      return -1;
    } else {
      return 1;
    }
    return 0;
  }


  self.cleanDirtyElement(dirtyElement);

}

var tool = new cssTool();







