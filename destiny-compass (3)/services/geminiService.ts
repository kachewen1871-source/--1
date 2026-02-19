
import { BaziResult, UserInput } from "../types";

export const analyzeBazi = async (input: UserInput): Promise<BaziResult> => {
  // 调用我们可以自己部署的后端接口
  // 在 Vercel 等平台部署时，API 路径通常为 /api/analyze
  const API_ENDPOINT = "/api/analyze";

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error:", errorData);
      throw new Error("天机推演遇到阻碍，请稍后重试。");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("未获取到分析结果");
    }

    // 解析返回的 JSON 字符串
    return JSON.parse(content) as BaziResult;

  } catch (error) {
    console.error("Analysis Error:", error);
    // 如果解析 JSON 失败或者网络错误
    throw new Error("连接服务器失败，请检查网络或稍后重试。");
  }
};
