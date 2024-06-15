import * as bcrypt from 'bcrypt';

export async function encodePassword(rawPassword: string) {
  const SALT = await bcrypt.genSalt();
  return await bcrypt.hash(rawPassword, SALT);
}

export async function comparePassword(
  rawPassword: string,
  encodedPassword: string,
) {
  if (!(await bcrypt.compare(rawPassword, encodedPassword)))
    throw new Error('Wrong password!');
  return true;
}
