import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/api-service.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SearchModel } from './Models/searchModel';
import { CommonUtilityService } from './services/commonUtility.service';
import { PatientName } from './models/patientName';
import { Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged} from "rxjs/internal/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'fhir-app-test';
  patients : any;
  requestTime : Date;
  outputTime : Date;
  name: string;
  nameChanged: Subject<string> = new Subject<string>();
  model: NgbDateStruct;
  patientsName: PatientName;
  birthDates: string[] = [
    '1960-1965', '1960-1970'
  ]

  constructor(
    private apiService: ApiService,
    private commonUtilityService: CommonUtilityService
  ) { 
    this.nameChanged.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(model => {
        this.name = model;
        this.searchResults();
      });
  }

  ngOnInit() {  
    this.requestTime = this.getTime();
    // Api Service call for Specific Birthdate Year 1960 & 1965
    
    this.apiService.getPatients().subscribe(
      data => {
        console.log(data);
        this.patients = data;
      }
    )
    this.outputTime = this.getTime();
  }

  getPatientForSpecificBirthDate(value: string) {
    const data: string[] = value.split('-');
    const dates: string[] = this.commonUtilityService.getDateFromYear(data[0], data[1]);
    dates && this.apiService.getPatientsForSpecificBirthdateYear(dates[0], dates[1]).subscribe(data => {
      console.log('Specific BirthDate Response'+ JSON.parse(JSON.stringify(data['entry'])));
      this.patients = data;
    });
  }
  sortData() {
    this.commonUtilityService.sortArray(this.patients.entry, 'birthDate');
  }

  getTime()
  {
    return new Date();
  }

  searchResults() {
    console.log(event)
    console.log(this.model);
    if(this.name || this.model) {
      const searchObj: SearchModel = {
        name: this.name,
        birthDate: this.model && this.commonUtilityService.convertDatePickerModelToString(this.model)
      }
      this.apiService.getFilteredPatients(searchObj).subscribe(data => {
        this.patients = data;
        console.log(this.patients)
      });
    }
  }

  onFieldChange(name:string){
    this.nameChanged.next(name);
  }
}
