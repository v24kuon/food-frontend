import { HttpLink } from 'apollo-link-http';
import { withData } from 'next-apollo';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const config = {
  link: new HttpLink({
    uri: 'https://se-food-backend.herokuapp.com/graphql',
  }),
};

export default withData(config);
