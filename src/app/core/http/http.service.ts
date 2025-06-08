import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  
public get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(url,{params});
  }
}
