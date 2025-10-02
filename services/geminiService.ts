
import { GoogleGenAI, Modality } from "@google/genai";
import type { RestorationOptions, ImageFile } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function buildPrompt(options: RestorationOptions): string {
  let prompt = "Please restore this old and damaged photo. ";

  const requestMap = {
    high_quality: 'Restore to a very high quality, sharp, and clear image. Enhance details and fix colors.',
    original: 'Restore the photo while preserving its original character and feel as much as possible. Focus on removing damage and noise.',
    detailed_face: 'Focus on recreating the face with high detail. Enhance eyes, skin texture, and fine features.',
    portrait: 'Restore as a close-up portrait. The face should be the main focus.',
    scenery: 'This is a landscape or scenery photo. Restore colors, remove damage, and enhance the overall view.'
  };
  prompt += requestMap[options.mainRequest] + ' ';

  if (options.gender !== 'not_specified') {
    prompt += `The subject is a ${options.gender}. `;
  }
  if (options.age) {
    prompt += `They are approximately ${options.age} years old. `;
  }
  if (options.keepId) {
    prompt += 'It is crucial to keep all identifying marks like moles, scars, or unique facial features. Do not remove them. ';
  }
  if (options.remakeHair) {
    prompt += 'Recreate the hair to look natural and detailed. ';
  }
  if (options.remakeClothes) {
    prompt += 'Recreate the clothing to look realistic and sharp. ';
  }
  if (options.additionalRequest) {
    prompt += `Follow these specific user instructions carefully: "${options.additionalRequest}". `;
  }

  prompt += "The output must be only the restored image, with no added text or watermarks."

  return prompt;
}

export const restorePhoto = async (imageFile: ImageFile, options: RestorationOptions): Promise<string> => {
    const prompt = buildPrompt(options);
    const base64Data = imageFile.base64.split(',')[1];
    const mimeType = imageFile.file.type;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: {
            parts: [
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: mimeType,
                    },
                },
                {
                    text: prompt,
                },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }

    throw new Error("AI did not return an image. The response might contain safety blocks or other text.");
};
