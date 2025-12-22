
import { GoogleGenAI } from "@google/genai";
import { Session, QuestionStatus } from "../types";

export const analyzeSession = async (session: Session): Promise<string> => {
  // Fix: Initialize GoogleGenAI strictly using process.env.API_KEY as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Fix: Calculate stats with a guard for empty records to prevent division by zero
  const stats = {
    totalQuestions: session.records.length,
    avgTime: session.records.length > 0 
      ? session.records.reduce((acc, r) => acc + r.timeInSeconds, 0) / session.records.length 
      : 0,
    correctCount: session.records.filter(r => r.status === QuestionStatus.CORRECT).length,
    skippedCount: session.records.filter(r => r.status === QuestionStatus.SKIPPED).length,
  };

  const prompt = `
    Analyze this JEE study session data and provide actionable tips for the student.
    Subject: ${session.subject}
    Chapter: ${session.chapter}
    Stats:
    - Total Questions: ${stats.totalQuestions}
    - Average Time per Question: ${stats.avgTime.toFixed(1)} seconds
    - Correct: ${stats.correctCount}
    - Skipped: ${stats.skippedCount}
    
    Data per question:
    ${session.records.map(r => `Q${r.questionNumber}: ${r.timeInSeconds}s, Status: ${r.status}`).join('\n')}

    Format your response in friendly Markdown. Focus on time management and potential areas of improvement.
  `;

  try {
    // Fix: Upgrade to gemini-3-pro-preview for complex STEM/reasoning tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    // Fix: Access response text using the .text property (not a method)
    return response.text || "Could not generate analysis at this time.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Error generating AI insights. Please check your connection.";
  }
};
