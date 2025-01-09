import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";
import {Chart, ChartConfiguration} from "chart.js";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$!: Observable<Olympic[]|null>;
  public chart!: Chart;

  private config!: ChartConfiguration;
  private medalsPerCountry$!: Subscription;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.initChart();
  }

  ngOnDestroy() {
    this.medalsPerCountry$.unsubscribe();
  }

  initChart() {
    this.config = {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          label: 'Medals per country',
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

    this.chart = new Chart('MyChart', this.config);
    this.updateChart();
  }

  private updateChart() {
    this.medalsPerCountry$ = this.olympicService.getOlympics().subscribe(
      olympics => {
        olympics?.forEach((olympic) => {
          let medalsCount: number = 0;

          olympic.participations.forEach((participation) => {
            medalsCount += participation.medalsCount;
          });

          this.config.data.labels?.push(olympic.country);
          this.config.data.datasets[0].data.push(medalsCount);

          this.chart.update();
        });
      }
    );
  }
}
