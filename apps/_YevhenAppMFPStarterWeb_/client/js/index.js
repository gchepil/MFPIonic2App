require.config({
	'paths': {
		'ibmmfpfanalytics': '../node_modules/ibm-mfp-web-sdk/lib/analytics/ibmmfpfanalytics',
		'ibmmfpf': '../node_modules/ibm-mfp-web-sdk/ibmmfpf'
	}
});

require(['ibmmfpfanalytics', 'ibmmfpf'], function(analytics, WL) {
    var wlInitOptions = {
        'mfpContextRoot'        : '/mfp' ,
        'applicationId'         : 'com.ibm.yevhenStarter'
    };

        WL.Client.init(wlInitOptions).always(function(){
             console.log('MobileFirstPlatform initialized');
             app.init();
         });


    var app = {
      //initialize app
      "init": function init() {
        var buttonElement = document.getElementById("ping_button");
        buttonElement.style.display = "block";
        buttonElement.addEventListener('click', app.testServerConnection, false);
      },
      //test server connection
      "testServerConnection": function testServerConnection() {

        var titleText = document.getElementById("main_title");
        var statusText = document.getElementById("main_status");
        var infoText = document.getElementById("main_info");
        titleText.innerHTML = "Hello MobileFirst";
        statusText.innerHTML = "Connecting to Server...";
        infoText.innerHTML = "";

//        WL.AuthorizationManager.login("myCustomScope", {username: 'y', password: 'y123'})
//            .then(function(mess) {                    
//                console.log("Suc", mess);
                titleText.innerHTML = "Yay!";
                statusText.innerHTML = "Connected to MobileFirst Server" ;              
                var resourceRequest = new WLResourceRequest("/adapters/javaAdapter/resource/greet", WLResourceRequest.GET);
                resourceRequest.setQueryParameter("name", "YEVHEN'S NAME");
                resourceRequest.send().then(
                    function (response) {       
                        console.log("Suc", response.responseText);                                              
                    }, function (response) {
                        console.log("Failure", JSON.stringify(response));                                              
                    }
                );
//            }, function(mess) {
//                console.log("Fail", mess);
//            });        
      },

    }


});
