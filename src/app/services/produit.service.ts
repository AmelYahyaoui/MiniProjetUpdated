import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';

const baseUrl = 'http://localhost:8080/api/v1/Produit';
@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${baseUrl}/listerProduits`);
  }

  get(id: any): Observable<Produit> {
    return this.http.get<Produit>(`${baseUrl}/recherherProduit/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/saveOrUpdate`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/supprimer/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${baseUrl}/deleteAll`);
  }

  findByTitle(nom: any): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${baseUrl}/produit/?nom=${nom}`);
  }
}
