import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
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

    getOlympicsByCountry(country: string): Observable<Olympic[]|undefined> {
        return this.getOlympics().pipe(
            map(olympics => olympics?.filter(olympic => olympic.country === country)),
        );
    }
}
