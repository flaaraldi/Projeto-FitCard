import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../../message.service';

import {Estabelecimento} from './estabelecimento.model'
import { Status } from './status.model';
import { Categoria } from './categoria.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':  'application/json',
  'Authorization': 'my-auth-token' })
};

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {
  private estabelecimentosUrl = 'http://localhost:18059/api/Estabelecimentos';  // URL to web api
  private statusUrl = 'http://localhost:18059/api/status';  // URL to web api
  private categoriasUrl = 'http://localhost:18059/api/categorias';  // URL to web api
  selectEstabelecimento : Estabelecimento;
  estabelecimentoList : Estabelecimento[];

  constructor (private http: HttpClient,
    private messageService: MessageService) { }

  getEstabelecimentoList (): Observable<Estabelecimento[]> {
    return this.http.get<Estabelecimento[]>(this.estabelecimentosUrl)
      .pipe(
        tap(estabelecimentos => this.log('fetched estabelecimentos')),
        catchError(this.handleError('getEstabelecimentos', []))
      );
  }

  getStatusList (): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusUrl)
      .pipe(
        catchError(this.handleError('getStatus', []))
      );
  }
  getCategoriaList (): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriasUrl)
      .pipe(
        catchError(this.handleError('getCategorias', []))
      );
  }

  /** POST: add a new hero to the database */
  add (estabelecimento: Estabelecimento): Observable<Estabelecimento> {
    return this.http.post<Estabelecimento>(this.estabelecimentosUrl, estabelecimento, httpOptions)
      .pipe(
        tap((estabelecimento: Estabelecimento) => this.log(`added estabelecimento w/ id=${estabelecimento.seq}`)),
        catchError(this.handleError('add', estabelecimento))
      );
  }

  updateEstabelecimento (estabelecimento: Estabelecimento): Observable<any> {
    const id = typeof estabelecimento === 'number' ? estabelecimento : estabelecimento.seq;
    const url = `${this.estabelecimentosUrl}/${id}`;

    return this.http.put(url, estabelecimento, httpOptions)
      .pipe(
        tap(_ => this.log(`updated estabelecimento id=${estabelecimento.seq}`)),
        catchError(this.handleError('updateEstabelecimento', estabelecimento))
      );
  }

  deleteEstabelecimento (estabelecimento: Estabelecimento | number): Observable<Estabelecimento> {
    const id = typeof estabelecimento === 'number' ? estabelecimento : estabelecimento.seq;
    const url = `${this.estabelecimentosUrl}/${id}`;

    return this.http.delete<Estabelecimento>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted estabelecimento id=${id}`)),
      catchError(this.handleError<Estabelecimento>('deleteEstabelecimento'))
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
