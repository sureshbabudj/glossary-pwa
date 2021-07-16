export interface Definition {
  type: string;
  definition: string;
  example?: string;
  image_url?: any;
  emoji?: any;
}

export interface Glossary {
  pronunciation: string;
  definitions: Definition[];
  word: string;
}

export interface Definitions {
  [key: string]: Definition[];
}
