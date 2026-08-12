export function shareToX(text: string, url?: string): void {
  const xIntentUrl = new URL("https://twitter.com/intent/tweet");
  xIntentUrl.searchParams.set("text", text);
  
  if (url) {
    xIntentUrl.searchParams.set("url", url);
  }

  // Open X share intent in a new popup window for a better user experience
  const width = 550;
  const height = 400;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);

  window.open(
    xIntentUrl.toString(),
    "share-twitter",
    `width=${width},height=${height},left=${left},top=${top},toolbar=0,status=0`
  );
}
