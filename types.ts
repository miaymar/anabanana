
export interface ImageFile {
  file: File;
  previewUrl: string;
}

export interface ResultImage {
  name: string;
  url: string;
  blob: Blob | null;
  status: 'success' | 'error';
}
