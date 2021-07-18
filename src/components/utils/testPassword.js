export default function testPassword(pw) {
   return /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{1,50}).{8,50}$/.test(
      pw
   );
}
