const clampChannel = (value: number): number => Math.max(0, Math.min(255, Math.round(value)));

const parseHex = (hex: string): [number, number, number] => {
   const normalized = hex.replace('#', '');
   const full = normalized.length === 3 ? normalized.split('').map((c) => c + c).join('') : normalized;
   const int = Number.parseInt(full, 16);
   const r = Math.floor(int / 65536) % 256;
   const g = Math.floor(int / 256) % 256;
   const b = int % 256;
   return [r, g, b];
};

export const shiftColor = (hex: string, amount: number): string => {
   const [r, g, b] = parseHex(hex);
   const factor = 1 + amount;
   return `rgb(${clampChannel(r * factor)}, ${clampChannel(g * factor)}, ${clampChannel(b * factor)})`;
};
