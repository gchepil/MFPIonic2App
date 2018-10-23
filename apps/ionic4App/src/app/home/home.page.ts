import { Component, ChangeDetectorRef } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private loading: any;
  myvar: string = 'Text from class';
  items: any = [{
    'name': {
      'first': 'igor',
      'last': 'lastname',
    }, 
    'picture': {
      'thumbnail': 'https://randomuser.me/api/portraits/thumb/men/21.jpg'
    },
    'email': 'ken.ray@example.com'
  }];

  constructor(private ref: ChangeDetectorRef, public loadingController: LoadingController) {
    this.myvar = 'Text changed in constructor HomePage and added to template as {{myvar}}. And new string of text';
  }

  private async presentLoading(): Promise<any> {
    this.loading = await this.loadingController.create();
    return await this.loading.present();
  }

  private dismissLoading() {
    this.loading.dismiss();
  }

  getBalance() {
    this.presentLoading();
    var resourceRequest = new WLResourceRequest("/adapters/personsRestAdapter/getPersons", WLResourceRequest.GET);
        resourceRequest.send().then(
          (response) => {
            this.dismissLoading();
            this.items = response.responseJSON.results.slice(0, 10);
            this.ref.detectChanges();
          },
          (error) => {
            this.dismissLoading();
          }
        );
  }
}
