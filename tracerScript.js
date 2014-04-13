alert("tracerScript.js called");

chrome.storage.sync.clear(function(){
	alert("Now I deleted everything");
});

var currIdReady = false;
var projArrayReady = false;
var currid = chrome.storage.sync.get("currid", function(){
	if(currid == null){
		chrome.storage.sync.set({"currid":-1}, function(){
			currIdReady = true;
			if(projArrayReady){
				storeUrl();
			}
		});
	} else {
		currIdReady = true;
		if(projArrayReady){
			storeUrl();
		}
	}
});

var projArray = chrome.storage.sync.get("projArray", function(){
	var singleProjArray = new Array();
	if(projArray == null){
		chrome.storage.sync.set({"projArray":singleProjArray}, function(){
			projArrayReady = true;
			if(currIdReady){
				storeUrl();
			}
		});
	} else {
		projArrayReady = true;
		if(currIdReady){
			storeUrl();
		}
	}
});


function storeUrl(){
	var currid = chrome.storage.sync.get("currid");
	var projArray = chromestorage.sync.get("projArray");
	alert("Flag 1");
	if(currid != -1){
		var d = new Date();
		var urlObj = {url:document.location.href, date:document.write(d)}
		projArray[currid].urlList.push(urlObj);
		
		chrome.storage.sync.set({"projArray":projArray},
			function(){
				alert("url saved");
		});
	} else {
		alert("You have no current project!");
	}
}
//save the url, date, and time to the current project

alert("tracerScript.js finished");