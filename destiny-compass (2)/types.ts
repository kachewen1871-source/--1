
export interface CityScores {
  career: number;      // 事业
  wealth: number;      // 财运
  health: number;      // 健康
  relationship: number;// 感情
  potential: number;   // 潜力
}

export interface CityRecommendation {
  name: string;
  description: string;
  scores: CityScores;
}

export interface BaziResult {
  analysis: {
    tags: string[];        // 命局标签 (e.g., ["身弱", "喜水木"])
    summary: string;       // 简析总结
  };
  directions: string[];    // 核心方位
  cities: CityRecommendation[]; // 推荐城市
  advice: string;          // 发展建议
}

export interface UserInput {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}
