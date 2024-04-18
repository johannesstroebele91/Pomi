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
  ],
  template: `
    <mat-card style="max-width: 300px; margin: 100px auto">
      <mat-card-content style="text-align: center;  margin: 20px auto">
        <div>
          <button mat-raised-button color="{{ activeTimer === 25 ? 'primary' : '' }}" (click)="setTimer(25)">Pomodoro
            (25min)
          </button>
          <button mat-raised-button color="{{ activeTimer === 5 ? 'primary' : '' }}" (click)="setTimer(5)">Small Break
            (5min)
          </button>
          <button mat-raised-button color="{{ activeTimer === 15 ? 'primary' : '' }}" (click)="setTimer(15)">Long Break
            (15min)
          </button>
        </div>
        <h2 style="font-size: 30px">{{ displayTime() }}</h2>
        <mat-progress-spinner
          style="margin-bottom: 20px"
          [diameter]="200"
          [color]="'primary'"
          [mode]="'determinate'"
          [value]="progress"></mat-progress-spinner>
      </mat-card-content>
      <mat-card-footer style="margin-bottom: 20px">
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
