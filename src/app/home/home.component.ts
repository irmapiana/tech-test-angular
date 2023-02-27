import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '@app/_models/employee';
import { EmployeeService } from '@app/_services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@app/modal/delete-dialog/delete-dialog.component';
import Swal from 'sweetalert2';
import { EmpFilter } from '@app/_models/empfilter';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, Observable, of, startWith, tap, withLatestFrom } from 'rxjs';
import { Location } from '@angular/common';

@Component({ 
    selector: 'home.component',
    styleUrls: ['home.component.scss'],
    templateUrl: 'home.component.html',
})

export class HomeComponent {

  employee: Employee[] = [];
  //filter!: Observable<Employee[]>;
  //filteredData: Observable<Employee[]> | undefined;
  //searchText!: string;

  //formGroup!: FormGroup;

  firstNameFilter = new FormControl<string | null>(null);
  statusFilter = new FormControl<string | null>(null)

  displayedColumns = ['id', 'username', 'firstName', 'lastName', 'email', 'birthDate', 'basicSalary', 'status', 'group', 'description', 'actions'];
  dataSource = new MatTableDataSource<Employee>();

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort, {static: false }) sort!:MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  constructor(
    private route: ActivatedRoute, private router: Router,
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private location: Location,
    private cdr: ChangeDetectorRef
    ) {
      this.getEmployee()
    }
  
  ngOnInit(): void {
    // this.empFilters.push({name:'status', options:this.status, defaultValue: this.defaultValue});

    this.getEmployee();

    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data:Employee, filter: string) => {

     const firstName = data.firstName.toLocaleLowerCase().includes(filter)
     const status = data.status.toLocaleLowerCase().includes(filter);
     
     return firstName || status;
    }

    // this.formGroup = this.formBuilder.group({filter: [""]});

    //   this.filter = this.getEmployee();

    //   this.filteredData = this.formGroup.get('filter')
    //     ?.valueChanges
    //     .pipe(
    //       startWith(''),
    //       withLatestFrom(this.filter),
    //       map(([val, params]) => !val ? params : params.filter(x => x.firstName.toLowerCase().includes(val)))
    //     )

    // this.dataSource.filterPredicate = (data, filter : string): boolean =>{
    //   let searchString = JSON.parse(filter);
    //   let isStatusAvailable = false;
    //   if (searchString.status.length){
    //     for(const d of searchString.status){
    //       if (data.status.trim() === d) {
    //         isStatusAvailable = true
    //       }
    //     }
    //   } else {
    //     isStatusAvailable = true;
    //   }

    //   const resultValue = isStatusAvailable;
    //   console.log(resultValue);

    //   return resultValue;

    // }
    // this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  addData(){
    this.router.navigate(['add']);
  }

  detailData(id:string){
    this.router.navigate(['detail'])
  }

  updateData(){
    Swal.fire('', 'Employee data has been updated!', 'success');
  }

  deleteData(){
    Swal.fire('Oops!', 'Employee data has been deleted!', 'error')
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }

  }

  applyFilterToRoute($event:PageEvent | null){
      const params = {
      firstName: this.firstNameFilter?.value?.trim() ?? '',
      status: this.statusFilter?.value?.trim() ?? '',
      sortBy: this.sort.active
    }

    const urlTree = this.router.createUrlTree(['', params], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge'
    });

    this.location.go(urlTree.toString())
  }

  getrow(row:any){
    console.log(row)
  }

  getEmployee(){
      this.employeeService.getAllEmployee()
      .subscribe((res)=>{
        this.dataSource.data = res;
      })
    
  }

}   