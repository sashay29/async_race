const CARMARKS = ['Ferrari', 'Porsche', 'Lamborghini', 'Mercedes-Benz', 'BMW', 'Audi', 'Tesla', 'Ford', 'Chevrolet', 'Toyota'];

const CARMODELS = ['GT', 'M', 'AMG', 'COUPE', 'R', 'BRABUS', 'ALPINA', 'HENNESSEY', 'TRD', 'SHELBY'];

export const MAX_CAR_NAME_LENGTH = 25;
export const GARAGE_PAGE_SIZE = 7;
export const WINNERS_PAGE_SIZE = 10;

export function getRandomColor(): string {
   const letters = '0123456789ABCDEF';
   let color = '#';
   for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
}

export function getRandomCarName(): string {
   const mark = CARMARKS[Math.floor(Math.random() * CARMARKS.length)];
   const model = CARMODELS[Math.floor(Math.random() * CARMODELS.length)];
   return `${mark} ${model}`;
}

export function validateCarName(name: string): string | null {
   const trimmed = name.trim();
   if (!trimmed) return 'Name is required';
   if (trimmed.length > MAX_CAR_NAME_LENGTH) {
      return `Name must be at most ${MAX_CAR_NAME_LENGTH} characters`;
   }
   return null;
}

export function normalizeCarName(name: string): string {
   return name.trim();
}
