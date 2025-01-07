import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";
import {Chart} from "chart.js";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]|null> = of(null);
  public medals!: { country: string; medalsCount: number }[];

  public chart!: Chart;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.medals = this.olympicService.getMedalsPerCountry();

    let countries = this.medals.map(({country}) => country);
    let medalsCount = this.medals.map(({medalsCount}) => medalsCount);

    let data: any = {
      labels: ['France', 'Espagne', 'Allemagne'], // FIXME: use real data
      datasets: [{
        label: 'Medals per country',
        data: [456, 865, 168], // FIXME: use real data
        hoverOffset: 4
      }]
    };

    let config: any = {
      type: 'pie',
      data: data,
    };

    this.chart = new Chart('MyChart', config);
  }
}
