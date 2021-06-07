import axios from 'axios';
import { ReactElement, useState } from 'react';
import styles from '../pages/auth/Signup.module.scss';

type RequestProps = {
  url: string;
  method: 'get' | 'put' | 'post' | 'delete';
  body: any;
  onSuccess: (data: any) => void;
};

const useRequest = (requestProps: RequestProps) => {
  const { url, method, body, onSuccess } = requestProps;

  const [errors, setErrors] = useState<ReactElement | null>(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <ul className={styles.errorsContainer}>
          {err.response.data.errors.map((e: any) => (
            <li key={e.message}>{e.message}</li>
          ))}
        </ul>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
