alert("tracerScript.js called");

//save the url, date, and time to the current project
var currid = chrome.storage.sync.get("currid");
var projArray = chromestorage.sync.get("projArray");

if(currid != -1){
	var d = new Date();
	var urlObj = {url:document.location.href, date:document.write(d)}
	projArray[currid].urlList.push(urlObj);
	
	chrome.storage.sync.set({"projArray":projArray},
		function(){
			console.log("url saved");
	});
}

alert("tracerScript.js finished");