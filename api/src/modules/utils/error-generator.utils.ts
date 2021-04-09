import { CustomError } from './CustomError';

interface ErrorGeneratorInput {
  statusCode: number;
  error: string;
  message: string;
}

export const errorGenerator = (errorInfos: ErrorGeneratorInput) => {
  const { error, message, statusCode } = errorInfos;

  return {
    generate: () => {
      throw new CustomError(statusCode, error, message);
    }
  };
};
