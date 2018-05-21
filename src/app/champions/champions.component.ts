import { Component, OnInit } from '@angular/core';

import { Champion } from '../shared/models/champion.model';
import { ErgastService } from '../shared/ergast.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})
export class ChampionsComponent implements OnInit {
  champions: Champion[];

  constructor(
    private ergastService: ErgastService
  ) { }

  ngOnInit() {
    this.getChampions();
  }

  getChampions(): void {
    this.ergastService.getChampions()
      .subscribe(champions => this.champions = champions);
  }
}
