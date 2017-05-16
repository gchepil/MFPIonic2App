import { Injectable } from '@angular/core';


@Injectable()
export class UserData {
  data: any;

  constructor() {
    this.data = null;
  }

  login( username: string, password: string) {
    return new Promise(resolve => {
      resolve();
    });

  }

}
