import { useCallback, useState } from "react";
import { api, RequestType, ServiceName } from "./api";

interface RequestStatus<DataType = unknown> {
  response?: DataType;
  loading?: boolean;
  error?: any;
}

export const useRequest = (requestName: ServiceName) => {
  const [status, setStatus] = useState<
    RequestStatus<RequestType[typeof requestName]["response"]>
  >();

  const request = useCallback(
    (body: RequestType[typeof requestName]["variables"]) => {
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

  return { ...status, request };
};
