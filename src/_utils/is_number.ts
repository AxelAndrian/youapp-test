export const isNumber = (evt: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    !evt.code.includes("Digit") &&
    !evt.code.includes("Numpad") &&
    !evt.code.includes("Backspace") &&
    !evt.code.includes("Delete") &&
    !evt.code.includes("Arrow") &&
    !evt.code.includes("Tab") &&
    !evt.code.includes("Enter")
  ) {
    evt.preventDefault();
  }
};
