import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryModule, GalleryConfig, ThumbnailsPosition } from 'ng-gallery';
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
            thumbWidth: 80,
            thumbHeight: 80
          };
        }
        return {
          thumbPosition: ThumbnailsPosition.Left,
          thumbWidth: 120,
          thumbHeight: 90
        };
      })
    );
  }

  images: GalleryItem[];
  
  ngOnInit() {
    this.images = [
      new ImageItem({
        src: 'IMAGE_SRC_URL',
        thumb: 'IMAGE_THUMBNAIL_URL'
      })
  }


}
