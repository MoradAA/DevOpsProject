import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  logoSource: String = "assets/img/PowerToHeatLogo.png";
  constructor() { }

  ngOnInit() {
  }

}
