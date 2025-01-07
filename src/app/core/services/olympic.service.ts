import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Olympic} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]|null>([]);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getMedalsPerCountry(): [] {
      let medals: any = [];

      this.olympics$.subscribe((olympics) => {
          olympics?.forEach((olympic) => {
              let medalsCount = 0;
              let country = olympic.country;

              olympic.participations.forEach((participation) => {
                  medalsCount += participation.medalsCount;
              });

              medals.push({'country': country, 'medalsCount': medalsCount});
          });
      })

      return medals;
  }
}
