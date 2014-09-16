

$(document).ready(function() {
        


    var updateList = function() {
      //Remove all projects from the list so we can repopulate afterward
      $("#main-list").empty();

      // Get the list from storage
      chrome.storage.sync.get("projArray", function(result){
        // Create each project's row in the popup
        for(i in result.projArray){
          var row = document.createElement("tr");
          row.setAttribute("id", result.projArray[i].projId);
          row.setAttribute("class", "project");
          $("#main-list").append($(row));

          var col1 = document.createElement("td");
          row.appendChild(col1);
          
          var data = result.projArray[i].projName + " ";
          data += result.projArray[i].projId + "<br>";
          var urlList = result.projArray[i].urlList;
          for(urlObj in urlList) {
            var date = new Date(JSON.parse(urlList[urlObj].date));
            data += date.toLocaleString() + " ";
            data += "<a href='" + urlList[urlObj].url + "' target='_blank'>" + urlList[urlObj].url + "</a><br>";
          }
          col1.innerHTML = data;

          // var proj = document.createTextNode(data);

          // col1.appendChild(proj);
          
          // var col2 = document.createElement("td");
          // col2.setAttribute("class", "project-record");
          // row.appendChild(col2);
          
          // var buttonText = document.createTextNode("Record: ");
          // col2.appendChild(buttonText);

          // var radio = document.createElement("input");
          // radio.setAttribute("type", "radio");
          // radio.setAttribute("name", "currProjRadio");
          // radio.setAttribute("id", "radio"+result.projArray[i].projId);
          // radio.setAttribute("class", "record-radio");
          // radio.setAttribute("data-id", result.projArray[i].projId);
          // col2.appendChild(radio);
          
          var col3 = document.createElement("td");
          col3.setAttribute("class", "project-delete");
          row.appendChild(col3);

          // var deleteText = document.createTextNode("Delete: ");
          // col3.appendChild(deleteText);
          
          var deleteButton = document.createElement("input");
          deleteButton.setAttribute("type", "image");
          deleteButton.setAttribute("src", "trash.png");
          deleteButton.setAttribute("id", "delete"+result.projArray[i].projId);
          deleteButton.setAttribute("class", "trash-button");
          deleteButton.setAttribute("data-id", result.projArray[i].projId);

          col3.appendChild(deleteButton);

          
        }
      });
    };

    // Populate the main list with my projects and the urls
    updateList();

    // Trash button to delete project clicked
    $("#main-list").on("click", "input.trash-button", function() {
        //If current project was deleted, need to set currid to null
        var currid = parseInt($(this).attr("data-id"));

        var sure = confirm("Are you sure you want to delete this project log?");
        if(sure == true) {
          // Erase currid if the project I'm deleting is the current delete
          chrome.storage.sync.get("currid", function(result){
            if(currid == result.currid){
              chrome.storage.sync.set({"currid":null}, function(){
                console.log("currid set to null");
              });
            }
          });

          //Delete from projArray and update the view
          chrome.storage.sync.get("projArray", function(result){
            for(i in result.projArray){
              if(currid == result.projArray[i].projId){
                console.log("Match found to delete");
                var tempArray = result.projArray;
                tempArray.splice(i,1);
                chrome.storage.sync.set({"projArray":tempArray}, function(){
                  console.log("I've deleted a project");
                  updateList();
                  printAllStorage();
                });
                break;
              }
            }
          });
        }

        return false; // Prevent page refresh
    });

});

