import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  @Input() private lat: number;
  @Input() private lng: number;
  @Input() private title: String;

  constructor() {}

  ngOnInit() {
  }

}
