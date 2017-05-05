
function convertfromGramToKilogram(value, from, to ) {
	//let params = income || { 'value': 5000, 'from': 'gram', 'to': 'kilogram'}
	var request = '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">' + 
		'<soap12:Body>'+
			'<ChangeMetricWeightUnit xmlns="http://www.webserviceX.NET/">'+
			'<MetricWeightValue>' + parseInt(value, 10) + '</MetricWeightValue>'+
			'<fromMetricWeightUnit>' + from + '</fromMetricWeightUnit>'+ // microgram or milligram or centigram or decigram or gram or dekagram or hectogram or kilogram or metricton
			'<toMetricWeightUnit>' + to + '</toMetricWeightUnit>'+ // microgram or milligram or centigram or decigram or gram or dekagram or hectogram or kilogram or metricton
			'</ChangeMetricWeightUnit>'+
		'</soap12:Body>'+
		'</soap12:Envelope>';
	var input = {
		method : 'post',
		returnedContentType : 'xml',
		path : '/convertMetricWeight.asmx',
		body:{
		content: request.toString(),
		contentType: 'text/xml; application/json; charset=utf-8'
		}
	};
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}