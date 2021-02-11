export function toNumber(value: string | number | null | undefined): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function toRequestBody(
  values: Record<string, string | number | boolean | null | undefined>
): string {
  return Object.keys(values)
    .filter((key) => values[key] !== undefined)
    .map((key) => {
      return (
        encodeURIComponent(key) + '=' + encodeURIComponent('' + values[key])
      );
    })
    .join('&amp;');
}
