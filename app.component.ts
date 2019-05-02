import {Component,ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource,PageEvent} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

export interface PeriodicElement {
  ifsc: string;
  bank_id: number;
  branch: number;
  address: string;
  city: string;
  district: string;
  state: string;
  bank_name:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  
  public responseCache = new Map();
  pageEvent: PageEvent;
  title = 'Bank Search Application';
  results = '';
  data: any;
  dataSource: any;
  displayedColumns: string[] = ['ifsc','bank_id','branch','address','city','district','state','bank_name'];
  api_url='https://vast-shore-74260.herokuapp.com/banks?city=';
  //bankSelected:string = 'KOLKATA';
  bankList=[{name:'MUMBAI'},{name:'BANGALORE'},{name:'KOLKATA'},{name:'PUNE'},{name:'DELHI'}];
  //bankList=['MUMBAI','BANGALORE'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private http: HttpClient){
  }
  changedValue(bankSelected:any){
      console.log(bankSelected);
      this.getDataFromURL(bankSelected);
  }
  
  getDataFromURL(city_name: string) {
    const bankData=this.responseCache.get(this.api_url+city_name);
    if ( bankData ) {
      //If the data is available in cache
      this.data = bankData;
    this.dataSource = new MatTableDataSource(this.data);
  this.dataSource.paginator=this.paginator;
    }
    else
    {
      //If the data is not available in cache
      this.http.get(this.api_url+city_name).subscribe(result => {
        this.data = result;
        this.responseCache.set(this.api_url + city_name, this.data);
      this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator=this.paginator;
      });
    }
  }
  
  ngOnInit(): void {
    this.getDataFromURL(this.bankList[0].name);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cities = [
    {id: 1, name: 'MUMBAI'},
    {id: 2, name: 'KOLKATA'},
    {id: 3, name: 'CHENNAI', disabled: true},
    {id: 4, name: 'HYDERABAD'},
  ];
}