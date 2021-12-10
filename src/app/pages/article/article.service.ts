import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from './article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private baseUrl: String = 'https://no-sql-application.herokuapp.com/api/';

  constructor(private httpClient: HttpClient) {}

  getArticles(): Observable<Article[]> {
    console.log('getArticles called');
    const endpoint = 'article';
    return this.httpClient.get<Article[]>(`${this.baseUrl}${endpoint}`);
  }

  getArticleById(id: any): Observable<Article> {
    console.log('getArticleById called');
    const endpoint = 'article/' + id;
    return this.httpClient.get<Article>(`${this.baseUrl}${endpoint}`);
  }

  addArticle(article: Article): Observable<Article> {
    console.log('addArticle called');
    const endpoint = 'article';
    return this.httpClient.post<Article>(`${this.baseUrl}${endpoint}`, article);
  }

  removeArticle(id: any) {
    console.log('removeArticle called');
    const endpoint = 'article/' + id;
    return this.httpClient.delete(`${this.baseUrl}${endpoint}`);
  }

  updateArticle(id: any, article: Article) {
    console.log('updateArticle called');
    const endpoint = 'article/' + id;
    return this.httpClient.put(`${this.baseUrl}${endpoint}`, article);
  }
}
