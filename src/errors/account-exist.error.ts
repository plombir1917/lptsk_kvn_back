export class AccountExistError extends Error {
  constructor(message: string) {
    super(`Account with login: '${message}' already exists!`);
  }
}
