import { Routes } from '@angular/router';
import { QualityChartComponent } from './quality/quality.component';
import { SecurityChartComponent } from './security/security.component';

export const routes: Routes = [
  { path: 'security', component: SecurityChartComponent },
  { path: 'quality', component: QualityChartComponent },
];
