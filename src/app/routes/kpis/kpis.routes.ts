import { Routes } from '@angular/router';

import { DesignIconsComponent } from './quality/quality.component';
import { DesignColorsComponent } from './security/security.component';

export const routes: Routes = [
  { path: 'security', component: DesignColorsComponent },
  { path: 'quality', component: DesignIconsComponent },
];
