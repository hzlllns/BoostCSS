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
  console.log(userCSS);

  for(i=0; i>shorthands.length; i++){
    if(userCSS !== shorthands[i]){

      userCSS = userCSS.split(' ').join('');
      userCSS = userCSS.replace(/\s/g, '');
      console.log(userCSS);

    }

  }

  

  // onblur="this.value=removeSpaces(this.value);"

  //console.log(output);
  //output.value = userCSS;



}

 // submitBtn.addEventListener("click", removeSpaces);


//write checking function based on punctuation
// store 'px', 'em', 'rem', 'vh', 'vm' as one unit each
// remove all spaces except in shorthands
// check shorthand for double space and remove it
//






