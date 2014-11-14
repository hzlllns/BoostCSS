//clean array elements by value
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
  //create array for css(?)
  self.list = [];

  //turn css into string(?)
  self.originalCss = "";

  //reset default button's setting 
  //use do function on input css  
  self.cssSubmit = function(e) {
    e.preventDefault();
    self.do(document.getElementById('input').value);
  } 

  //implement all functions
  self.do = function(originalCss) {

    //create empty array to push elements later 
    self.list = [];

    //store original css
    self.originalCss = originalCss;

    //store css with removed line breaks
    var stripedCss = self.stripCss(originalCss);

    //store css chunks 
    var dirtyElements = self.breakCssToElements(stripedCss);

    //push chunks in list[]
    self.importElements(dirtyElements);

    //start sort css
    self.sortRules();

    //the list at this point is sorted
    //TODO: output the list
    console.log(self.list);
  }

  //remove line breaks
  self.stripCss = function(originalCss){
    return originalCss.replace(/\n/g, '');
  }

  //divide css into parts -> one selector = one part
  self.breakCssToElements = function(stripCSS) {
      return stripCSS.split('}').clean("");
  }

  //function to store css in array
  self.importElements = function(dirtyElements) {

    for (var i =  0; i < dirtyElements.length; i++) {
        self.list.push(new cssRule(dirtyElements[i]));
    };
  }

  //change css order
  self.sortRules = function(){
    for (var i = 0; i < self.list.length; i++) {
      self.list[i].sortRules();
    };
  }

  //start cssSubmit function after the button is clicked
  document.getElementById('submitBtn').addEventListener('click', self.cssSubmit); 

}

//create rules for sorting css
var cssRule = function(dirtyElement){
  var self = this;

  //create array for selectors
  self.selectors = [];
  //create array for properties
  self.properties = [];

  //implement all functions
  self.cleanDirtyElement = function(dirtyElement){

    var tmp = self.breakElement(dirtyElement);

    self.parseSelectors(tmp[0]);

    self.parseProperties(tmp[1]);
  }

  //divide strings to selectors and properties
  self.breakElement = function(dirtyElement){

    //remove extra spaces
    dirtyElement = dirtyElement.trim();

    //split css by '{' and remove empty elements
    return dirtyElement.split('{').clean("");
  }

  //divide multiple selectors
  self.parseSelectors = function(dirtySelectors){

    //remove spaces in selectors
    dirtySelectors = dirtySelectors.trim();

    //split selectors by ',' to array and clean empty elements
    self.selectors = dirtySelectors.split(',').clean("");

  }

  //divide properties to one line "key: value"
  self.parseProperties = function(dirtyProperties){

    //remove extra space
    dirtyProperties = dirtyProperties.trim();

    //divide properties to single lines
    var tmpProperties = dirtyProperties.split(';').clean("");

    //call function to split one line
    for (var i = 0; i < tmpProperties.length; i++) {
        self.parseProperty(tmpProperties[i]);
    };
  }

  //divide property to keys and values
  self.parseProperty = function(dirtyProperty){

    //remove extra spaces
    dirtyProperty = dirtyProperty.trim();

    //divide string to keys and values
    var tmp = dirtyProperty.split(':').clean("");

    //push clean elements to array object
    self.rules.push({ key: tmp[0].trim(), value: tmp[1].trim() });

  }

  //sort compared keys
  self.sortProperties = function() {
    self.properties.sort(self.compare);
  }

  //compare keys with json 
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

//create an instance 
var tool = new cssTool();







