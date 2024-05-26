import bcrypt from 'bcryptjs';

function hashingPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export default hashingPassword;
