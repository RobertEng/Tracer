//document.getElementById("add-project").addEventListener('click',addProject());
document.getElementById("add-project").onclick = addProject();

//On install, clear everything in chrome storage
console.log("Thus it begins");
var currVersion = chrome.app.getDetails().version;
var prevVersion = localStorage['version'];
console.log(currVersion+"  "+prevVersion);
if(currVersion != prevVersion){
  if(typeof prevVersion == 'undefined'){
    onInstall();
  }
  console.log("But was there a previous version");
  localStorage['version'] = currVersion;
}

function onInstall(){
  console.log("I'm in oninstall");
  chrome.storage.sync.clear(function(){
    console.log("All storage has been cleared");
  });
}

function addProject() {
  console.log("addProject() called");

//  chrome.storage.sync.clear(function(){


  //Create a new array for the projects if nothing shows up
  chrome.storage.sync.get("projArray", function(result){
    console.log("New one here!");
    if(result.projArray == null){
      console.log("result.projArray is null hmm");
      var singleProjArray = new Array();
      chrome.storage.sync.set({"projArray":singleProjArray}, function(){
        console.log("yoyoyoyo my name is joe");
        chrome.storage.sync.get("projArray", function(yoyo){
          console.log("did i make it?");
          console.log(yoyo.projArray);
          
          addProjectStep2();
        });
      });
    } else {
      addProjectStep2();
    }
  });

//Closing brackets for clear`
//  });


  var form = document.createElement("form");
  form.innerHTML = 'name: <input type="text" name="name">';
  useDiv = document.getElementById("orig-item");
  useDiv.parentNode.insertBefore(form, useDiv);
}


function addProjectStep2(){
  console.log("I'm in addProjectStep2");
  chrome.storage.sync.get("projArray", function(result){
    var projObj = new Object();
    projObj.projid = Math.floor((Math.random()*1000000));
    projObj.projName = "Project " + projObj.projid;
    projObj.urlList = new Array();
    console.log(result.projArray);
    var temp = result.projArray;
    temp.push(projObj);
    chrome.storage.sync.set({"projArray":temp}, function(){
      console.log("I've (supposedly) added a project");
      printAllStorage();
    });  
  });
}

function printAllStorage(){
  console.log("imma print everything");
  chrome.storage.sync.get("projArray", function(result){
    console.log("projArray = "+result.projArray);
    for(var i=0; i<result.projArray.length; i++){
      console.log("projName = "+result.projArray[i].projName);
      console.log("projid = "+result.projArray[i].projid);
      console.log("urlList = "+result.projArray[i].urlList);
    }
    console.log("size of projArray = "+result.projArray.length+"fin");
  });

}


    for (var i = 0; i < projArray.length; i++) {
      var item = document.createElement("tr");
      item.innerHTML = '<td>'+'<a href="">'+projArray[i]+'</a>'+'</td>' + '<td>record</td>';
      //var t = document.createTextNode('<td>'+projArray[i]+'</td>' + '<td>record</td>');
      //item.appendChild(t);
      useDiv = document.getElementById("orig-item");
      useDiv.parentNode.insertBefore(item,useDiv);
      
    }

    //var d = document.getElementByTagName('tbody');
    var deleting = document.getElementById('orig-item');
    d.removeChild(deleting);

