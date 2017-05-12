import { Injectable } from '@angular/core';


@Injectable()
export class PersonsService {
  data: any;

  constructor() {
    this.data = null;
  }

  load() {
    if(this.data){
      return Promise.resolve(this.data);
    }
    
    return new Promise(resolve => {
      let dataRequest = new WLResourceRequest('adapters/listAdapter/getPersons', WLResourceRequest.GET);
      dataRequest.send().then((response) => {
        resolve(response.responseJSON.results);
      });
    })

  }

}
