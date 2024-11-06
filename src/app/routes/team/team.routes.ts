import { Routes } from '@angular/router';

import { TeamListComponent } from './list/list.component';
import { TeamCreateComponent } from './create/create.component';
import { TeamOverviewComponent } from './overview/overview.component';

export const routes: Routes = [
  { path: 'list', component: TeamListComponent },
  { path: 'create', component: TeamCreateComponent },
  { path: 'overview', component: TeamOverviewComponent },
];
