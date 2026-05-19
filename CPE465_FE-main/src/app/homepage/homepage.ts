import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AnalysisService } from '../services/analysis.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  step: number = 1;
  isAnalyzing: boolean = false;

  constructor(
    private router: Router,
    private analysisService: AnalysisService
  ) {}

  formData = {
    businessName: '',
    IdeaDetail: '',
    budget: 0,
    location: '',
    targetAudience: '',
    salesChannel: '' //online, onsite, both
  };

  nextStep() {
    if (this.step < 3) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }


  onSubmit() {
    this.isAnalyzing = true;
    this.analysisService.analyzeBusinessPlan(this.formData).subscribe({
      next: (res) => {
        this.isAnalyzing = false;
        this.router.navigate(['/result']);
      },
      error: (err) => {
        this.isAnalyzing = false;
        alert("เกิดข้อผิดพลาดในการวิเคราะห์ข้อมูล");
      }
    });
  }

  // ใช้แสดงผล (มี comma)
  get displayBudget(): string {
    return this.formData.budget
      ? this.formData.budget.toLocaleString()
      : '';
  }

  // ตอนพิมพ์
  onBudgetInput(event: any) {
    let value = event.target.value;

    // ลบทุกอย่างที่ไม่ใช่ตัวเลข
    const cleaned = value.replace(/[^\d]/g, '');

    // แปลงเป็น number
    const numeric = parseInt(cleaned, 10);

    this.formData.budget = isNaN(numeric) ? 0 : numeric;
  }

  // ปุ่ม quick select
  setBudget(val: number) {
    this.formData.budget = val;
  }

  setSalesChannel(value: string) {
  this.formData.salesChannel = value;
}
}