//alert("tracerScript.js called");


chrome.storage.sync.clear(function(){
	//alert("Now I deleted everything");


console.log("heyhehyehy I'm a fatty");
var currIdReady = false;
var projArrayReady = false;
chrome.storage.sync.get("currid", function(result){
	console.log("hehyehhehyhehy I like cheese");
	console.log("currid = "+result.currid);
	if(currid[0] == null){
		console.log("Its lavendar not purple");
		chrome.storage.sync.set({"currid":-1}, function(){
		//chrome.storage.sync.set(currIdArray, function(){
		console.log("Oodles of noodles");
		console.log("ayy");
			currIdReady = true;
			alert("Hey");
			chrome.storage.sync.get("currid", function(result){
				alert(yoyo);
				alert("You");
			});
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
	var projArray = chrome.storage.sync.get("projArray");
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

//alert("tracerScript.js finished");