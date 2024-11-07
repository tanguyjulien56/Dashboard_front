import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApexOptions } from 'apexcharts';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Injectable()
export class SecurityChartService {
  private http = inject(HttpClient);

  charts: ApexOptions[] = [
    {
      // chart area
      chart: {
        height: '600px',
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      series: [
        {
          name: 'UV',
          data: [31, 50, 28, 51, 4, 109, 100],
        },
        {
          name: 'Download',
          data: [11, 32, 45, 102, 34, 52, 41],
        },
      ],
      xaxis: {
        type: 'datetime',
        categories: [
          '2019-11-24T00:00:00',
          '2019-11-24T01:30:00',
          '2019-11-24T02:30:00',
          '2019-11-24T03:30:00',
          '2019-11-24T04:30:00',
          '2019-11-24T05:30:00',
          '2019-11-24T06:30:00',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
      },
    },
  ];

  getCharts() {
    return this.charts;
  }
}
