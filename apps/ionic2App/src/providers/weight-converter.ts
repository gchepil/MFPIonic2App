import { Injectable } from '@angular/core';


@Injectable()
export class WeightConverter {
  data: any;

  constructor() {
    this.data = null;
  }

  convertfromGramToKilogram(value: number, from: string, to: string) {
    console.log('['+value, from, to +']');
    return new Promise(resolve => {
      let dataRequest = new WLResourceRequest('adapters/soapTest/convertfromGramToKilogram', WLResourceRequest.GET);
      dataRequest.setQueryParameters({'params': [ value, from, to ]});
      dataRequest.send().then((response) => {
        console.dir(response)
        resolve(response.responseJSON.ChangeMetricWeightUnitResponse);
      });
    })

  }

}
