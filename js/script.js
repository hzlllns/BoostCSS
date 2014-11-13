 var submitBtn = document.getElementById('submitBtn');
var output = document.getElementById('output');


//keep shorthands in array
 var shorthands = [
        'animation',
        'transition',
        'background',
        'border',
        'border-color',
        'border-style',
        'border-width',
        'border-top',
        'border-right',
        'border-bottom',
        'border-left',
        'border-image',
        'border-radius',
        'columns',
        'column-rule',
        'flex',
        'font',
        'font-variant',
        'list-style',
        'margin',
        'padding',
        'outline',
        'text-decoration'
    ];


function removeSpaces(){

  var userCSS = document.getElementById('input').value;
  

   userCSS = userCSS.replace(/\n/g, '');

   var list = userCSS.split('}');

   for(var i = 0; i < list.length; i++){
    if(list[i] != ""){
      list[i] = list[i].split('{');
      for(var p = 0; p < list[i].length; p++){
        list[i][p] = list[i][p].trim();
      }
      list[i][1] = list[i][1].split(';');
      for(var p = 0; p < list[i][1].length; p++){
        list[i][1][p] = list[i][1][p].trim();
        if(list[i][1][p] == ""){
          list[i][1].splice(p,1);
        }
      }
    } else{
      list.splice(i,1);
    }
   }
   console.log(list);

  }

  

  // onblur="this.value=removeSpaces(this.value);"

  //console.log(output);
  //output.value = userCSS;





 // submitBtn.addEventListener("click", removeSpaces);


//write checking function based on punctuation
// store 'px', 'em', 'rem', 'vh', 'vm' as one unit each
// remove all spaces except in shorthands
// check shorthand for double space and remove it
//






