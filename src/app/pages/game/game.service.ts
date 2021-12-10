import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl: String = 'https://no-sql-application.herokuapp.com/api/';

  constructor(private httpClient: HttpClient) {}

  getGames(): Observable<Game[]> {
    console.log('getGames called');
    const endpoint = 'game';
    return this.httpClient.get<Game[]>(`${this.baseUrl}${endpoint}`);
  }

  getGameById(id: any): Observable<Game> {
    console.log('getGameById called');
    const endpoint = 'game/' + id;
    return this.httpClient.get<Game>(`${this.baseUrl}${endpoint}`);
  }

  addGame(game: Game): Observable<Game> {
    console.log('addGame called');
    const endpoint = 'game';
    return this.httpClient.post<Game>(`${this.baseUrl}${endpoint}`, game);
  }

  removeGame(id: any): Observable<Game> {
    console.log('removeGame called');
    const endpoint = 'game/' + id;
    return this.httpClient.delete<Game>(`${this.baseUrl}${endpoint}`);
  }

  updateGame(id: any, game: Game): Observable<Game> {
    console.log('updateGame called');
    const endpoint = 'game/' + id;
    return this.httpClient.put<Game>(`${this.baseUrl}${endpoint}`, game);
  }
}
