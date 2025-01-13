import { Injectable } from '@angular/core';
import {ChartConfiguration, ChartTypeRegistry} from "chart.js";

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public configChart(chartType: keyof ChartTypeRegistry, label: string): ChartConfiguration {
    return {
      type: chartType,
      data: {
        labels: [],
        datasets: [{
          label: label,
          data: [],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          colors: {
            forceOverride: true
          }
        }
      }
    };
  }
}
