import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from
  '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ServicealertService } from './servicealert.service';
import { ServicebdService } from './servicebd.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey = '510fb8c7f091475c8d3e6a4b18f7d521';
  private url = 'https://api-free.deepl.com/v2/translate';
  private apiKeyDeepl = '0fe6f438-3b46-44c7-b68f-7f33d44a2eee:fx';

  constructor(private http: HttpClient, private alert: ServicealertService) { }




  getProductosOld() {
    const apiKey = '510fb8c7f091475c8d3e6a4b18f7d521'; // Tu API key
    const url = ` https://api.spoonacular.com/recipes/complexSearch?number=20&apiKey=${apiKey}`;


    return this.http.get(url);
  }


  translateText(text: string, targetLang: string): Observable<any> {
    const url = `https://api-free.deepl.com/v2/translate`;
    const body = new URLSearchParams();
    body.set('auth_key', this.apiKeyDeepl);
    body.set('text', text);
    body.set('target_lang', targetLang);

    return this.http.post(url, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }


  getProductos(limit: number = 5) {
    const apiKey = '510fb8c7f091475c8d3e6a4b18f7d521';
    const url = `https://api.spoonacular.com/recipes/complexSearch?number=${limit}&apiKey=${apiKey}`;

    return this.http.get<any>(url);
  }

}
