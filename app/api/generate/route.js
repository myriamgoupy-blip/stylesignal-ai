import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      brandName,
      businessType,
      productIdea,
      targetAudience,
      priceRange,
      channels,
      goal,
    } = body;

    const prompt = `
You are an expert validation assistant for boutique founders.

Your job is to help a founder test a product idea before investing more in production or marketing.

Business details:
- Brand name: ${brandName}
- Business type: ${businessType}
- Product idea: ${productIdea}
- Target audience: ${targetAudience}
- Price range: ${priceRange}
- Channels: ${channels}
- Goal: ${goal}

Return ONLY valid JSON with this exact structure:
{
  "hypothesis": "...",
  "testPlan": "...",
  "angles": [
    {"title": "...", "body": "..."},
    {"title": "...", "body": "..."},
    {"title": "...", "body": "..."}
  ],
  "instagramCaption": "...",
  "whatsappMessage": "...",
  "adStarter": "...",
  "signals": ["...", "...", "...", "...", "..."],
  "checklist": ["...", "...", "...", "...", "..."]
}
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    const text = response.output_text;
    const parsed = JSON.parse(text);

    return Response.json(parsed, { status: 200 });
  } catch (error) {
    console.error("API generation error:", error);

    return Response.json(
      {
        error: "Failed to generate AI output.",
        details: error?.message || "Unknown server error",
      },
      { status: 500 }
    );
  }
}