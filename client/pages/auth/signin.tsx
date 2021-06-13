// Same style as signup
import Router from 'next/router';
import { FormEvent, useState } from 'react';
import useRequest from '../../hooks/use-request';
import styles from './Signup.module.scss';

export type signinProps = {};

const signin: React.FC<signinProps> = (props) => {
  const {} = props;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1 onClick={(e) => {}}>Sign In!</h1>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="email"
            className={styles.formControl}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            id="password"
            className={styles.formControl}
            value={password}
            placeholder="Choose a password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors}
        <button className={styles.submitButton}>Sign In</button>
      </form>
    </div>
  );
};

export default signin;
