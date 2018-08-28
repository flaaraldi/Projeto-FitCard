import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../../message.service';

import { Categoria } from './categoria.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':  'application/json',
  'Authorization': 'my-auth-token' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categoriasUrl = 'http://localhost:18059/api/categorias';  // URL to web api
  selectCategoria : Categoria;
  categoriaList : Categoria[];

  constructor (private http: HttpClient,
    private messageService: MessageService) { }

  getList (): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriasUrl)
      .pipe(
        tap(categorias => this.log('fetched categorias')),
        catchError(this.handleError('getCategorias', []))
      );
  }

  /** POST: add a new hero to the database */
  add (categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.categoriasUrl, categoria, httpOptions)
      .pipe(
        tap((categoria: Categoria) => this.log(`added categoria w/ id=${categoria.seq}`)),
        catchError(this.handleError('add', categoria))
      );
  }

  update (categoria: Categoria): Observable<any> {
    const id = typeof categoria === 'number' ? categoria : categoria.seq;
    const url = `${this.categoriasUrl}/${id}`;

    return this.http.put(url, categoria, httpOptions)
      .pipe(
        tap(_ => this.log(`updated categoria id=${categoria.seq}`)),
        catchError(this.handleError('update', categoria))
      );
  }

  delete (categoria: Categoria | number): Observable<Categoria> {
    const id = typeof categoria === 'number' ? categoria : categoria.seq;
    const url = `${this.categoriasUrl}/${id}`;
    return this.http.delete<Categoria>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted categoria id=${id}`)),
      catchError(this.handleError<Categoria>('delete'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`EstabelecimentoService: ${message}`);
  }
}
