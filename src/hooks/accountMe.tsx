import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../__generated__/meQuery";

const ME_QUERY = gql`
  query meQuery {
    me {
      email
      role
      verified
    }
  }
`;


export const AccountMe = () => {
        return  useQuery<meQuery>(ME_QUERY);
}