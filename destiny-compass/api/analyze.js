
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const input = await req.json();
    
    // 获取环境变量中的 API Key
    const apiKey = process.env.DEEPSEEK_API_KEY;
    const API_URL = "https://api.deepseek.com/chat/completions";

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Server configuration error: Missing API Key' }), { status: 500 });
    }

    const systemPrompt = `
      你是一位精通中国传统八字命理学（四柱预测）和现代中国城市经济发展的专家。
      请根据用户的出生信息进行严谨的排盘推演。
      注意：
      1. 必须基于"真太阳时"和"二十四节气"进行排盘。
      2. 对于同一个八字，你的身强/身弱判断和喜用神判断必须保持严谨的一致性。
      3. 输出必须是严格的 JSON 格式，不要包含 Markdown 标记。
    `;

    const userPrompt = `
      用户信息:
      - 出生日期: ${input.birthDate}
      - 出生时间: ${input.birthTime}
      - 出生地: ${input.birthPlace}

      请执行以下任务并返回 JSON 数据：
      1. 【命局分析】：判断八字格局、身强身弱、喜用神。提取 3-5 个关键标签，并生成一句话总结。
      2. 【方位建议】：根据喜用神，给出最利于发展的 1-2 个方位。
      3. 【城市推荐】：推荐 2-3 个具体的中国城市（含评分 0-100）。
      4. 【锦囊妙计】：给出具体的职业或生活建议。

      请严格按照以下 JSON 结构返回数据：
      {
        "analysis": {
          "tags": ["标签1"],
          "summary": "简析"
        },
        "directions": ["方位1"],
        "cities": [
          {
            "name": "城市名",
            "description": "理由",
            "scores": { "career": 80, "wealth": 85, "health": 70, "relationship": 75, "potential": 90 }
          }
        ],
        "advice": "建议"
      }
    `;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.1,
        response_format: { type: "json_object" },
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API Error:", errorText);
      return new Response(JSON.stringify({ error: `Upstream API error: ${response.status}` }), { status: 500 });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
