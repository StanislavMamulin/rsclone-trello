export interface IUser {
  id: string
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token?: string;
  accessLevel: AccessLevel;
  gender: string;
}

export type IUserParams = Omit<IUser, 'id' | 'token'>;

export type RegistrationParams = Pick<
IUser, 
'firstName' | 'lastName' | 'email' | 'password' | 'gender'
>;

type ExpiresIn = {
  expiresIn: string;
};

export type UserResponse = Pick<IUser, 'email' | 'id' | 'token'> & ExpiresIn;

export type LoginParams = Pick<IUser, 'email' | 'password'>;

export enum AccessLevel {
  'Admin',
  'User',
  'Anonymous',
}
