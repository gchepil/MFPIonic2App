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
     let resourceRequest = new WL.ResourceRequest(
        "/adapters/javaAdapter/resource/protected/",
        WL.ResourceRequest.GET
      );
      resourceRequest.setQueryParameter("name", "worldINO");
      resourceRequest.send().then(
        function (response) {
          alert("Success: " + response.responseText);
        },
        function (response) {
          alert("Failure: " + JSON.stringify(response));
        }
      );
  }

}
