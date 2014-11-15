Parse.initialize("8Sgr1uNFMCv5QAXlH7o68GGnbbhm5A88P7hb0XAV", "JQdOMEwo8T6ENLZxXJokE9hzT6TNJak3o9UVvutm");

//Set dom controls
var inputText = document.getElementById('input');
var outputText = document.getElementById('output');
var submitBtn = document.getElementById('submitBtn');
inputText.setAttribute('spellcheck', 'false');


//get user_id from cookie or generate one
var user_id = getCookie('user_id');
if (user_id == "") {
    var user_id = guid();
    setCookie('user_id', user_id, 365);
}




var cssTool = function(){

  var self = this;

  //cssRule array
  self.list = [];

  //original css
  self.originalCss = "";

  //submit button callback
  self.cssSubmit = function(e) {
    e.preventDefault();
    self.do(inputText.value, true);
  } 

  //main function
  self.do = function(originalCss, save) {

    //default save-recent true
    if(save === undefined){
        save = true;
    }

    //reset cssRule array 
    self.list = [];

    //store original css
    self.originalCss = originalCss;

    //strip css
    var stripedCss = self.stripCss(originalCss);

    //split css by "}" 
    var dirtyElements = self.breakCssToElements(stripedCss);

    //import CSS elements
    self.importElements(dirtyElements);

    //sort css
    self.sortRules();

    //output formated css
    self.outputCss();


    if(save === true){

        //save css to recent
        parse.saveRecent(originalCss);  

    }
    

  }

    //format and output CSS to textarea
    self.outputCss = function() {

        var output = "";

        for (var i = 0; i < self.list.length; i++) {
            output = output + self.list[i].formatCss();

            if(i+1 != self.list.length) {
                output = output + "\n\n";
            }
        };

        outputText.value = output;
    }

  //trim trailing space
  self.stripCss = function(originalCss){
    return originalCss.trim();
  }

  //split css by "}"
  self.breakCssToElements = function(stripCSS) {
      return stripCSS.split('}').clean("");
  }

  //import css elements
  self.importElements = function(dirtyElements) {

    for (var i =  0; i < dirtyElements.length; i++) {
        self.list.push(new cssRule(dirtyElements[i]));
    };
  }

  //sort css properties
  self.sortRules = function(){
    for (var i = 0; i < self.list.length; i++) {
      self.list[i].sortRules();
    };
  }

  submitBtn.addEventListener('click', self.cssSubmit); 

}




//css object that contains selector(s) and properties (key: value) + comments
var cssRule = function(dirtyElement){

  var self = this;

  //create array for comments
  self.comments = [];

  //create array for selectors
  self.selectors = [];

  //create array for properties
  self.properties = [];

  //main function
  self.cleanDirtyElement = function(dirtyElement){

    var tmp = self.breakElement(dirtyElement);

    self.parseComment(tmp[0]);

    self.parseSelectors(tmp[1]);

    self.parseProperties(tmp[2]);
  }

  //split element's string to comments, selectors and properties
  self.breakElement = function(dirtyElement){

    //remove extra spaces
    dirtyElement = dirtyElement.trim();

    //split css by '{' and remove empty array elements
    var tmp = dirtyElement.split('{').clean("");
    var tmp2 = tmp[0].split("*/").clean("");

    var properties = tmp[1];

    if(tmp2[1] !== undefined){
        var comment = tmp2[0];
        var selectors = tmp2[1];
    } else {
        var comment = null;
        var selectors = tmp2[0];
    }

    return [comment, selectors, properties];


  }

  //break selector's string to array
  self.parseSelectors = function(dirtySelectors){

    dirtySelectors = dirtySelectors.replace(/\n/g, '');

    //remove extra spaces
    dirtySelectors = dirtySelectors.trim();

    //split selectors by ',' to array and clean empty elements
    self.selectors = dirtySelectors.split(',').clean("");

  }

  //break properties to array of objects with key and value
  self.parseProperties = function(dirtyProperties){

    dirtyProperties = dirtyProperties.replace(/\n/g, '');

    //remove extra space
    dirtyProperties = dirtyProperties.trim();

    var tmpProperties = dirtyProperties.split(';').clean("");

    for (var i = 0; i < tmpProperties.length; i++) {
        self.parseProperty(tmpProperties[i]);
    };
  }

  //break property to key and value
  self.parseProperty = function(dirtyProperty){

    //remove extra spaces
    dirtyProperty = dirtyProperty.trim();

    //divide string to keys and values
    var tmp = dirtyProperty.split(':').clean("");

    //push clean elements to array
    self.properties.push({ key: tmp[0].trim(), value: tmp[1].trim() });

  }

  //break comments string to array
  self.parseComment = function(dirtyComment){

    if(dirtyComment !== null){
        dirtyComment = dirtyComment.replace('/*', '');
        dirtyComment = dirtyComment.replace(/\*/g, '');
        var comments = dirtyComment.split("\n").clean("");

        for(i = 0; i < comments.length; i++){
            comments[i] = comments[i].trim();
        }

        self.comments = comments;

    } else {
        self.comments = null;
    }

    

  }

  //sort properties
  self.sortRules = function() {
    self.properties.sort(self.compare);
  }

  //sort callback, compare indexOf properties' keys in css order array
  self.compare = function(a, b){
    if(cssOrder.indexOf(a.key) < cssOrder.indexOf(b.key)){
      return -1;
    } else {
      return 1;
    }
    return 0;
  }

    //output method
    self.formatCss = function(){

        var temp = self.formatComment();
        temp = temp + self.formatSelectors();
        temp = temp + self.formatProperties();
        
        return temp;
    }

    //format selectors: add line breaks, commas and etc
    self.formatSelectors = function(){
        var temp = "";

        for(i=0; i < self.selectors.length; i++) {
            temp = temp + self.selectors[i];
             if( i+1 == self.selectors.length){
                temp = temp + " {\n";
             }else {
                temp = temp + ",\n";
             }
        }

        return temp;

    }

    //format properties: add line breaks, colun and etc
    self.formatProperties = function() {
        var temp = "";

        for(i=0; i < self.properties.length; i++) {
            temp = temp + "\t" + self.properties[i].key + ": " + self.properties[i].value + ";\n";
            if(i+1 == self.properties.length) {
                temp = temp + "}";
            }
        }

        return temp;

    }

    //format comments: add line breaks, * and etc
    self.formatComment = function(){
        if(self.comments !== null){

            var temp = "/*\n";

            for(i=0; i < self.comments.length; i++) {
                temp = temp + " * " + self.comments[i] + "\n";
                
                if(i+1 == self.comments.length) {
                    temp = temp + " */\n";
                }
            }


            return temp;
        }

        return "";
    }

  self.cleanDirtyElement(dirtyElement);

}



var parse = function(){

  var self = this;


  self.InputObject = Parse.Object.extend("UserCssDB");


    //save css to recent list
    self.saveRecent = function(originalCss){
        var inputInstance = new self.InputObject();

        inputInstance.save({
            inputCSS: originalCss,
            user_id: user_id
        }, { 
            success: self.createRecentHTML,
            error: function(model, error) {
                console.log("Something's wrong");
            }
        });
    }

    //Add link to side menu
    self.createRecentHTML = function(object){
      //create list
      var recentHTML = document.createElement('li');
      var timestamp = document.createElement('strong');
      timestamp.setAttribute('class', 'saved-css');
      timestamp.innerHTML = self.formatDate(object.createdAt);
      var viewBtn = document.createElement('a');
      viewBtn.setAttribute('class', 'recent-btn');
      viewBtn.setAttribute('href', '#');
      viewBtn.setAttribute('data-id',object.id);
      viewBtn.innerHTML = "view";
      viewBtn.addEventListener('click', self.loadRecent); 


      var dltBtn = document.createElement('a');
      dltBtn.setAttribute('class', 'recent-btn delete');
      dltBtn.setAttribute('href','#');
      dltBtn.setAttribute('data-id',object.id);
      dltBtn.innerHTML = "view";
      dltBtn.addEventListener('click', self.deleteRecent); 
      recentHTML.appendChild(timestamp);
      recentHTML.appendChild(viewBtn);
      recentHTML.appendChild(dltBtn);
      document.getElementById("recent-css").appendChild(recentHTML);


    }

    //load list of recent css
    self.loadRecents = function(){
        var query = new Parse.Query(self.InputObject);
        query.equalTo("user_id", user_id);

        query.find({
            success: function(results) {
                for (var i = 0; i < results.length; i++) { 
                  var object = results[i];
                  self.createRecentHTML(object);
                }
            },
            error: function(error) {
                console.log("Something's wrong");
            }
        });
    }

    //load recent css
    self.loadRecent = function(e){
        event.preventDefault();
        var item_id = e.target.dataset.id;
        var query = new Parse.Query(self.InputObject);
        
        query.equalTo("objectId", item_id);

        query.first({
            success: function(object) {
                originalCss = object.get('inputCSS');
                inputText.value = originalCss;
                tool.do(originalCss, false);

            },
            error: function(error) {
                console.log("Something's wrong");
            }
        });
    }

    //delete css from recent
    self.deleteRecent = function(e){
        event.preventDefault();
        var item_id = e.target.dataset.id;
        var query = new Parse.Query(self.InputObject);
        
        query.equalTo("objectId", item_id);

        query.first({
            success: function(object) {
                object.destroy();
                var li = e.target.parentNode;
                e.target.parentNode.parentNode.removeChild(li);
            },
            error: function(error) {
                console.log("Something's wrong");
            }
        });
    }


    //format date
    self.formatDate = function(date){

        var createdAt = new Date(date);
        var day = createdAt.getDate();
        var month = createdAt.getMonth();
        var hr = createdAt.getHours();
        var min = createdAt.getMinutes();

        if(min < 10){
            min = "0" + min;
        }

        return 'Saved on '+  day + ' ' +m_names[month]+' at ' + hr + ':' + min;
    }

    self.loadRecents();

}


//create css tool instance 
var tool = new cssTool();

//create parse instance
var parse = new parse();










