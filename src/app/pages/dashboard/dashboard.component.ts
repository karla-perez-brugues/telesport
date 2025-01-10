import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {BehaviorSubject, Subscription} from "rxjs";
import {OlympicService} from "../../core/services/olympic.service";
import {Chart, ChartConfiguration} from "chart.js";
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  public chart!: Chart;
  public numberOfGames = new BehaviorSubject<number>(0);
  public numberOfCountries = new BehaviorSubject<number>(0);

  private config!: ChartConfiguration;
  private data$!: Subscription;

  constructor(
      private olympicService: OlympicService,
      private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy() {
    this.data$.unsubscribe();
  }

  onChartClick(event: any) {
    const res = this.chart.getElementsAtEventForMode(event, 'nearest', {intersect: true}, true);
    if (res.length > 0) {
      // @ts-ignore FIXME : remove this
      let countryName: string = this.chart.data.labels[res[0].index];
      this.router.navigateByUrl(`details/${countryName}`);
    }
  }

  private loadData(): void {
    this.initChart();

    this.data$ = this.olympicService.getOlympics().subscribe(
        olympics => {
          if (olympics) {
            let uniqueYears: number[] = [];

            this.numberOfCountries.next(olympics.length);

            olympics.forEach((olympic) => {
              let medalsCount: number = 0;

              olympic.participations.forEach((participation) => {
                medalsCount += participation.medalsCount;
                if (!uniqueYears.includes(participation.year)) {
                  uniqueYears.push(participation.year);
                }
              });

              this.config.data.labels?.push(olympic.country);
              this.config.data.datasets[0].data.push(medalsCount);

              this.chart.update();
            });

            this.numberOfGames.next(uniqueYears.length);
          }
        }
    );
  }

  private initChart() {
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
  }
}
