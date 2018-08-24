import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employee-bar',
  templateUrl: './employee-bar.component.html',
  styleUrls: ['./employee-bar.component.css']
})
export class EmployeeBarComponent implements OnInit {

  @Input()
  public companyId: number;

  constructor() { }

  ngOnInit() {
  }

}
