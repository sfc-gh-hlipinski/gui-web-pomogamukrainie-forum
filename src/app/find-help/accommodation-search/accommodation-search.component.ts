import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccommodationQuery } from './accommodation-search-form/accommodation-search-form.component';
import { Pagable } from '../../api/pagable';
import { OfferLocation } from '../../api/types';

interface AccommodationOffer {
  id: number;
  title: string;
  description: string;
  location: OfferLocation;
  guests: number;
  lengthOfStay: string;
  hostLanguage: string[];
}
@Component({
  selector: 'app-accommodation-search',
  templateUrl: './accommodation-search.component.html',
  styleUrls: ['./accommodation-search.component.scss'],
})
export class AccommodationSearchComponent {
  results: AccommodationOffer[] = [];
  total: number = NaN;
  loading = false;
  constructor(private http: HttpClient) {}

  search(query: AccommodationQuery) {
    this.loading = true;
    this.http
      .get<Pagable<AccommodationOffer>>('/api/accommodations', {
        params: {
          ...query,
        },
      })
      .subscribe({
        next: (results) => {
          this.results = results.content;
          this.total = results.totalElements;
          this.loading = false;
        },
        error: () => {
          this.results = [];
          this.total = NaN;
          this.loading = false;
        },
      });
  }
}
