export function copyToClipboard(value: string): void {
  const copyText = document.createElement('input');
  copyText.style.position = 'fixed';
  copyText.style.zIndex = '-999';
  copyText.style.opacity = '0';
  copyText.value = value;
  document.body.appendChild(copyText);
  copyText.select();
  document.execCommand('copy');
  document.body.removeChild(copyText);
}
