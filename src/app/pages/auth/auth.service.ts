import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: String = 'https://no-sql-application.herokuapp.com/api/';
  public currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  private readonly CURRENT_USER: string = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private router: Router) {
    // Check of we al een ingelogde user hebben
    // Zo ja, check dan op de backend of het token nog valid is.
    // Het token kan namelijk verlopen zijn. Indien verlopen
    // retourneren we meteen een nieuw token.
    this.getUserFromLocalStorage()
      .pipe(
        // switchMap is overbodig als we validateToken() niet gebruiken...
        switchMap((user: User) => {
          if (user) {
            console.log('User found in local storage');
            this.currentUser$.next(user);
            // return this.validateToken(user);
            return of(user);
          } else {
            console.log(`No current user found`);
            return of(undefined);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'));
  }

  login(username: string, password: string): Observable<User | undefined> {
    const endpoint = 'login/';
    return this.http
      .post<any>(
        `${this.baseUrl}${endpoint}`,
        { username: username, password: password },
        { headers: this.headers }
      )
      .pipe(
        map((response) => {
          const user: User = response.loggedInUser;
          user.token = response.token;
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          return of(undefined);
        })
      );
  }

  register(user: User): Observable<any> {
    console.log(user);
    const endpoint = 'register/';
    return this.http
      .post<any>(`${this.baseUrl}${endpoint}`, user, {
        headers: this.headers,
      })
      .pipe(
        map((response) => {
          console.log('response: ' + response);
          return response;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          return of(undefined);
        })
      );
  }

  validateToken(user: User): Observable<User | undefined> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      }),
    };
    const endpoint = 'profile/';
    return this.http.get<any>(`${this.baseUrl}${endpoint}`, httpOptions).pipe(
      map((response) => {
        console.log('token is valid');
        return response;
      }),
      catchError((error: any) => {
        console.log('Validate token Failed');
        this.logout();
        this.currentUser$.next(undefined);
        return of(undefined);
      })
    );
  }

  logout(): void {
    this.router
      .navigate(['/'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info');
          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next(undefined);
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('not logged out!'));
  }

  getUserFromLocalStorage(): Observable<User> {
    const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER)!);
    return of(localUser);
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  userMayEdit(itemUserId: any): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user?: User) => (user ? user._id === itemUserId : false))
    );
  }

  userMayEditSync(itemUserId: string): boolean {
    let bool: any;
    this.currentUser$.subscribe((user) => {
      if (user?._id === itemUserId) {
        bool = true;
        return bool;
      } else {
        bool = false;
        return bool;
      }
    });
    return bool;
  }
}
