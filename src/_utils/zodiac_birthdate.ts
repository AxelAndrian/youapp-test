type HoroscopeSign =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces";

type ChineseZodiac =
  | "Rat"
  | "Ox"
  | "Tiger"
  | "Rabbit"
  | "Dragon"
  | "Snake"
  | "Horse"
  | "Goat"
  | "Monkey"
  | "Rooster"
  | "Dog"
  | "Pig";

interface ZodiacResult {
  horoscope: HoroscopeSign;
  chineseZodiac: ChineseZodiac;
}

function getZodiacByBirthdate(date: Date): ZodiacResult {
  const day = date.getDate();
  const month = date.getMonth() + 1; // JS months are 0-based
  const year = date.getFullYear();

  // Horoscope (Western Zodiac)
  let horoscope: HoroscopeSign;
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    horoscope = "Aries";
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    horoscope = "Taurus";
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    horoscope = "Gemini";
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    horoscope = "Cancer";
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    horoscope = "Leo";
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    horoscope = "Virgo";
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    horoscope = "Libra";
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    horoscope = "Scorpio";
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    horoscope = "Sagittarius";
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    horoscope = "Capricorn";
  else if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    horoscope = "Aquarius";
  else horoscope = "Pisces";

  // Chinese Zodiac
  const chineseZodiacs: ChineseZodiac[] = [
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat",
    "Monkey",
    "Rooster",
    "Dog",
    "Pig",
  ];

  // 2020 was Rat year → use it as reference
  const baseYear = 2020;
  const zodiacIndex = (year - baseYear) % 12;
  const chineseZodiac = chineseZodiacs[(zodiacIndex + 12) % 12];

  return { horoscope, chineseZodiac };
}
