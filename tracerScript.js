//alert("tracerScript.js called");


chrome.storage.sync.clear(function(){
	//alert("Now I deleted everything");


console.log("heyhehyehy I'm a fatty");
var currIdReady = false;
var projArrayReady = false;
chrome.storage.sync.get("currid", function(result){
	console.log("hehyehhehyhehy I like cheese");
	console.log("currid = "+result.currid);
	if(result.currid == null){
		console.log("Its lavendar not purple");
		chrome.storage.sync.set({"currid":-1}, function(){
			//Set currid to -1	
			console.log("Oodles of noodles");
			chrome.storage.sync.get("currid", function(yoyo){
				console.log("You");
				console.log(yoyo.currid);
			});
		});
	} else {
		//There's a currId already there, it worked
		currIdReady = true;
		if(projArrayReady){
			storeUrl();
		}
	}
});


chrome.storage.sync.get("projArray", function(result){
	
	console.log("New one here!");
	if(result.projArray == null){
		var singleProjArray = new Array();
		console.log("result.projArray is null hmm");
		chrome.storage.sync.set({"projArray":singleProjArray}, function(){
			console.log("yoyoyoyo my name is joe");
			chrome.storage.sync.get("projArray", function(yoyo){
				console.log("did i make it?");
				console.log(yoyo.projArray);
			});
		});
	} else {
		//There's a projArray already there, it worked
		projArrayReady = true;
		if(currIdReady){
			storeUrl();
		}
	}
});


//This one's to close the clear function
});



function storeUrl(){
	console.log("Now i'm in storeUrl()");
	chrome.storage.sync.get("currid", function(resultCurr){
		chrome.storage.sync.get("projArray", function(resultProj){
			console.log("I got both of em");
			console.log("currId = "+resultCurr.currid+" and projArray = "+resultProj.projArray);
			var d = new Date();
			var urlObj = {url:document.location.href, date:document.write(d)};
			console.log(urlObj);

			//Loop through to find the current project
			var currInd = -1;
			console.log("currInd = " + currInd);
			for(var i=0; i<resultProj.projArray.length; i++){
				console.log(i);
				if(resultProj.projArray[i].projid==resultCurr.currid){
					currInd = i;
					//Janky way to break out of loop. fix it later
					i = resultProj.projArray.length;
				}
			}
			//Check if I actually found one
			if(currInd <= -1){
				console.log("It failed QQ");
			}
			console.log("Here's currInd = "+currInd);

//Add URL later after i check code above
/*
			var temp = resultProj.projArray[currInd]
			projArray[currid].urlList.push(urlObj);
			
		chrome.storage.sync.set({"projArray":projArray},
			function(){
				alert("url saved");
		});
}
*/
	
		});
	});
}	
//save the url, date, and time to the current project

//alert("tracerScript.js finished");