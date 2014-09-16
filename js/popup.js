//On install, clear everything in chrome storage
var currVersion = chrome.app.getDetails().version;
var prevVersion = localStorage['version'];
console.log(currVersion+"  "+prevVersion);
if(currVersion != prevVersion){
  if(typeof prevVersion == 'undefined'){
    onInstall();
  }
  localStorage['version'] = currVersion;
}

//Populate the popup with the projects
updateList();


// As the function indicates, this function is called on install
function onInstall(){
  chrome.storage.sync.clear(function(){
    console.log("All storage has been cleared");
  });
}


function printAllStorage(){
  chrome.storage.sync.get("projArray", function(result){
    //console.log("Tried to get projArray");
    for(var i=0; i<result.projArray.length; i++){
      console.log("projName = "+result.projArray[i].projName+" projId = "+result.projArray[i].projId);
      console.log("urlList = "+result.projArray[i].urlList);
    }
    console.log("size of projArray = "+result.projArray.length);
  });
}


function updateList(){
  //Remove all projects from the list so we can repopulate afterward
  var itemList = document.getElementById("main-list");
  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }

  // Get the list from storage
  chrome.storage.sync.get(["projArray","currid"], function(result){
    // Create each project's row in the popup
    for(var i=0; i<result.projArray.length; i++){
      var row = document.createElement("tr");
      row.setAttribute("id", result.projArray[i].projId);
      row.setAttribute("class", "project");
      row.setAttribute("data-checked", false)
      itemList.appendChild(row);

      var col1 = document.createElement("td");
      row.appendChild(col1);
      
      var proj = document.createTextNode(result.projArray[i].projName);
      col1.appendChild(proj);
      
      // var col2 = document.createElement("td");
      // col2.setAttribute("class", "project-record");
      // row.appendChild(col2);
      
      // var buttonText = document.createTextNode("Remember: ");
      // col2.appendChild(buttonText);

      // var radio = document.createElement("input");
      // radio.setAttribute("type", "radio");
      // radio.setAttribute("name", "currProjRadio");
      // radio.setAttribute("id", "radio"+result.projArray[i].projId);
      // radio.setAttribute("class", "record-radio");
      // radio.setAttribute("data-id", result.projArray[i].projId);
      // col2.appendChild(radio);
      
    }
    if(result.currid != null) { // Check the radio button of the current project
      $("#"+result.currid).attr("data-checked", true);
      $("#"+result.currid).attr("style", "background-color:#2ecc71;")

    }
  });
}


$(document).ready(function(){
  
  // Radio button to change curr project clicked
  // $("#main-list").on("click", "input.record-radio", function() {
  //   var newid = $(this).attr("data-id");
    
  //   chrome.storage.sync.get("currid", function(result) {
  //     if(result.currid == newid) {
  //       // console.log($(this).attr("checked"));
  //       // $(this).removeAttr("checked", false);
  //       // this.checked = true;
  //       console.log(this.getAttribute("checked"));
  //       console.log(this.checked);
  //       this.checked = false;
  //       this.removeAttribute("checked");
  //       console.log(this.checked);

  //       console.log("UNCHECK MEH");
  //       newid = null;
  //     }
  //     chrome.storage.sync.set({"currid":newid}, function(){
          
  //     });  

  //   });
    
  // });


  $("#main-list").on("click", "tr", function() {
    console.log("clickclick happened");
    var newid = $(this).attr("id");
    chrome.storage.sync.get("currid", function(result) {
      console.log("Get get "+newid+"compare to "+result.currid);
      // Remove old current id
      $("#"+result.currid).attr("data-checked", false);
      $("#"+result.currid).attr("style", "background-color: initial;");

      console.log("removed");
      if(result.currid == newid) { // Unchecking the currently selected project
        newid = null;
        console.log("Am i here?");
      } else { // New project to start remembering
        // Put in new id
        $("#"+newid).attr("data-checked", true);
        $("#"+newid).attr("style", "background-color: #2ecc71;");
      }

      chrome.storage.sync.set({"currid":newid}, function(){ });  
    });

  });


  //Called when Add Project button is clicked
  //Creates forms on screen to add a project
  $("#add-project").click(function(){
    $(this).toggle(); // Hides the button

    //Create add project forms
    var form = document.createElement("form");
    form.setAttribute("id", "formAddProject");
    
    $(form).submit(function() {
      if($("#projName").val().length == 0) { // THERES NOTHING THERE. jump out
        return false;
      }

      //Create a new array for the projects if nothing shows up
      chrome.storage.sync.get("projArray", function(result){
        //Making new project
        var projObj = new Object();
        projObj.projId = Math.floor((Math.random()*1000000));
        projObj.projName = $("#projName").val();
        projObj.urlList = [];
        
        var temp = [];
        if(result.projArray != null) {
          temp = result.projArray;
        }
        temp.push(projObj);
        chrome.storage.sync.set({"projArray":temp}, function(){
          updateList();
          // printAllStorage();
        });

        //Make the add project button visible again and remove the addproject forms
        $("#add-project").toggle(); // Show the button again
        $("#itemAdd").empty();
      });

      return false; // Prevent page refresh
    });

    // Create the new project input html
    var div = document.createElement("div");
    $(div).attr("class", "input-group");
    var spanText = document.createElement("span");
    $(spanText).attr("class", "input-group-addon");
    $(spanText).html("Name:");
    $(div).append($(spanText));
    var input = document.createElement("input");
    $(input).attr({"type":"text", "class":"form-control", "id":"projName", "placeholder":"Manhattan Project"});
    $(div).append($(input));
    var spanBtn = document.createElement("span");
    $(spanBtn).attr("class", "input-group-btn");
    var submitBtn = document.createElement("button");
    $(submitBtn).attr({"type":"submit", "class":"btn btn-default"});
    $(submitBtn).html("Submit!");
    $(spanBtn).append($(submitBtn));
    $(div).append($(spanBtn));

    // var text = document.createTextNode("Name: ");
    // form.appendChild(text);
    
    // var textForm = document.createElement("input");
    // textForm.setAttribute("type", "text");
    // textForm.setAttribute("id", "projName");
    // textForm.setAttribute("value", "Manhattan Project");
    // textForm.setAttribute("class", "form-control")
    // form.appendChild(textForm);

    // var submitButton = document.createElement("input");
    // submitButton.setAttribute("type", "submit");
    // submitButton.setAttribute("value", "Submit");
    // form.appendChild(submitButton);

    form.appendChild(div);

    document.getElementById("itemAdd").appendChild(form);
  });


});
