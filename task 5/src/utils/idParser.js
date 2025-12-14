// Governorate codes mapping for Egyptian National ID
const governorates = {
  1: "القاهرة",
  2: "الإسكندرية",
  3: "بورسعيد",
  4: "السويس",
  11: "دمياط",
  12: "الدقهلية",
  13: "الشرقية",
  14: "القليوبية",
  15: "كفر الشيخ",
  16: "الغربية",
  17: "المنوفية",
  18: "البحيرة",
  19: "الإسماعيلية",
  21: "الجيزة",
  22: "بني سويف",
  23: "الفيوم",
  24: "المنيا",
  25: "أسيوط",
  26: "سوهاج",
  27: "قنا",
  28: "أسوان",
  29: "الأقصر",
  31: "البحر الأحمر",
  32: "الوادي الجديد",
  33: "مطروح",
  34: "شمال سيناء",
  35: "جنوب سيناء",
  88: "خارج الجمهورية"
};


const monthNames = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر"
];

/**
 * parseEgyptianNationalId
 * Supports the common 14-digit Egyptian national ID format where:
 *  - digit 0: century marker (2 => 1900s, 3 => 2000s)
 *  - digits 1-2: year (YY)
 *  - digits 3-4: month (MM)
 *  - digits 5-6: day (DD)
 *  - digits 7-8: governorate code
 *  - digits 9-13: serial (gender determined from last serial digit)
 *
 * Returns { birthDate, birthPlace, gender } or null for invalid IDs.
 */
export function parseEgyptianNationalId(idNumber) {
  const cleanRaw = String(idNumber).replace(/\s/g, "");

  // helper: compute Luhn check digit for a numeric string
  function luhnCheckDigit(numberStr) {
    // returns the check digit (0-9) for the numberStr using Luhn
    const digits = numberStr.split("").map((d) => parseInt(d, 10));
    let sum = 0;
    // Luhn from right: double every second digit
    for (let i = digits.length - 1, pos = 0; i >= 0; i--, pos++) {
      let d = digits[i];
      if (pos % 2 === 0) {
        // leave as is
        sum += d;
      } else {
        let dd = d * 2;
        if (dd > 9) dd -= 9;
        sum += dd;
      }
    }
    const check = (10 - (sum % 10)) % 10;
    return check;
  }

  // parse a 14-digit candidate string, return object or null
  function parse14(cleanId) {
    if (!/^\d{14}$/.test(cleanId)) return null;
    try {
      const c = parseInt(cleanId[0], 10); // century digit
      const yy = parseInt(cleanId.substring(1, 3), 10);
      const mm = parseInt(cleanId.substring(3, 5), 10);
      const dd = parseInt(cleanId.substring(5, 7), 10);
      const govCode = parseInt(cleanId.substring(7, 9), 10);
      const serial = cleanId.substring(9, 13); // 4 digits serial
      const checkDigit = parseInt(cleanId[13], 10);

      // Determine full year from century digit
      let year;
      if (c === 2) year = 1900 + yy;
      else if (c === 3) year = 2000 + yy;
      else {
        const currentYear = new Date().getFullYear();
        const currentYY = currentYear % 100;
        const currentCentury = Math.floor(currentYear / 100) * 100;
        year = yy > currentYY ? currentCentury - 100 + yy : currentCentury + yy;
      }

      // Validate month/day
      if (mm < 1 || mm > 12) return null;
      if (dd < 1 || dd > 31) return null;
      const monthLengths = [31, (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (dd > monthLengths[mm - 1]) return null;

      const governorate = governorates[govCode] || "غير محدد";

      // Gender digit per convention: the 13th digit (index 12) indicates gender: odd male, even female
      const genderDigit = parseInt(cleanId[12], 10);
      const gender = (genderDigit % 2 === 1) ? "ذكر" : "أنثى";

      // Check-digit validation (use Luhn on first 13 digits)
      const computedCheck = luhnCheckDigit(cleanId.substring(0, 13));
      const isCheckValid = computedCheck === checkDigit;

      const monthName = monthNames[mm - 1] || "";
      const birthDate = `${dd} ${monthName}, ${year}`;

      return {
        birthDate,
        birthPlace: governorate,
        gender,
        governorateCode: govCode,
        parts: {
          C: c,
          YY: String(yy).padStart(2, "0"),
          MM: String(mm).padStart(2, "0"),
          DD: String(dd).padStart(2, "0"),
          GOV: String(govCode).padStart(2, "0"),
          SERIAL: serial,
          CHECK: String(checkDigit)
        },
        isCheckValid,
        candidate: cleanId
      };
    } catch (err) {
      return null;
    }
  }

  // If input is 14 digits, parse directly
  if (/^\d{14}$/.test(cleanRaw)) {
    return parse14(cleanRaw);
  }

  // If input is 16 digits, try normalizations: try substrings of length 14 shifted by 0..2
  if (/^\d{16}$/.test(cleanRaw)) {
    for (let start = 0; start <= 2; start++) {
      const cand = cleanRaw.substring(start, start + 14);
      const parsed = parse14(cand);
      if (parsed) {
        // attach original input for reference
        parsed.original = cleanRaw;
        parsed.normalizedFrom = cand;
        return parsed;
      }
    }
    return null;
  }

  // Otherwise, attempt to find any 14-digit substring inside the string
  const match = cleanRaw.match(/\d{14}/);
  if (match) {
    const parsed = parse14(match[0]);
    if (parsed) {
      parsed.original = cleanRaw;
      parsed.normalizedFrom = match[0];
      return parsed;
    }
  }

  return null;
}
