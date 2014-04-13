chrome.storage.sync.get("projArray", function(data){
  if(chrome.runtime.lastError){
    //No projArray in storage. Therefore, make new one.
    var projArray = new Array();
    chrome.storage.sync.set({"projArray":projArray});
    return;
  }



});



document.getElementById("add-project").addEventListener('click',addProject());


// function addProject(){ 
//   projArray = chrome.storage.sync.get("projArray");
//   var singleUrlList = new Array();
//   var randId = Math.floor((Math.random()*1000000));
//   //Check if id is same as later other ids. highly improbable, but possible  
//   projObj = {projName:"New Project", urlList:singleUrlList, id:randId}
//   projArray.push(projObj);
//   chrome.storage.sync.set({"projArray"}:projArray);

//   //Change html to reflect new project here or...
//   //add listener somewhere else which listens for a change in the chrome storage

// }

function addProject() {
  var form = document.createElement("form");
  form.innerHTML = 'name: <input type="text" name="name">';
  useDiv = document.getElementById("orig-item");
  useDiv.parentNode.insertBefore(form, useDiv);
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

