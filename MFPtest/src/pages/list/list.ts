import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PersonDetail } from '../person-detail/person-detail';
import { PersonsService } from '../../providers/persons-service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private persons: PersonsService ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

      this.loadPersons();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(PersonDetail, {
      item: item
    });
  }

  loadPersons() {
    this.persons.load().then((res) => {
      this.items = res;
    });
  }
}
