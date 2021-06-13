import { GetServerSideProps } from 'next';
import axios from 'axios';
import router from 'next/router';

export type HomeProps = StaticProps & {};

const Home: React.FC<HomeProps> = (props) => {
  const { currentUser } = props;

  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>Your are not signed in</h1>
  );
};

type StaticProps = {
  currentUser: string | null;
};

export const getServerSideProps: GetServerSideProps<StaticProps> = async (
  context
) => {
  const { req } = context;

  let user: string | null;
  try {
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers
      }
    );

    user = data;
  } catch (error) {
    user = null;
  }

  return {
    props: {
      currentUser: user
    }
  };
};

export default Home;
