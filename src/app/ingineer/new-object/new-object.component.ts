import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-object',
  templateUrl: './new-object.component.html',
  styleUrls: ['./new-object.component.css']
})
export class NewObjectComponent implements OnInit {
  daysToComplete = 0;
  daysToPay = 0;

  constructor() { }

  ngOnInit() {
  }

}
