import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Winner } from '../shared/models/winner.model';
import { ErgastService } from '../shared/ergast.service';
import { Champion } from '../shared/models/champion.model';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {
  champion: Champion;
  season: string;
  winners: Winner[];
  step = -1;
  cols = 2;
  mainColSpan = 1;
  mainRowSpan = 3;
  mapRowSpan = 3;
  rowHeight = '3:1';
  // dividerShow = false;

  constructor(
    private route: ActivatedRoute,
    private ergastService: ErgastService,
    private loaderService: LoaderService
  ) {
    this.loaderService.display(true);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(pmap => this.season = pmap.get('season'));
    this.getChampion(this.season);
    this.getWinners(this.season);
    this.resizeGrid(window.screen.width);
  }

  /**
   * @description Return the champion to be shown
   * @param season - The season for which we need to get the champion
   */
  getChampion(season: string): void {
    this.ergastService.getChampion(season)
      .subscribe(champion => {
        this.champion = champion;
        this.loaderService.display(false);
      });
  }

  /**
   * @description Return the winners to be shown
   * @param season - The season for which we need to get the winners
   */
  getWinners(season: string): void {
    this.ergastService.getWinners(season)
      .subscribe(winners => {
        this.winners = winners;
        this.loaderService.display(false);
      });
  }

  /**
   * @description Set step for accordion
   * @param index - The number of the step we want to go
   */
  setStep(index: number) {
    this.step = index;
  }

  /**
   * @description Go to next step
   */
  nextStep() {
    this.step++;
  }

  /**
   * @description Go to previous step
   */
  prevStep() {
    this.step--;
  }

  /**
   * @description When the window is resized, recalculate grid
   * @param event - window changed size
   */
  onResize(event) {
    this.resizeGrid(event.target.innerWidth);
  }

  /**
   * @description Recalculate Grid at several breakpoints
   * @param windowWidth - The size of the window width
   */
  resizeGrid(windowWidth: number): void {
    if (windowWidth < 950) {
      this.cols = 1;
      this.mainColSpan = 1;
      this.mainRowSpan = 4;
      this.mapRowSpan = 3;
      this.rowHeight = '5.5:1';
      if (windowWidth < 400) {
        this.mainRowSpan = 20;
        this.mapRowSpan = 20;
        this.rowHeight = '9:1';
      } else if (windowWidth < 500) {
        this.mainRowSpan = 20;
        this.mapRowSpan = 20;
        this.rowHeight = '12:1';
      } else if (windowWidth < 620) {
        this.mainRowSpan = 15;
        this.mapRowSpan = 15;
        this.rowHeight = '12:1';
      } else if (windowWidth < 700) {
        this.mainRowSpan = 10;
        this.mapRowSpan = 10;
        this.rowHeight = '10:1';
      } else if (windowWidth < 840) {
        this.mainRowSpan = 6;
        this.mapRowSpan = 6;
        this.rowHeight = '7:1';
      }
    } else {
      this.cols = 2;
      this.mainColSpan = 1;
      this.mainRowSpan = 3;
      this.mapRowSpan = 3;
      this.rowHeight = '3:1';
      if (windowWidth < 1200) {
        this.mainRowSpan = 5;
        this.mapRowSpan = 3;
        this.rowHeight = '4:1';
      }
    }
  }
}
