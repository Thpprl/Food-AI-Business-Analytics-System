import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import { UserRepository } from '@domain/repositories/database';
import { CreateUserDto } from '@infrastructure/dtos/user/create-user.dto';
import { User } from '@domain/model';
import { BusinessIdeaDto } from '@infrastructure/dtos/business_analysis/business-analysis.dto';
import { IBusinessAnalysisServiceApi } from '@domain/repositories/api/businessanalysis.interface';
@Injectable()
export class AnalysisIdeaUseCase implements UseCase<
  {
    body: BusinessIdeaDto;
  },
  any
> {
  constructor(private readonly businessAnalysisService: IBusinessAnalysisServiceApi) {}

  async execute(ctx: { body: BusinessIdeaDto }): Promise<any> {
    return this.businessAnalysisService.gemini_analysis(ctx.body);
    return {
      statusCode: 200,
      message: 'success',
      data: {
        score: Math.floor(Math.random() * 31) + 70,
        canvas: {
          keyPartners: [
            "ฟาร์มต้นไม้ท้องถิ่น",
            "บริษัทขนส่งรวดเร็ว",
            "Influencer สายแต่งบ้าน"
          ],
          keyActivities: [
            "คัดสรรต้นไม้",
            "บำรุงรักษา",
            "พัฒนาแอป"
          ],
          keyResources: [
            "สต็อกต้นไม้",
            "ผู้เชี่ยวชาญ",
            "ระบบสมาชิก"
          ],
          valuePropositions: [
            "ต้นไม้ดูแลง่าย",
            "Subscription",
            "เพิ่มพื้นที่สีเขียว"
          ],
          customerRelationships: [
            "ระบบสมาชิก",
            "Community",
            "Personal Stylist"
          ],
          channels: [
            "Mobile App",
            "Social Media",
            "Pop-up Store"
          ],
          customerSegments: [
            "คนคอนโด",
            "คนไม่มีเวลาดูแลต้นไม้"
          ],
          costStructure: [
            "ค่าซื้อต้นไม้",
            "ค่าพนักงาน"
          ],
          revenueStreams: [
            "ค่าสมาชิก",
            "ขายอุปกรณ์"
          ]
        },
        strategies: [
          "จับมือคอนโด",
          "ทำโปรโมชันเปิดตัว",
          "Influencer รีวิว"
        ]
      }
    };
  }
}
