import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, mapTo } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) { }

  signIn(data) {
    return this._http.post<any>(this.URL + '/auth/login', { data })
  }

  login(username: string, password: string): Observable<boolean> {
    // Aquí puedes hacer la llamada al backend para validar las credenciales del usuario
    // y obtener un token de acceso
    return this._http.post<any>(this.URL + '/auth/login', { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
        }),
        mapTo(true)
      );
  }

  logout() {
    // Remueve el token de acceso del almacenamiento local y notifica que el usuario no está autenticado
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    // Devuelve un observable que notifica si el usuario está autenticado o no
    return this.loggedIn.asObservable();
  }

  getToken(): string {
    // Devuelve el token de acceso del almacenamiento local
    return localStorage.getItem('token');
  }

}
