/**
 * Generates a professional job listing based on the input text for each section.
 * Each section will be approximately 300 characters in length.
 */
export const generateListing = (
  companyInput: string,
  jobInput: string,
  candidateInput: string
) => {
  // Process company information (truncate or expand to ~300 chars)
  const companyText = processText(companyInput, 300);
  
  // Process job description (truncate or expand to ~300 chars)
  const jobText = processText(jobInput, 300);
  
  // Process candidate requirements (truncate or expand to ~300 chars)
  const candidateText = processText(candidateInput, 300);
  
  return {
    company: companyText,
    job: jobText,
    candidate: candidateText
  };
};

/**
 * Processes the input text to make it approximately the target length.
 * If the text is too short, it enhances it. If too long, it summarizes it.
 */
const processText = (text: string, targetLength: number): string => {
  const originalLength = text.trim().length;
  
  // If text is already close to target length, return as is
  if (originalLength >= targetLength * 0.8 && originalLength <= targetLength * 1.2) {
    return text.trim();
  }
  
  // If text is too short, enhance it
  if (originalLength < targetLength * 0.8) {
    return enhanceText(text, targetLength);
  }
  
  // If text is too long, summarize it
  return summarizeText(text, targetLength);
};

/**
 * Enhances short text to make it closer to the target length.
 * This is a simplified version - in a real application, this would use more
 * sophisticated NLP techniques or AI.
 */
const enhanceText = (text: string, targetLength: number): string => {
  // Simple enhancement by adding filler phrases based on section content
  const fillerPhrases = [
    "私たちは常に向上心を持って取り組んでいます。",
    "チームワークを重視し、協力して目標達成を目指します。",
    "地域社会との共生を大切にしています。",
    "持続可能な農業を実践しています。",
    "働きやすい環境づくりに力を入れています。",
    "お客様に安心・安全な農産物をお届けすることを使命としています。",
    "未経験からでもしっかりとサポートします。",
    "農業の魅力を一緒に広げていきましょう。",
    "自然と共に成長できる環境があります。",
    "あなたの経験や知識を活かせる場所です。"
  ];
  
  let enhanced = text.trim();
  
  // Add filler phrases until we get close to target length
  while (enhanced.length < targetLength * 0.8) {
    const randomPhrase = fillerPhrases[Math.floor(Math.random() * fillerPhrases.length)];
    enhanced += " " + randomPhrase;
  }
  
  return enhanced;
};

/**
 * Summarizes long text to make it closer to the target length.
 * This is a simplified version - in a real application, this would use more
 * sophisticated NLP techniques or AI.
 */
const summarizeText = (text: string, targetLength: number): string => {
  // Simple approach: keep sentences until we reach target length
  const sentences = text.split(/[。.!?！？]/g).filter(s => s.trim().length > 0);
  let summary = "";
  
  for (const sentence of sentences) {
    if ((summary + sentence).length <= targetLength) {
      summary += sentence + "。";
    } else {
      break;
    }
  }
  
  return summary.trim();
};