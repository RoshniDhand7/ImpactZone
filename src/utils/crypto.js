import CryptoJS from 'crypto-js';
const key = 'IMPACTZONE';

function encrypt(data) {
  let text = JSON.stringify(data);
  const cipherText = CryptoJS.AES.encrypt(text, key).toString();
  return cipherText;
}
function decrypt(cipherText) {
  const decryptedText = CryptoJS.AES.decrypt(cipherText, key).toString(
    CryptoJS.enc.Utf8,
  );
  let data = JSON.parse(decryptedText);
  return data;
}
export { encrypt, decrypt };
