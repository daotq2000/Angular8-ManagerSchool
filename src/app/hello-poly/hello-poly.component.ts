import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello-poly',
  templateUrl: './hello-poly.component.html',
  styleUrls: ['./hello-poly.component.css']
})
export class HelloPolyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  helo: string = 'Hello Fpt PolyTechnic Hà Nội';
}
