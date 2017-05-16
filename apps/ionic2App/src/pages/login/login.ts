import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController/*, NavParams*/ } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
 
import { HomePage } from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username, this.login.password).then(()=>{
        this.navCtrl.setRoot(HomePage);
      });
    }
  }
}