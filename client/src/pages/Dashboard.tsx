import React from "react";
import { withMainlayout } from "../layouts";
import { useQuery, gql } from "@apollo/client";
import { IUser } from "../types";

const GET_USERS = gql`
  query ExampleQuery {
    getUsers {
      id
      email
      name
    }
  }
`;

export const Dashboard: React.FC = withMainlayout(() => {
  const { data, loading, error } = useQuery<{ getUsers: IUser[] }>(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Failed!: ${error}`}</p>;

  return (
    <div>
      <h1>User Dashboard</h1>
      <ul>
        {data?.getUsers.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
});
