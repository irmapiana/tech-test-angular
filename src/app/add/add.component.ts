import { Component, OnInit, NgZone, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '@app/_models/employee';
import { EmployeeService } from '@app/_services/employee.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes'
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDatepickerInput, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { map, Observable, ReplaySubject, startWith, Subject, take, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';

interface Status{
  value: string;
}

interface Groups{
  value: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @Input() max: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  employeeForm!: FormGroup;

  events: string[] = [];
  status: Status[] = [
    {value: 'permanent'},
    {value: 'contract'}
  ];
  groups: Groups[] = [
    {value:'Marketing'},
    {value:'Enginering'},
    {value:'Support'},
    {value:'Senior Oficer'},
    {value:'Support Analyst'},
    {value:'Software Engineer'},
    {value:'Project Manager'},
    {value:'UI/UX'},
    {value:'Supervisor'},
    {value:'HR'}
  ];
  tomorrow= new Date();
  selectedGroup = this.groups;

  ngOnInit(): void {
    this.submitForm();

    this.tomorrow.setDate(this.tomorrow.getDate() - 1);

   // this.groupControl.setValue(this.groups)

    // this.groupFilterControl.valueChanges
    //   .pipe(takeUntil(this._onDestroy))
    //   .subscribe(() => {
    //     this.filterGroup()
    //   })
  }

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    public fb: FormBuilder,
    private ngZone: NgZone,
    ) { 
      
}

// ngAfterViewInit(){
//   this.setInitialValue();
// }

// setInitialValue() {
//   this.filteredGroup
//     .pipe(take(1), takeUntil(this._onDestroy))
//     .subscribe(() => {
//       // setting the compareWith property to a comparison function
//       // triggers initializing the selection according to the initial value of
//       // the form control (i.e. _initializeSelection())
//       // this needs to be done after the filteredBanks are loaded initially
//       // and after the mat-option elements are available
//       this.singleSelect.compareWith = (a: Groups, b: Groups) => a && b && a.value === b.value;
//     });
// }

  submitForm(){
    this.employeeForm = this.fb.group({
        username: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        birthDate: ['', [Validators.required]],
        basicSalary: ['', [Validators.required]],
        status: ['Permanent', [Validators.required]],
        group: ['', [Validators.required]],
        description: ['', [Validators.required]],
    })
  }

  add(event: MatChipInputEvent){
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()){
      
    }
  }

  formatDate(type: string, event: MatDatepickerInputEvent<Date>){
    this.events.push(`${type}: ${event.value}`);
  }

  // filterGroup(){
  //   if(!this.groups){
  //     return
  //   }

  //   let search = this.groupFilterControl.value;
  //   if(!search) {
  //     this.filteredGroup.next(this.groups.slice());
  //     return;
  //   } else {
  //     search = search.toLowerCase();
  //   }

  //   this.filteredGroup.next(
  //     this.groups.filter(group => group.value.toLowerCase().indexOf(search)>-1)
  //   )
  // }

  onKey(value: string): void{
    this.selectedGroup = this.search(value)
  }

  search(value:string){
   let filter = value.toLowerCase();
   return this.groups.filter(option => 
    option.value.toLowerCase().startsWith(filter)
   ) 
  }

  create(){
    if(this.employeeForm.valid){
      this.employeeService.create(this.employeeForm.value)
      .subscribe({
        next:(data) => {
          this.router.navigate(["/"])
          console.log(data)
        },
        error:(err) =>{
          console.log(err);
        }
      }) 
    }
   
  }

}
