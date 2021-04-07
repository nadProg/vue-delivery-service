export default function checkLuhn(number) {
  number = `${number}`.split('').map((digit) => +digit);

  number.forEach((digit, index, array) => {
    if ((index + 1) % 2) {
      digit *= 2;
      digit = digit > 9 ? digit - 9 : digit;
      array[index] = digit;
    }
  });

  const sum = number.reduce((sum, digit) => sum += digit, 0);
  const isCorrect = !(sum % 10);

  return isCorrect;
}
