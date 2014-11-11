
var submit = document.getElementById('comb').addEventListener('click', function(e) {
  
  
  // Input:
  var data = 'input=' + document.getElementById('input').value;
  
  // Request:
  var req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if (req.readyState === 4) {
        document.getElementById('output').value = req.responseText;
    }
  };
  req.open('POST', '/online', true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.send(data);
});
