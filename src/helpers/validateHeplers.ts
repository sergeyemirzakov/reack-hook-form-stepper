// Card Number Validation
export function validateNumber(v: string): number | string {
  let value = v.replaceAll('_', '');
  return value.length;
}

// Card Expiry Validation
function limit(val: string, max: string) {
  if (val.length === 1 && val[0] > max[0]) {
    val = '0' + val;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = '01';
    } else if (val > max) {
      val = max;
    }
  }

  return val;
}

export function cardExpiryValidation(val: string) {
  let month = limit(val.substring(0, 2), '12');
  let date = limit(val.substring(2, 4), '31');

  return month + (date.length ? '/' + date : '');
}
