import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SearchModel } from '../Models/searchModel';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  configUrl: string = 'app/mock/patients.json';
  constructor(
    private httpClient: HttpClient
  ) { }



  getPatients(): Observable<any> {
    return this.httpClient.get(environment.queryURI + '/Patient',
      { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json'
    });
    return headers;
  }

  getPatientsForSpecificBirthdateYear(dt1, dt2) {
    return this.httpClient.get(environment.queryURI + '/Patient?birthdate=gt' + dt1 + '&birthdate=lt' +dt2, 
      { headers: this.getHeaders() });
  }

  getFilteredPatients(obj: SearchModel): Observable<any> {
    return this.httpClient.get(environment.queryURI + '/Patient?'+ (obj.name ? obj.birthDate ? 
      'birthdate=eq'+ obj.birthDate + '&given='+ obj.name : 'given=' + obj.name : 'birthdate=eq' + obj.birthDate),
      { headers: this.getHeaders() }); 
  }
}


