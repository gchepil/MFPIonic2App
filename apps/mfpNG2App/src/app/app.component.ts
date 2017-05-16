/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2
} from '@angular/core';
import { AppState } from './app.service';
//import 'ibmmfpfanalytics';
//import 'ibmmfpf';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <nav>
      <a [routerLink]=" ['./'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Index
      </a>
      <a [routerLink]=" ['./home'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Home
      </a>
      <a [routerLink]=" ['./detail'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Detail
      </a>
      <a [routerLink]=" ['./barrel'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Barrel
      </a>
      <a [routerLink]=" ['./about'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        About
      </a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

    <footer>
      <h1>Some nice ADT footer</h1>
    </footer>
  `
})
export class AppComponent implements OnInit {

  constructor(
    public appState: AppState,
    public renderer: Renderer2
  ) {
    renderer.listen('document', 'wlInitFinished', () => {
      console.log('---> wlInitFinished event received');
      var resourceRequest = new WL.ResourceRequest(
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
    });

  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);

      const wlInitOptions = {
        'mfpContextRoot' : '/mfp' ,
        'applicationId' : 'greg.ng2'
      };

      WL.Client.init(wlInitOptions)

    }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
