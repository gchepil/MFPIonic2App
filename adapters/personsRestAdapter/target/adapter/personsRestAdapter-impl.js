function getPersons(tag) {
	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : '?results=30&nat=us'
	};

	MFP.Logger.info('test');
	return MFP.Server.invokeHttp(input);
}