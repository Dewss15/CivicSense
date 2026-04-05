// AI Service — Civic intelligence engine for issue analysis
// Uses OpenAI-compatible API to analyze issue descriptions
// Returns structured JSON: { shortSummary, priority, category }

const VALID_PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const VALID_CATEGORIES = ['Roads', 'Sanitation', 'Electricity', 'Water', 'Public Safety', 'Other'];

const SYSTEM_PROMPT = `You are a civic infrastructure analysis engine.
Analyze public issue reports and return structured JSON only.

Return format STRICTLY:
{
  "shortSummary": "<max 15 words summarizing the issue>",
  "priority": "<Low | Medium | High | Critical>",
  "category": "<Roads | Sanitation | Electricity | Water | Public Safety | Other>"
}

Rules:
- shortSummary must be at most 15 words.
- priority must be exactly one of: Low, Medium, High, Critical.
- category must be exactly one of: Roads, Sanitation, Electricity, Water, Public Safety, Other.
- Do not return markdown.
- Do not explain.
- Return JSON only.`;

/**
 * Generate fallback AI result from raw description text.
 */
const getFallbackResult = (description) => {
  const words = description.split(/\s+/);
  return {
    shortSummary: words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : ''),
    priority: 'Medium',
    category: 'Other',
  };
};

/**
 * Validate and sanitize the parsed AI response.
 * Returns a clean object or null if completely invalid.
 */
const validateAiResponse = (parsed, description) => {
  const fallback = getFallbackResult(description);

  const shortSummary =
    typeof parsed.shortSummary === 'string' && parsed.shortSummary.trim().length > 0
      ? parsed.shortSummary.trim().split(/\s+/).slice(0, 15).join(' ')
      : fallback.shortSummary;

  const priority = VALID_PRIORITIES.includes(parsed.priority)
    ? parsed.priority
    : fallback.priority;

  const category = VALID_CATEGORIES.includes(parsed.category)
    ? parsed.category
    : fallback.category;

  return { shortSummary, priority, category };
};

/**
 * Analyze an issue description using OpenAI-compatible LLM.
 * Always returns a result — uses fallback if AI call fails.
 *
 * @param {string} description - The issue description text
 * @returns {Promise<{shortSummary: string, priority: string, category: string}>}
 */
const analyzeIssue = async (description) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

  // If no API key configured, return fallback immediately
  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[AI Service] No OPENAI_API_KEY set — using fallback');
    }
    return getFallbackResult(description);
  }

  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[AI Service] Analyzing issue description...');
      console.log('[AI Service] API Key present:', apiKey ? `${apiKey.slice(0, 8)}...` : 'MISSING');
      console.log('[AI Service] Model:', model);
    }

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 200,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: description },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('[AI Service] API error:', response.status, errorBody);
      return getFallbackResult(description);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      console.error('[AI Service] Empty response from API');
      return getFallbackResult(description);
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log('[AI Service] Raw response:', content);
    }

    // Parse JSON — strip markdown fences if model wraps them
    const jsonStr = content.replace(/^```json?\n?/i, '').replace(/\n?```$/i, '').trim();
    const parsed = JSON.parse(jsonStr);
    const result = validateAiResponse(parsed, description);

    if (process.env.NODE_ENV !== 'production') {
      console.log('[AI Service] Validated result:', result);
    }

    return result;
  } catch (err) {
    console.error('[AI Service] Failed to analyze issue:', err.message);
    return getFallbackResult(description);
  }
};

module.exports = { analyzeIssue };
