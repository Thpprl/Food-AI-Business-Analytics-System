import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

type businessData = {
  businessName: string;
  IdeaDetail: string;
  budget: number;
  location: string;
  targetAudience: string;
  salesChannel: string; //online, onsite, both
};

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  private rawData: any = null;

  private API_URL = 'https://cpe465-be.onrender.com/business/analysis-idea';

  constructor(private http: HttpClient) {}

  analyzeBusinessPlan(formData: any): Observable<any> {
    const rawPayload = {
      IdeaDetail: formData.IdeaDetail,
      businessName: formData.businessName,
      budget: formData.budget,
      location: formData.location,
      targetAudience: formData.targetAudience,
      salesChannel: formData.salesChannel,
    };

    const payload = this.cleanPayload(rawPayload);
    return this.http.post<any>(this.API_URL, payload).pipe(
      tap((data) => {
        this.rawData = data;
      }),
    );
  }

  getSharedData() {
    console.log(this.rawData);
    
    return this.rawData;
  }

  cleanPayload(obj: businessData) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => {
        if (key === 'budget') return typeof value === 'number' && value > 0;
        return value !== null && value !== undefined && value !== '';
      }),
    );
  }
}
