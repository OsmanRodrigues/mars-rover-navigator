import { useCallback, useState } from "react";
import { api, RequestType, ServiceName } from "./api";

interface RequestStatus<DataType = unknown> {
  response?: DataType;
  loading?: boolean;
  error?: any;
}

export const useRequest = (requestName: ServiceName) => {
  type RequestBody = RequestType[typeof requestName]["variables"];
  type RequestResponse = RequestStatus<
    RequestType[typeof requestName]["response"]
  >;

  const [status, setStatus] = useState<RequestResponse>();

  const request = useCallback(
    (body: RequestBody) => {
      setStatus({ loading: true });
      api[requestName](body)
        .then(response => setStatus({ response }))
        .catch(err => setStatus({ error: err }))
        .finally(() =>
          setStatus(preveStatus => ({ ...preveStatus, loading: false }))
        );
    },
    [requestName]
  );

  const serialRequest = useCallback(
    async (serialBody: RequestBody[]) => {
      const serialPromises = serialBody.map(body => api[requestName](body));
      const serialResponse = await Promise.all(serialPromises);

      return serialResponse;
    },
    [requestName]
  );

  return { ...status, request, serialRequest };
};
