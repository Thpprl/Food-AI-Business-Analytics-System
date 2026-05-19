import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
// 🚩 แก้ไข Path ให้ตรงตามโครงสร้างโฟลเดอร์ของคุณเพื่อแก้ Error TS2307
import { BusinessIdeaDto } from '../../../dtos/business_analysis/business-analysis.dto';
import { GEMINI_PROMPT } from './gemeni.prompt'; 

@Injectable()
export class BusinessAnalysisService {
  private readonly logger = new Logger(BusinessAnalysisService.name);

  constructor(private readonly httpService: HttpService) {}

  /**
   * ฟังก์ชันหลักที่ UseCase เรียกใช้
   * ระบบจะพยายามใช้ Qwen ก่อน ถ้าพังจะสลับไป Gemini อัตโนมัติ
   */
  async business_analysis(data: BusinessIdeaDto): Promise<any> {
    try {
      this.logger.log('--- [AI Strategy] Primary: Attempting Qwen 2.5 (Ollama) ---');
      return await this.executeOllama(data);
    } catch (ollamaError) {
      this.logger.warn(`⚠️ Qwen Service Unavailable: ${ollamaError.message}`);
      this.logger.log('--- [AI Strategy] Backup: Switching to Google Gemini ---');
      return await this.executeGemini(data);
    }
  }

  /**
   * ฟังก์ชันสำรอง (Alias) เพื่อให้รองรับ Interface เดิมที่มีอยู่
   * ช่วยแก้ Error 'gemini_analysis' is missing
   */
  async gemini_analysis(data: BusinessIdeaDto): Promise<any> {
    return this.business_analysis(data);
  }

  // --- ระบบหลัก: Ollama (Qwen 2.5) ---
  private async executeOllama(data: BusinessIdeaDto): Promise<any> {
    // 🚩 ตรวจสอบ URL จาก ngrok ให้ตรงกับปัจจุบันเสมอ
    const targetApi = 'https://unspasmodic-stoichiometrically-mikaela.ngrok-free.dev/api/generate';

    const payload = {
      model: 'qwen2.5:7b',
      prompt: GEMINI_PROMPT(data),
      stream: false,
      format: 'json',
      options: {
        temperature: 0.3,
        num_ctx: 4096
      }
    };

    const response = await firstValueFrom(
      this.httpService.post(targetApi, payload, {
        headers: { 
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true' 
        },
        timeout: 45000 // รอ 45 วินาที ถ้าเกินนี้ให้ตัดไป Gemini
      })
    );

    this.logger.log('✅ Qwen Response Received');
    const aiResponse = response.data.response;
    return typeof aiResponse === 'string' ? JSON.parse(aiResponse) : aiResponse;
  }

  // --- ระบบสำรอง: Google Gemini API ---
  private async executeGemini(data: BusinessIdeaDto): Promise<any> {
    // ดึง Key จากไฟล์ .env
    const apiKey = 'AIzaSyAr-UVNBjEUUTEWmVdAetvt2NhETdasVvE'; 
    const targetApi = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [{ text: GEMINI_PROMPT(data) }]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    try {
      const response = await firstValueFrom(this.httpService.post(targetApi, payload));
      this.logger.log('✅ Gemini Backup Response Received');
      
      const textResponse = response.data.candidates[0].content.parts[0].text;
      return JSON.parse(textResponse);
    } catch (geminiError) {
      this.logger.error(`❌ All AI Services Failed: ${geminiError.message}`);
      throw new HttpException(
        'AI Analysis is currently unavailable. Please try again later.', 
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
}