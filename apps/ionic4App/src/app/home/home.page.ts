import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myvar: string = 'Text from class';

  constructor() {
    this.myvar = 'Text changed in constructor HomePage and added to template as {{myvar}}. And new string of text';
  }

  getBalance() {
    console.log(WL.App.getServerUrl);
    console.log(WL.App);
    // console.log(WL.Client.getEnvironment())
    // console.log(WL.App.aloha());
    // WL.App.getServerUrl(function(response) {
    //   console.log(123);
    // }, function(error) {
    //   console.log(3321);
    // });
    

    var resourceRequest = new WLResourceRequest("/adapters/personsRestAdapter/getPersons", WLResourceRequest.GET);
        resourceRequest.send().then(
          (response) => {
            console.log(response);
            alert("Success: " + response.responseText);
          },
          (error) => {
            console.log(error);
            alert("Failure: " + JSON.stringify(error));
          }
        );
  }
}
