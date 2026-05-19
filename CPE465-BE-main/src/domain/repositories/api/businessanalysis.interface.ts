export interface BusinessIdeaDto {
  idea: string;
}

export interface ApiResponse<T = any> {
  statusCode: number;
  data: T | null;
  message: string;
  error: any;
  timestamp: string;
}

export abstract class IBusinessAnalysisServiceApi {
  abstract business_analysis(data: BusinessIdeaDto): Promise<ApiResponse>;
  abstract gemini_analysis(data: BusinessIdeaDto): Promise<ApiResponse>;
}
  