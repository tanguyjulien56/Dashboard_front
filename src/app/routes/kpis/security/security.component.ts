import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { MtxProgressModule } from '@ng-matero/extensions/progress';
import { Subscription } from 'rxjs';

import { AppSettings, SettingsService } from '@core';
import { BreadcrumbComponent, PageHeaderComponent } from '@shared';
import { SecurityChartService } from './security.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SecurityChartService],
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatTabsModule,
    MtxProgressModule,
    BreadcrumbComponent,
    PageHeaderComponent,
  ],
})
export class SecurityChartComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly settings = inject(SettingsService);
  private readonly dashboardSrv = inject(SecurityChartService);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  charts = this.dashboardSrv.getCharts();
  chart1?: ApexCharts;

  notifySubscription = Subscription.EMPTY;

  ngOnInit() {
    this.notifySubscription = this.settings.notify.subscribe(opts => {
      console.log(opts);

      this.updateCharts(opts);
    });
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => this.initCharts());
  }

  ngOnDestroy() {
    this.chart1?.destroy();

    this.notifySubscription.unsubscribe();
  }

  initCharts() {
    setTimeout(() => {
      // Utiliser setTimeout pour s'assurer que l'élément est dans le DOM

      // Initialisation des graphiques, vérification de l'existence des éléments DOM
      this.initChart('#chart1', this.charts[0], chart => {
        this.chart1 = chart;
      });
    }, 0); // Assurez-vous que le setTimeout a bien une valeur
  }

  // Fonction générique pour initialiser un graphique
  initChart(selector: string, chartOptions: any, assignTo: (chart: ApexCharts) => void) {
    const chartElement = document.querySelector(selector) as HTMLElement;
    if (chartElement) {
      const chart = new ApexCharts(chartElement, chartOptions);
      chart.render().catch(error => console.error('Erreur lors du rendu du graphique : ', error));
      assignTo(chart);
    } else {
      console.error(`Élément ${selector} introuvable`);
    }
  }

  updateCharts(opts: Partial<AppSettings>) {
    this.chart1?.updateOptions({
      chart: {
        foreColor: opts.theme === 'dark' ? '#ccc' : '#333',
      },
      tooltip: {
        theme: opts.theme === 'dark' ? 'dark' : 'light',
      },
      grid: {
        borderColor: opts.theme === 'dark' ? '#5a5a5a' : '#e9e9e9',
      },
    });
  }
}
