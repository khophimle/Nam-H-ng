
export interface RestorationOptions {
  mainRequest: 'high_quality' | 'original' | 'detailed_face' | 'portrait' | 'scenery';
  gender: 'male' | 'female' | 'not_specified';
  age: string;
  keepId: boolean;
  remakeHair: boolean;
  remakeClothes: boolean;
  additionalRequest: string;
}

export interface ImageFile {
    file: File;
    base64: string;
}
