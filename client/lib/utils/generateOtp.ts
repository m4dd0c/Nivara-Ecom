import { CountryCode } from "libphonenumber-js";
import { countryDialingCodes } from "../constants";

export const genOTP = (): number => {
  const num = Math.floor(100000 + Math.random() * 900000);
  return num;
};

export const getDialingCodeByCountryCode = (countryCode: CountryCode) => {
  const data = countryDialingCodes.find(
    (item) => item.countryCode === countryCode,
  );
  return data?.dialingCode;
};
export const getCountryCodeByDialingCode = (dialingCode: number | string) => {
  const data = countryDialingCodes.find(
    (item) => item.dialingCode === +dialingCode,
  );
  return data?.countryCode;
};
