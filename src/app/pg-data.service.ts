import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PgDataService {

  constructor(private httpClient: HttpClient) { }

  getRecipes(): Promise<any> {
    return this.httpClient.get('http://cdn.projectgorgon.com/v327/data/recipes.json').toPromise();
  }
} 
