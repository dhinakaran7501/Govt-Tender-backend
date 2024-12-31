import { LoginRequestParams } from 'types/auth.types';

export const loginService = async (reqData: LoginRequestParams) => {
  // try {
  // Here you want to write database talk

  const isExistingUser = false;
  if (isExistingUser) {
    throw 'User not found.';
  }

  return {
    status: 1,
    message: 'Login successfully.',
    data: {
      ...reqData,
    },
  };
  // } catch (error) {
  //   throw error;
  // }
};
