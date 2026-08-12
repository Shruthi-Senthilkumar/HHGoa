import { MAX_FILE_SIZE_BYTES, SUPPORTED_MIME_TYPES } from "./constants";

export type ValidationResult = 
  | { valid: true; error: null }
  | { valid: false; error: string };

export function validateImageFile(file: File): ValidationResult {
  if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
    // Some devices might upload HEIC without correct mime type, check extension as fallback
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'heic' && extension !== 'heif') {
      return {
        valid: false,
        error: "UNSUPPORTED FILE. Please choose a JPG, PNG or HEIC image.",
      };
    }
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: "IMAGE TOO LARGE. Please choose a smaller image.",
    };
  }

  return { valid: true, error: null };
}
