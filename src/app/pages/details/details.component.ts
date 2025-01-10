import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {Olympic} from "../../core/models/Olympic";
import {AsyncPipe} from "@angular/common";
import {Participation} from "../../core/models/Participation";
import {Chart, ChartConfiguration} from "chart.js";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
    public olympic!: BehaviorSubject<Olympic>;
    public numberOfMedals = new BehaviorSubject<number>(0);
    public numberOfAthletes = new BehaviorSubject<number>(0);
    public chart!: Chart;

    private olympicsByCountry$!: Subscription;
    private config!: ChartConfiguration;

    constructor(
        private route: ActivatedRoute,
        private olympicService: OlympicService,
    ) {}

    ngOnInit() {
      this.loadDetails();
    }

    ngOnDestroy() {
        this.olympicsByCountry$!.unsubscribe();
    }

    private loadDetails() {
        this.initChart();
        const olympicCountry = this.route.snapshot.params['country'];

        this.olympicsByCountry$ = this.olympicService.getOlympicsByCountry(olympicCountry).subscribe(
            olympics => {
              if (olympics) {
                this.olympic = new BehaviorSubject(olympics[0]);
              }

              olympics?.forEach((olympic: Olympic) => {
                  let numberOfMedals = 0;
                  let numberOfAthletes = 0;

                  olympic.participations.forEach((participation: Participation) => {
                      numberOfMedals += participation.medalsCount;
                      numberOfAthletes += participation.athleteCount;

                      this.config.data.labels?.push(participation.year);
                      this.config.data.datasets[0].data.push(participation.medalsCount);

                      this.chart.update();
                  });

                  this.numberOfMedals.next(numberOfMedals);
                  this.numberOfAthletes.next(numberOfAthletes);
              });
            }
        );
    }

    private initChart() {
        this.config = {
            type: 'line',
            data: {
                labels: [], // years
                datasets: [{
                    label: 'Medals per participation',
                    data: [], // nb of medals
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