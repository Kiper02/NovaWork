export interface IProcessImageInput {
  buffer: Buffer;
  targetFormat?: 'webp' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  quality?: number;
}
