import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function getFramePath(index: number, padLength: number = 3): string {
    const padded = String(index).padStart(padLength, "0");
    return `/frames/ezgif-frame-${padded}.jpg`;
}
