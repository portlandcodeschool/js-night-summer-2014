/* In-class collaborative version */


	function makeCheckerboard(width,height) {
        var table = document.createElement('table');
        for (var row = 0; row < height; row++) {
            var tr  = document.createElement('tr');
             for (var col = 0; col < width; col++) {
                 var td = document.createElement('td');
                 td.setAttribute('id','x'+col+'y'+row);
                 var text = document.createTextNode('.');
                 td.appendChild(text);
                 tr.appendChild(td);
          console.log('help!');
             }
            table.appendChild(tr);
            
        }
        return table;
    } 
    
var table = makeCheckerboard(8,8);
document.body.appendChild(table);

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
