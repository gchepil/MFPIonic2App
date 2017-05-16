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
  selector: 'child-adapter',
  template: `
    <h1>Hello from Child Adapter</h1>    
  `,
})
export class ChildAdapterComponent implements OnInit {

  public ngOnInit() {
    console.log('hello `ChildAdapterComponent`');
     
  }

}
