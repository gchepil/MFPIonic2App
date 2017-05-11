<!---Licensed Materials - Property of IBM
5725-I43 (C) Copyright IBM Corp. 2016. All Rights Reserved.
US Government Users Restricted Rights - Use, duplication or
disclosure restricted by GSA ADP Schedule Contract with IBM Corp.-->

# IBM MobileFirst Platform Foundation Cordova Sample Application
Use this sample application to get started with development of Cordova applications.
The application uses the IBM MobileFirst SDK to connect to a local or remote server and obtain an access token.

**Getting Started**

1. Unzip the compressed cordova.zip file.
* Change directory into MFPStarterCordova.
* At this point no platforms are included.  To add a platform(s) to the MFPStarterCordova application run the 'cordova platform add' command:
  * cordova platform add <windows|android|ios>
* Run the 'mfpdev app register' command to register the sample application on the MobileFirst Server:
  * mfpdev app register
  * Follow any prompts to include server and client application details.
* To run the application on a real device run the 'cordova run' command:
  * cordova run <platform>  
* To run the application on a virtual device run the 'cordova emulate' command:
  * cordova emulate <platform>  

**License**

The software license can be found here: http://www.ibm.com/software/sla/sladb.nsf/sla/bla

**More information**

- IBM MobileFirst Platform Foundation section of IBM Knowledge Center:

 http://ibm.biz/knowctr#SSHS8R_8.0.0/wl_welcome.html

- Getting started with a MobileFirst sample application:

 http://ibm.biz/knowctr#SSHS8R_8.0.0/com.ibm.worklight.dev.doc/dev/t_download_samples.html

- "Quick Start" section in IBM MobileFirst Platform tutorials:

 https://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/all-tutorials/
