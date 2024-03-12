import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryModule, GalleryConfig, ThumbnailsPosition, GalleryItem, ImageItem } from 'ng-gallery';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  template:`
      <gallery *ngIf="galleryConfig$ | async; let config"
              [items]="images$ | async"
              [thumbWidth]="config.thumbWidth"
              [thumbHeight]="config.thumbHeight"
              [thumbPosition]="config.thumbPosition" />
    `,
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            HomeComponent,
            GalleryModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'alpha';
  galleryConfig$: Observable<GalleryConfig>;
  constructor(breakpointObserver: BreakpointObserver) {
    this.galleryConfig$ = breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).pipe(
      map(res => {
        if (res.matches) {
          return {
            thumbPosition: ThumbnailsPosition.Top,
            thumbWidth: 0,
            thumbHeight: 0
          };
        }
        return {
          thumbPosition: ThumbnailsPosition.Left,
          thumbWidth: 0,
          thumbHeight: 0
        };
      })
    );
  }
  images: GalleryItem[];
  ngOnInit() {
    this.images = [
      new ImageItem({
        src: './assets/h.jpg',
        thumb: './assets/h.gif'}),
      new ImageItem({
        src: './assets/h1.png'}),
      new ImageItem({
        src: './assets/h2.jpg'}),
      new ImageItem({
        src: './assets/h3.jpg'})
      ];
  }
}