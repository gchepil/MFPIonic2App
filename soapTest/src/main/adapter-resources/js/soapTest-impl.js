
function convertfromGramToKilogram(value) {
	var request = '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">' + 
		'<soap12:Body>'+
			'<ChangeMetricWeightUnit xmlns="http://www.webserviceX.NET/">'+
			'<MetricWeightValue>' + value + '</MetricWeightValue>'+
			'<fromMetricWeightUnit>gram</fromMetricWeightUnit>'+ // microgram or milligram or centigram or decigram or gram or dekagram or hectogram or kilogram or metricton
			'<toMetricWeightUnit>kilogram</toMetricWeightUnit>'+ // microgram or milligram or centigram or decigram or gram or dekagram or hectogram or kilogram or metricton
			'</ChangeMetricWeightUnit>'+
		'</soap12:Body>'+
		'</soap12:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		path : '/convertMetricWeight.asmx',
		body:{
		content: request.toString(),
		contentType: 'application/soap+xml; charset=utf-8'
		}
	};
	return MFP.Server.invokeHttp(input);
}