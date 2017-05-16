import { AdapterComponent } from './adapter.component';

export const routes = [
  { path: '', children: [
    { path: '', component: AdapterComponent },
    { path: 'child-adapter', loadChildren: './+child-adapter#ChildAdapterModule' }
  ]},
];
