function getInfo(number) {
	if (!number) {
		number = 7;
	}
	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : '/users/' + number
	};

	return MFP.Server.invokeHttp(input);
}