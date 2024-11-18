import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiKeyDeepl = '0fe6f438-3b46-44c7-b68f-7f33d44a2eee:fx';

  constructor(private http: HttpClient) { }

  getProductosOld() {
    const apiKey = '510fb8c7f091475c8d3e6a4b18f7d521';
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
