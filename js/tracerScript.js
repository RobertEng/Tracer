console.log("tracerScript.js called");


// Implement user url matching here for later

// var matches = ["stackoverflow.com","docs.oracle.com","www.w3schools.com"];

// var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
// // document.location.href

// if(document.location.href.search(urlRegex) >= 0) {

// }

	chrome.storage.sync.get(["currid", "projArray"], function(result){
	    console.log(result.currid);
	    if(result.currid != null && result.projArray != null) {

	    	var d = new Date();
			var urlObj = {url:document.location.href, date:JSON.stringify(d)};
			console.log(urlObj);

			//Loop through to find the current project
			var currInd = -1;
			for(i in result.projArray){
				console.log(i);

				if(result.projArray[i].projId == result.currid){ // Found the project
					currInd = i;
					result.projArray[i].urlList.push(urlObj);
					chrome.storage.sync.set({"projArray":result.projArray}, function() {
						console.log("url added");
					});
					break;
				}
			}
			//Check if I actually found one
			if(currInd <= -1){
				console.log("Current project not found.");
			}
			console.log("Here's currInd = "+currInd);

	    }
	});