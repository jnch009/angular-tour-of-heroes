import { Hero } from "../hero";
import { HEROES } from "../mock-heroes";
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { getDateTime } from "../utility";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    constructor(private http: HttpClient, private messageService: MessageService) { }
    private heroesUrl = 'api/heroes';  // URL to web api
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

    getHeroes(): Observable<Hero[]> {
        const heroes = this.http.get<Hero[]>(this.heroesUrl);
        this.log(`fetched heroes ${getDateTime()}`);
        return heroes;
    }

    getHero(id: number): Observable<Hero> {
        const hero = HEROES.find(hero => hero.id === id)!;
        this.log(`fetched hero ${hero.name} ${getDateTime()}`);
        return of(hero);
    }
}
