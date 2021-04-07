import checkLuhn from '@/utils/checkLuhn';

const notEmpty = (value) => !!value;
const noLowDash = (value) => !value.includes('_');
const defaultCheck = (value) => notEmpty(value) && noLowDash(value);

const validityCheckMap = {
  address: (value) => notEmpty(value),
  card(value) {
    if (!defaultCheck(value)) {
      return false;
    }
    return checkLuhn(value.replace(/ /g, ''));
  },
  defaultCheck,
};

export default function checkValidity(value, name) {
  return validityCheckMap[name]
    ? validityCheckMap[name](value)
    : validityCheckMap.defaultCheck(value);
}
