import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/api-service.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SearchModel } from './Models/searchModel';
import { CommonUtilityService } from './services/commonUtility.service';
import { PatientName } from './models/patientName';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'fhir-app-test';

  constructor(
    private apiService: ApiService,
    private commonUtilityService: CommonUtilityService
  ) { }

  patients : any;
  requestTime : Date;
  outputTime : Date;
  name: string;
  model: NgbDateStruct;
  patientsName: PatientName;

  ngOnInit() {  
    this.requestTime = this.getTime();
    // Api Service call for Specific Birthdate Year 1960 & 1965
    const dates: string[] = this.commonUtilityService.getDateFromYear(1960, 1965);
    dates && this.apiService.getPatientsForSpecificBirthdateYear(dates[0], dates[1]).subscribe(data => {
      console.log('Specific BirthDate Response'+ data['entry']);
    });
    this.apiService.getPatients().subscribe(
      data => {
        console.log(data);
        this.patients = data;
      }
    )
    this.outputTime = this.getTime();
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
}
