/**
 * Convert Celsius to Fahrenheit
 * @param celsius temperature in °C
 * @returns temperature in °F
 */
export function cToF(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Convert Fahrenheit to Celsius
 * @param fahrenheit temperature in °F
 * @returns temperature in °C
 */
export function fToC(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}
