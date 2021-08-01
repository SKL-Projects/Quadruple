export function ThousandSeperator(x) {
   return x.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function ThousandSeperatorNum(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
