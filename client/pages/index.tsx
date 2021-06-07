import { GetServerSideProps } from 'next';
import axios from 'axios';

export type HomeProps = StaticProps & {};

const Home: React.FC<HomeProps> = (props) => {
  const { currentUser } = props;
  console.log('Current user is: ', currentUser);

  return <h1>Testing changes</h1>;
};

type StaticProps = {
  currentUser: string | null;
};

export const getServerSideProps: GetServerSideProps<StaticProps> = async (
  context
) => {
  const { req } = context;

  const { data } = await axios.get(
    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    {
      headers: req.headers
    }
  );

  return {
    props: {
      currentUser: data
    }
  };
};

export default Home;
