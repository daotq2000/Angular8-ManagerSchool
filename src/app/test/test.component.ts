import { Component, OnInit } from '@angular/core';
import { Test } from "../test";
import { TestService } from "../test.service";
import {Router,ActivatedRoute} from "@angular/router"
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  test: Array<Test> = [];
  constructor( private testService:TestService) { }

  ngOnInit(): void {
    this.testService.getList().subscribe(data =>{
      console.log(data);
      this.test = data;
      
    });
  }

}
