import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule,  } from '@angular/common';
import { AnalysisService } from '../services/analysis.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-business',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './business.html',
  styleUrl: './business.css',
})
export class Business implements OnInit {

  constructor(private analysisService: AnalysisService) {}

  score : number = 0;

  bmc :any ;
  ngOnInit() {
    const sharedData = this.analysisService.getSharedData();
    if (sharedData) {
      if (sharedData.data.score) this.score = sharedData.data.score;
      if (sharedData.data.bmc) this.bmc = sharedData.data.bmc;
    }
  }
}
