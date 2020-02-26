document.addEventListener('DOMContentLoaded', function() {

	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
	//
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}

 
    var saveActionButton = document.getElementById('saveActionId');
    saveActionButton.addEventListener('click', function() {
		myArray = [];
		chrome.tabs.query({"currentWindow": true},  //{"windowId": targetWindow.id, "index": tabPosition});
		function (array_of_Tabs) {  //Tab tab
			arrayLength = array_of_Tabs.length;
			//alert(arrayLength);
			for (var i = 0; i < arrayLength; i++) {
				myArray.push(array_of_Tabs[i].url);
			}
			obj = JSON.parse(JSON.stringify(myArray));
			//alert(JSON.stringify(obj));
			alert(window.location.toString())
			var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href",     dataStr     );
            dlAnchorElem.setAttribute("download", "infotabs.json");
            dlAnchorElem.click();
		});
    }, false);
  
  
    var loadActionButton = document.getElementById('loadActionId');
    loadActionButton.addEventListener('click', function() {
        document.getElementById('files').click();
    }, false);

	
	function handleFileSelect(evt) {
		var files = evt.target.files; // FileList object

		// files is a FileList of File objects. List some properties.
		for (var i = 0, f; f = files[i]; i++) {
			var start = 0;
			var stop = f.size - 1;
			reader = new FileReader();
			//alert(f.name);
			// If we use onloadend, we need to check the readyState.
			reader.onloadend = function(evt) {
				if (evt.target.readyState == FileReader.DONE) { // DONE == 2
					jsonObj = JSON.parse(evt.target.result);
					for (var i=0; i<jsonObj.length; i++) {
					     chrome.tabs.create({"url": jsonObj[i]}); //chrome.tabs.create({"url": 'http://www.google.com'});
					}
				}
			};
			var blob = f.slice(start, stop + 1);
			reader.readAsBinaryString(blob);
		}
    };
	document.getElementById('files').addEventListener('change', handleFileSelect, false);

}, false);


