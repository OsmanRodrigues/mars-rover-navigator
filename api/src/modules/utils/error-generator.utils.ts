import { CustomError } from './CustomError';

interface ErrorGeneratorInput {
  statusCode: number;
  error: string;
  message: string;
}

export const errorGenerator = (defaultErrorInfos?: ErrorGeneratorInput) => ({
  generate: (errorInfos?: ErrorGeneratorInput) => {
    const { error, message, statusCode } = errorInfos || defaultErrorInfos;

    throw new CustomError(statusCode, error, message);
  }
});
