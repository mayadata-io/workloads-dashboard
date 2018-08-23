import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  @Input('heroText') heroContent: any;
  constructor() { }

  ngOnInit() {
    console.log(this.heroContent);
  }

}
