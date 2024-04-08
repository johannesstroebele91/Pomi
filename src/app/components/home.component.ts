import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle,} from '@angular/material/card';
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
  template: `
    <mat-card style="max-width: 300px; margin: 100px auto">
      <mat-card-content style="text-align: center;  margin: 20px auto">
        <h2 style="font-size: 30px">{{ formatTime(minutes) }}:{{ formatTime(seconds) }}</h2>
        <mat-progress-spinner
          style="margin-bottom: 20px"
          [diameter]="200"
          [color]="'primary'"
          [mode]="'determinate'"
          [value]="progress"></mat-progress-spinner>
        <button mat-raised-button color="primary" (click)="startTimer()">Start</button>
      </mat-card-content>
    </mat-card>
  `,
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
  ],
})
export class HomeComponent implements OnInit {
  minutes: number = 25;
  seconds: number = 0;
  progress: number = 100;

  ngOnInit() {
    this.updateTime();
  }

  startTimer() {
    const totalSeconds = this.minutes * 60 + this.seconds;
    let currentSeconds = totalSeconds;

    const interval = setInterval(() => {
      if (currentSeconds > 0) {
        currentSeconds--;
        this.progress = (currentSeconds / totalSeconds) * 100;
        this.minutes = Math.floor(currentSeconds / 60);
        this.seconds = currentSeconds % 60;
      } else {
        clearInterval(interval);
        // Logic for when the timer completes
      }
    }, 1000);
  }

  updateTime() {
    const totalSeconds = this.minutes * 60 + this.seconds;
    this.progress = (totalSeconds / (this.minutes * 60)) * 100;
  }

  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
}
