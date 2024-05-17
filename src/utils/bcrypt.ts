import * as bcrypt from 'bcrypt';
import { WrongPasswordError } from 'src/errors/wrong-password.error';

export async function encodePassword(rawPassword: string) {
  const SALT = await bcrypt.genSalt();
  return await bcrypt.hash(rawPassword, SALT);
}

export async function comparePassword(
  rawPassword: string,
  encodedPassword: string,
) {
  if (!(await bcrypt.compare(rawPassword, encodedPassword)))
    throw new WrongPasswordError();
  return true;
}
