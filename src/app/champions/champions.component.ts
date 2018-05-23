import { Component, OnInit } from '@angular/core';
// import { NgClass } from '@angular/common';

import { Champion } from '../shared/models/champion.model';
import { ErgastService } from '../shared/ergast.service';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss']
})
export class ChampionsComponent implements OnInit {
  champions: Champion[];
  step = -1;
  cols = 2;
  iconSpan = 1;
  mainColSpan = 1;
  mainRowSpan = 1;
  rowHeight = '3:1';
  dividerShow = false;

  constructor(
    private ergastService: ErgastService,
    private loaderService: LoaderService
  ) {
    this.loaderService.display(true);
  }

  ngOnInit() {
    this.getChampions();
    this.resizeGrid(window.screen.width);
  }

  /**
   * @description Return the champions to be shown
   */
  getChampions(): void {
    this.ergastService.getChampions()
      .subscribe(champions => {
        this.champions = champions;
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
    if (windowWidth < 600) {
      this.cols = 1;
      this.mainColSpan = 1;
      this.mainRowSpan = 2;
      this.rowHeight = '5.5:1';
      this.dividerShow = true;
      if (windowWidth < 340) {
        this.mainRowSpan = 7;
        this.rowHeight = '10:1';
      } else if (windowWidth < 450) {
        this.mainRowSpan = 6;
        this.rowHeight = '10:1';
      } else if (windowWidth < 520) {
        this.mainRowSpan = 3;
        this.rowHeight = '7:1';
      }
    } else {
      this.cols = 2;
      this.mainRowSpan = 1;
      this.rowHeight = '3:1';
      this.dividerShow = false;
      if (windowWidth < 1100) {
        this.rowHeight = '2:1';
      }
    }
  }
}
