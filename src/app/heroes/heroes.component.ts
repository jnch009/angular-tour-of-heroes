import { Component, OnInit } from '@angular/core';
import { Hero } from "../hero";
import { HeroService } from "../services/hero.service";

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
    constructor(private heroService: HeroService) { }
    heroes: Hero[] = [];

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        // adding to the heroes array is not necessary in subscribe
        // in order to update the db
        // The reason why we do it is so that we can see the real time update
        this.heroService.addHero({ name } as Hero).subscribe()
    }
}
