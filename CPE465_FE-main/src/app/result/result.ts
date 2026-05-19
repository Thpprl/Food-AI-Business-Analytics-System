import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnalysisService } from '../services/analysis.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './result.html',
  styleUrl: './result.css',
})
export class Result implements OnInit {
  score = 0;
  canvas: any;
  strategies: string[] = [];
  idea: string = '';
  data: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private analysisService: AnalysisService,
  ) {}

  ngOnInit() {
    const sharedData = this.analysisService.getSharedData();
    if (sharedData) {
      const result = sharedData.data;

      this.data = {
        ...result,
        gdpMetrics: {
          gpAfterCommission: this.formatCurrency(result.gdpMetrics.gpAfterCommission),
          marketValue: this.formatCurrency(result.gdpMetrics.marketValue),
          growthRate: result.gdpMetrics.growthRate,
          projectedGmv: this.formatCurrency(result.gdpMetrics.projectedGmv),
        },
      };
    }
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('th-TH', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 0,
    });
  }
}
