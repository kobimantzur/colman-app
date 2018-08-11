import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  @Input() public lat: number;
  @Input() public lng: number;
  @Input() public title: String;

  constructor() {}

  ngOnInit() {
  }

}
