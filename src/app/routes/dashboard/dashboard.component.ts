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
import { BreadcrumbComponent } from '@shared';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService],
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
  ],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly settings = inject(SettingsService);
  private readonly dashboardSrv = inject(DashboardService);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.dashboardSrv.getData();

  messages = this.dashboardSrv.getMessages();

  charts = this.dashboardSrv.getCharts();
  chart1?: ApexCharts;
  chart2?: ApexCharts;
  chart3?: ApexCharts;
  chart4?: ApexCharts;

  stats = this.dashboardSrv.getStats();

  notifySubscription = Subscription.EMPTY;

  ngOnInit() {
    this.notifySubscription = this.settings.notify.subscribe(opts => {
      console.log(opts);

      this.updateCharts(opts);
    });
  }

  ngAfterViewInit() {
    this.initCharts();
  }

  ngOnDestroy() {
    this.chart1?.destroy();
    this.chart2?.destroy();
    this.chart3?.destroy();
    this.chart4?.destroy();

    this.notifySubscription.unsubscribe();
  }

  initCharts() {
    setTimeout(() => {
      // Utiliser setTimeout pour s'assurer que l'élément est dans le DOM

      // Initialisation des graphiques, vérification de l'existence des éléments DOM
      this.initChart('#chart1', this.charts[0], chart => (this.chart1 = chart));
      this.initChart('#chart2', this.charts[1], chart => (this.chart2 = chart));
      this.initChart('#chart3', this.charts[2], chart => (this.chart3 = chart));
      this.initChart('#chart4', this.charts[3], chart => (this.chart4 = chart));
    });
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

    this.chart2?.updateOptions({
      chart: {
        foreColor: opts.theme === 'dark' ? '#ccc' : '#333',
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: opts.theme === 'dark' ? '#5a5a5a' : '#e9e9e9',
            connectorColors: opts.theme === 'dark' ? '#5a5a5a' : '#e9e9e9',
            fill: {
              colors: opts.theme === 'dark' ? ['#2c2c2c', '#222'] : ['#f8f8f8', '#fff'],
            },
          },
        },
      },
      tooltip: {
        theme: opts.theme === 'dark' ? 'dark' : 'light',
      },
    });

    this.chart3?.updateOptions({
      chart: {
        foreColor: opts.theme === 'dark' ? '#ccc' : '#333',
      },
      tooltip: {
        theme: opts.theme === 'dark' ? 'dark' : 'light',
      },
    });
    this.chart4?.updateOptions({
      chart: {
        foreColor: opts.theme === 'dark' ? '#ccc' : '#333',
      },
      tooltip: {
        theme: opts.theme === 'dark' ? 'dark' : 'light',
      },
    });
  }
}
