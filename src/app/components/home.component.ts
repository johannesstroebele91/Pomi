import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import {MatCalendar} from '@angular/material/datepicker';
import {MatToolbar} from '@angular/material/toolbar';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from "@angular/material/button";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCalendar,
    MatCardContent,
    MatToolbar,
    NgIf,
    RouterLink,
    NgForOf,
    MatProgressSpinner,
    MatButton,
    MatProgressBar,
    MatCardFooter,
    MatCardActions,
    MatChipListbox,
    MatChipOption,
  ],
  template: `
    <mat-card style="max-width: 550px; margin: 100px auto; padding: 30px">
      <mat-chip-listbox aria-label="Timer selection" style="margin: 0 auto">
        <mat-chip-option [selected]="activeTimer === 25" (click)="setTimer(25)">Pomodoro (25min)</mat-chip-option>
        <mat-chip-option [selected]="activeTimer === 5" (click)="setTimer(5)">Small Break (5min)</mat-chip-option>
        <mat-chip-option [selected]="activeTimer === 15" (click)="setTimer(15)">Long Break (15min)</mat-chip-option>
      </mat-chip-listbox>

      <mat-card-header style="margin: 0 auto;">
        <mat-card-title style="font-size: 30px;">{{ displayTime() }}
        </mat-card-title>
      </mat-card-header>
      <mat-card-content style="text-align: center;  margin: 20px auto">
        <mat-progress-spinner
          style="margin-bottom: 20px"
          [diameter]="200"
          [color]="'primary'"
          [mode]="'determinate'"
          [value]="progress"></mat-progress-spinner>
      </mat-card-content>
      <mat-card-footer>
        <mat-card-actions style=" display: flex; justify-content: space-evenly">
          <button *ngIf="!timerIsRunning" mat-raised-button color="primary" (click)="toggleTimer()">Start</button>
          <button *ngIf="timerIsRunning" mat-raised-button color="warn" (click)="toggleTimer()">Stop</button>
          <button mat-raised-button color="accent" (click)="resetTimer()">Reset</button>
        </mat-card-actions>
      </mat-card-footer>
    </mat-card>
  `
})
export class HomeComponent implements OnInit, OnDestroy {
  initialMinutes: number = 25;
  initialSeconds: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  progress: number = 100;
  timerIsRunning = false;
  activeTimer: number = 25;
  completedTimers: number[] = [];
  private interval: any;

  ngOnInit() {
    this.minutes = this.initialMinutes;
    this.seconds = this.initialSeconds;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  toggleTimer() {
    this.timerIsRunning ? this.stopTimer() : this.startTimer();
  }

  startTimer() {
    if (!this.timerIsRunning) {
      this.timerIsRunning = true;
      const totalSeconds = this.minutes * 60 + this.seconds;
      let currentSeconds = totalSeconds;

      this.interval = setInterval(() => {
        if (currentSeconds > 0 && this.timerIsRunning) {
          currentSeconds--;
          this.progress = (currentSeconds / totalSeconds) * 100;
          this.minutes = Math.floor(currentSeconds / 60);
          this.seconds = currentSeconds % 60;
        } else {
          this.stopTimer();
          this.completedTimers.push(this.minutes);
        }
      }, 1000);
    }
  }

  stopTimer() {
    if (this.timerIsRunning) {
      this.progress = 100;
      this.timerIsRunning = false;
      clearInterval(this.interval);
    }
  }

  resetTimer() {
    this.stopTimer();
    this.setTimer(this.initialMinutes);
  }

  setTimer(minutes: number) {
    if (this.activeTimer !== minutes) {
      this.activeTimer = minutes;
      this.initialMinutes = minutes;
      this.initialSeconds = 0;
      this.minutes = minutes;
      this.seconds = 0;
      this.resetTimer();
    }
  }

  displayTime(): string {
    return `${this.formatTime(this.minutes)}:${this.formatTime(this.seconds)}`;
  }

  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
}
