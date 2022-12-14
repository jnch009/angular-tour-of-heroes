import { Hero } from "../hero";
import { HEROES } from "../mock-heroes";
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { getDateTime } from "../utility";

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    constructor(private messageService: MessageService) { }

    getHeroes(): Observable<Hero[]> {
        const heroes = of(HEROES);
        this.messageService.add(`HeroService: fetched heroes ${getDateTime()}`);
        return heroes;
    }

    getHero(id: number): Observable<Hero> {
        const hero = HEROES.find(hero => hero.id === id)!;
        this.messageService.add(`HeroService: fetched hero ${hero.name} ${getDateTime()}`);
        return of(hero);
    }
}
