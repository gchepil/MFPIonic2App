function getPersons(tag) {
	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : '?results=30&nat=us'
	};

	return MFP.Server.invokeHttp(input);
}