import { Component } from '@angular/core';
import {Papa} from 'papaparse';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  movies: any[] = [];

  constructor(private http: HttpClient) {}

  searchInCSV(file: File) {
    Papa.parse(file, {
      complete: (results: { data: any[]; }) => {
        this.movies = results.data;
      }
    });
  }

  ngOnInit() {
    this.http.get('assets/filmes.csv', { responseType: 'text' })
      .subscribe(
        data => {
          Papa.parse(data, {
            complete: (results: { data: any[]; }) => {
              this.movies = results.data;
            }
          });
        },
        error => {
          console.log('Erro ao carregar o arquivo:', error);
        }
      );
  }

  searchMovies(keyword: string) {
    if (keyword.trim() === '') {
      // Se a palavra-chave estiver vazia, exiba todos os filmes
      this.movies = Papa.unparse(this.movies);
    } else {
      // Filtra os filmes com base na palavra-chave fornecida
      const filteredMovies = this.movies.filter(movie =>
        movie[1].toLowerCase().includes(keyword.toLowerCase()) ||  // title
        movie[2].toLowerCase().includes(keyword.toLowerCase())     // genres
      );
      this.movies = Papa.unparse(filteredMovies);
    }
  }
}
