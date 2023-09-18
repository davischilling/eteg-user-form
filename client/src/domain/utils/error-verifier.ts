import { InvalidFieldError } from '../errors/invalid-field';
import { InvalidRequestError } from '../errors/invalid-request';

type Response = {
  status: number;
  data: {
    message: string;
  };
};

export const errorVerifier = (response: Response): Error => {
  const { status, data } = response;
  if (status === 400) {
    return new InvalidRequestError();
  } else if (status === 409) {
    return new InvalidFieldError();
  }
  return new Error(data.message);
};
