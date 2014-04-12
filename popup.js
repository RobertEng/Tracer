chrome.storage.sync.get("projArray", function(data){
  if(chrome.runtime.lastError){
    //No projArray in storage. Therefore, make new one.
    var projArray = new Array();
    chrome.storage.sync.set({"projArray"}:projArray);
    return;
  }



});


document.getElementById("add_Project").addEventListener('click',addProject());


function addProject(){
  projArray = chrome.storage.sync.get("projArray");
  var singleUrlList = new Array();
  var randId = Math.floor((Math.random()*1000000));
  //Check if id is same as later other ids. highly improbable, but possible  
  projObj = {projName:"New Project", urlList:singleUrlList, id:randId}
  projArray.push(projObj);
  chrome.storage.sync.set({"projArray"}:projArray);

  //Change html to reflect new project here or...
  //add listener somewhere else which listens for a change in the chrome storage

}

