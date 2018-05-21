import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Winner } from '../shared/models/winner.model';
import { ErgastService } from '../shared/ergast.service';
import { Champion } from '../shared/models/champion.model';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit {
  champion: Champion;
  winners: Winner[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private ergastService: ErgastService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(pmap => this.getChampion(pmap.get('season')));
    this.route.paramMap.subscribe(pmap => this.getWinners(pmap.get('season')));
  }

  getChampion(season: string): void {
    this.ergastService.getChampion(season)
      .subscribe(champion => this.champion = champion);
  }

  getWinners(season: string): void {
    this.ergastService.getWinners(season)
      .subscribe(winners => this.winners = winners);
  }

  goBack(): void {
    this.location.back();
  }
}
