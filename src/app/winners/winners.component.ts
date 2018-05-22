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
  step = 0;
  cols = 1;
  mainColSpan = 1;
  rowSpan = 2;
  rowHeight = '1:1';

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
    if (windowWidth < 850) {
      this.cols = 4;
      this.mainColSpan = 3;
      this.rowSpan = 2;

      // if (windowWidth > 540) {
      //   this.rowHeight = '1:1';
      // } else if (windowWidth > 350) {
      //   this.rowHeight = '4:1';
      // } else if (windowWidth > 300) {
      //   this.rowHeight = '3:1';
      // } else {
      //   this.rowHeight = '2:1';
      // }
    } else {
      this.cols = 4;
      this.mainColSpan = 3;
      this.rowSpan = 1;
      this.rowHeight = '1:1';
    }
  }
}
