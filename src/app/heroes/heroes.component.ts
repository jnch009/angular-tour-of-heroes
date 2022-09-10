import { Component, OnInit } from '@angular/core';
import { Hero } from "../hero";
import { HeroService } from "../hero.service";

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
    constructor(private heroService: HeroService) { }
    selectedHero?: Hero;
    heroes: Hero[] = [];

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroes = this.heroService.getHeroes();
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }
}
