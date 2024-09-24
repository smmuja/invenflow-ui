export function firstCapitalize(text) {
  const textToLowercase = text.toLocaleLowerCase();
  const firstChar = textToLowercase[0].toLocaleUpperCase();
  const remainingChar = textToLowercase.slice(1);

  return firstChar + remainingChar;
}

export function firstEachWordCapitalize(text) {
  const words = text.toLocaleLowerCase().split(" ");

  const capitalizeWords = words.map((word) => {
    const firstChar = word[0].toLocaleUpperCase();
    const remainingChar = word.slice(1);

    return firstChar + remainingChar;
  });
  return capitalizeWords.join(" ");
}
