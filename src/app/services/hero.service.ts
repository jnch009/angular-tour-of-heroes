import { Hero } from "../hero";
import { HEROES } from "../mock-heroes";
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from "rxjs";
import { MessageService } from "./message.service";
import { getDateTime } from "../utility";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    constructor(private http: HttpClient, private messageService: MessageService) { }
    private heroesUrl = 'api/heroes';  // URL to web api
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * 
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            //TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            //TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            //Let the app keep running by returning empty
            return of(result as T);
        }
    }

    getHeroes(): Observable<Hero[]> {
        const heroes = this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
            tap(_ => this.log(`fetched heroes ${getDateTime()}`)),
            catchError(this.handleError<Hero[]>('getHeroes', []))
        );
        
        return heroes;
    }

    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<Hero>(url).pipe(
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }

    updateHero(hero: Hero): Observable<any> {
        return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
            tap(_ => this.log(`updated hero id=${hero.id}`)),
            catchError(this.handleError<Hero>(`updateHero`))
        )
    }

    addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
            tap((newHero: Hero) => this.log(`added hero with id=${newHero.id}`)),
            catchError(this.handleError<Hero>(`addHero`))
        )
    }

    deleteHero(id: number): Observable<any> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete<Hero>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted hero with id=${id}`)),
            catchError(this.handleError<Hero>(`deleteHero`))
        )
    }
}
