import {
  Component,
  OnInit,
} from '@angular/core';
/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Adapter` component loaded asynchronously');

@Component({
  selector: 'adapter',
  template: `
    <h1>Hello from adapter</h1>
    <span>
      <a [routerLink]=" ['./child-adapter'] ">
        Child adapter
      </a>
    </span>
    <router-outlet></router-outlet>
  `,
})
export class AdapterComponent implements OnInit {

  public ngOnInit() {
    console.log('hello `adapter` component');
  }

}
