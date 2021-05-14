//src/helpers/admin.js

const generatePassword = function() {
  const chars = '~`!@#$%^&*()_-+={[}]\\:;"\'<,>.?/0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  let password = '';

  while (password.length < 8) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
};

module.exports = { generatePassword };