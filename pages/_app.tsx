import '../styles/globals.css'
import Script from 'next/script';
import type { AppProps } from 'next/app'
import * as Realm from 'realm-web';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  useQuery,
} from "@apollo/client";
import gql from 'graphql-tag';
import Navbar from '../components/navigation/navbar';


// Connect to your MongoDB Realm app
// const app = new Realm.App(process.env.REALM_APP_ID);
const app = new Realm.App('application-0-usrtl');
console.log('-----------------' + typeof process.env.NEXT_PUBLIC_REALM_API_KEY);
const user = await loginApiKey(process.env.NEXT_PUBLIC_REALM_API_KEY); // add previously generated API key

async function loginApiKey(apiKey) {
  // Create an API Key credential
  const credentials = Realm.Credentials.serverApiKey(apiKey);
  try {
    // Authenticate the user
    const user = await app.logIn(credentials);
    // `App.currentUser` updates to match the logged in user
    console.assert(user.id === app.currentUser.id);
    return user;
  } catch (err) {
    console.error("Failed to log in", err);
  }
}

console.log("Successfully logged in!", user);

// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  // Guarantee that there's a logged in user with a valid access token
  if (!app.currentUser) {
    // If no user is logged in, log in an anonymous user. The logged in user will have a valid
    // access token.
    await app.logIn(Realm.Credentials.anonymous());
  } else {
    // An already logged in user's access token might be stale. To guarantee that the token is
    // valid, we refresh the user's custom data which also refreshes their access token.
    await app.currentUser.refreshCustomData();
  }
  return app.currentUser.accessToken;
}
// Configure the ApolloClient to connect to your app's GraphQL endpoint
const client = new ApolloClient({
  link: new HttpLink({
    // uri: process.env.DB_URI,
    uri: 'https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-usrtl/graphql',
    // We define a custom fetch handler for the Apollo client that lets us authenticate GraphQL requests.
    // The function intercepts every Apollo HTTP request and adds an Authorization header with a valid
    // access token before sending the request.
    fetch: async (uri, options) => {
      const accessToken = await getValidAccessToken();
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query {
//         comments {
//           _id
//           email
//           eventId
//           name
//           text
//         }
//       }
//     `
//   })
//   .then(result => console.log(JSON.stringify(result)));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
        <Navbar></Navbar>
        <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
