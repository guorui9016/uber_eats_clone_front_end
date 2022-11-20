import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const token = localStorage.getItem("token")
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token)

const httpLink = createHttpLink({
  uri:'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  if(isLoggedInVar()){
    return {
      headers: {
        ...headers,
        "x-jwt": authTokenVar()
      }
    }
  }
  else{
    return {
      headers: {
        ...headers,
      }
    }
  }

});
console.log("Apollo -> isLoggedInVar value is: ", isLoggedInVar())
console.log("Apollo -> authToken value is: ", authTokenVar())

export const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {  
              return isLoggedInVar();
            },
          },
          token:{
            read(){
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
