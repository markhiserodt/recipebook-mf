import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Feature } from "../models/feature.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  private http = inject(HttpClient);

  features$ = signal<Feature[]>([]);
  private get features(): Feature[] {
    return this.features$(); 
  }

  constructor() {
    this.getFeatures();
  }

  getFeatures(): void {
    this.http.get<Feature[]>(`${environment.apiUrl + 'api/feature'}`).subscribe((features: Feature[]) => {
      this.features$.set(features);
    });
  }

  addFeature(feature: Feature): void {
    this.http.post<Feature>(`${environment.apiUrl + 'api/feature'}`, feature).subscribe((feature: Feature) => {
      this.features$.set([...this.features, feature]);
    });
  }

  updateFeature(feature: Feature): void {
    this.http.put<Feature>(`${environment.apiUrl + 'api/feature'}`, feature).subscribe((feature: Feature) => {
      this.features$.set(this.features.map(f => f.id === feature.id ? feature : f));
    });
  }

  deleteFeature(feature: Feature): void {
    this.http.delete<Feature>(`${environment.apiUrl + 'api/feature/' + feature.id}`).subscribe((feature: Feature) => {
      this.features$.set(this.features.filter(f => f.id !== feature.id));
    });
  }
}