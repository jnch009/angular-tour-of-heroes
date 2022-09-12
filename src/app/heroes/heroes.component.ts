import { Component, OnInit } from '@angular/core';
import { Hero } from "../hero";
import { HeroService } from "../services/hero.service";
import { MessageService } from "../services/message.service";
import { getDateTime } from "../utility";

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
    constructor(private heroService: HeroService, private messageService: MessageService) { }
    selectedHero?: Hero;
    heroes: Hero[] = [];

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
        this.messageService.add(`HeroesComponent: Selected hero id=${hero.id} ${getDateTime()}`);
    }
}
