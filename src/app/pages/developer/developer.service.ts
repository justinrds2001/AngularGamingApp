import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Developer } from './developer.model';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  private baseUrl: String = 'https://no-sql-application.herokuapp.com/api/';
  constructor(private httpClient: HttpClient) {}

  getDevelopers(): Observable<Developer[]> {
    console.log('getDevelopers called');
    const endpoint = 'developer';
    return this.httpClient.get<Developer[]>(`${this.baseUrl}${endpoint}`);
  }

  getDeveloperById(id: any): Observable<Developer> {
    console.log('getDeveloperById called');
    const endpoint = 'developer/' + id;
    return this.httpClient.get<Developer>(`${this.baseUrl}${endpoint}`);
  }

  addDeveloper(developer: Developer): Observable<Developer> {
    console.log('addDeveloper called');
    const endpoint = 'developer';
    return this.httpClient.post<Developer>(
      `${this.baseUrl}${endpoint}`,
      developer
    );
  }

  updateDeveloper(id: any, developer: Developer) {
    console.log('updateDeveloper called');
    const endpoint = 'developer/' + id;
    return this.httpClient.put<Developer>(
      `${this.baseUrl}${endpoint}`,
      developer
    );
  }

  removeDeveloper(id: any) {
    console.log('removeDeveloper called');
    const endpoint = 'developer/' + id;
    return this.httpClient.delete<Developer>(`${this.baseUrl}${endpoint}`);
  }
}
