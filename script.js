var fs = require('fs');
var fileList = "";
var voterResults = [];
var newResults = [];

//Get a list of the all the files in a directory
fs.readdir('./voter_results', function (err, files) {
      if (err) {
        console.log(err);
        return;
      }
      fileList = files;
      //console.log(files);
      loadResults();
});

function loadResults(){

    // console.log(fileList[0]);
    for (var i = 0, length = fileList.length; i < length; i++) {
        //This loop will read through all of the elements of an array
        var myfile = fs.readFileSync('./voter_results/' + fileList[i] + '');
        myfile = JSON.parse(myfile);
        voterResults.push(myfile);
    }
    addNewKey();
}

function addNewKey() {
//    console.log(voterResults);
      for (var i = 0, length = voterResults.length; i < length; i++) {
          
            if (voterResults[i].votedFor == 'Hickory') {
                  voterResults[i].party = 'democrat';  
            } else if (voterResults[i].votedFor == 'Donny T') {       
                  voterResults[i].party = 'republican';  
            }  else {   
                  voterResults[i].party = 'other';           
            }   
          
          voterResults[i].votedFor = 'Ross Perot';
      }
      saveFile();
}

function saveFile() {
  // console.log(voterResults);
  var data = JSON.stringify(voterResults);

  //Write data to a file
  fs.writeFile('output/output.json', data, function (err) {
      if (err) {
      console.log(err.message);
      return;
      }
      
      console.log('Saved the new voterResults profile.');
  });
}
