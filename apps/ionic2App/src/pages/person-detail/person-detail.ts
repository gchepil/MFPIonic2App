import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-person-detail',
  templateUrl: 'person-detail.html',
})
export class PersonDetail {

  person: any;

  constructor(public navParams: NavParams) {
    this.person = this.navParams.data.item;
  }

}
