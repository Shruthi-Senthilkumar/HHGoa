export function createObjectUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function revokeObjectUrl(url: string) {
  if (url) {
    URL.revokeObjectURL(url);
  }
}
