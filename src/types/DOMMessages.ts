export type DOMMessage = {
  type: 'GET_DOM';
}

export type DOMMessageResponse = {
  title: string;
  description: string;
  brand: string | RegExpMatchArray;
  headlines: string[];
  url: string;
  links: string[];
  asin: string[];
  brandName: string[];
  modelInfo: string[];
  itemModelNumber: string[];
  partNumber: string[];
  specs: string[];
}
