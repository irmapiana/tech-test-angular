import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Employee } from '@app/_models/employee';
import { EmployeeService } from '@app/_services/employee.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id!: number;
  employee!: Employee;

  constructor(
    public employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.find(this.id).subscribe((data: Employee)=>{
      this.employee = data;
      console.log(data)
    });
  }

}
