var Adapter = require("./adapter.js");
var dataReceiver = require("./src/controller/headsetReceiver/dataReceiver");
var starter = require('./src/controller/session/sessionStarter');
var Dummy = require("./Dummy.js");
var json;
var port;
var dummyBool;


//Add listener to all the elements of the page: form submit, file inserting, port selection.
document.addEventListener('DOMContentLoaded', function() {
  $('#form').submit(function() {
    startApplication();
    return false;
  });

  $('#JSONSession').on('change', function(session) {
    var reader = new FileReader();

    //Read file inserted
    reader.onload = function(event) {
      json = event.target.result;

      //Check if the file inserted is a valid JSON format
      try {
        json = JSON.parse(json);
      } catch (err) {
        var opt = {
          type: "basic",
          title: "ALERT",
          message: "This is not a well formed JSON file. Error" + err + " detected",
          iconUrl: "../../alert.jpg"
        }

        chrome.notifications.create("string notificationId", opt);
        json = undefined;
        return;
      }

    };
    reader.readAsText(session.target.files[0]);
  });

  $('#portListButton').on('click', function () {
    var list = document.getElementById('portListDropdown');
    chrome.serial.getDevices(function(portList) {
      console.log(portList);
      for (var entry = 0; entry < portList.length; entry++) {
        var path = String(portList[entry].path);
        var li = document.createElement("li");
        var link = document.createElement("a");
        var text = document.createTextNode(path);
        link.appendChild(text);
        link.href = "#";
        link.className = "portListEntry";
        li.appendChild(link);
        list.appendChild(li);
      }
      $('.portListEntry').on('click', function() {
        var path = $(this).text();
        console.log("clicked on " + path);
        $('#port').val(path);
      });
    });
  });



});



//Check input and start the application.
function startApplication() {
    
 // var db = mongoose.connect(DBURI);

  //chechk if JSON was inserted or loaded.
  if (json == undefined) {
    var opt = {
      type: "basic",
      title: "ALERT",
      message: "JSON is not inserted\wait for json to reload",
      iconUrl: "../../alert.jpg"
    }

    chrome.notifications.create("string notificationId", opt);
    return;
  }

  port = document.getElementById("port").value;
  dummyBool = document.getElementById("dummyBool").checked;

  //Check if port is inserted with dummy disabled.
  if (dummyBool == false) {
    if (port == '') {
      var opt = {
        type: "basic",
        title: "ALERT",
        message: "port is not defined for not dummy applcation!",
        iconUrl: "../../alert.jpg"
      }

      chrome.notifications.create("string notificationId", opt);
      return;
    }
  }

  //Hide the control panel in order to show the video if needed.
  $('#controlPanel').hide();
  chrome.app.window.create('./src/view/control-panel.html', {
    id: 'controlPanel',
    outerBounds: {
      'width': 1280,
      'height': 1024
    }
  });
  start();

}

//initialize applciation.
function start() {
    
  console.log("Launching application");

  if (dummyBool == true) {
    adapter = new Dummy();
  } else {
    var adapter = new Adapter(port);
  }
 
  adapter.once("packet", function(data) {
	starter.startNewSession(JSON.stringify(json));
  })
  dataReceiver.setAdapter(adapter);
  adapter.init();
}
