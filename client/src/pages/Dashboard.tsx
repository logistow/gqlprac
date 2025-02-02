import React, { useState } from "react";
import { withMainlayout } from "../layouts";
import { useQuery, useMutation, gql } from "@apollo/client";
import { IUser } from "../types";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      email
      name
      age
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $age: Int!) {
    createUser(name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $name: String, $email: String, $age: Int) {
    updateUser(id: $id, name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const Dashboard: React.FC = withMainlayout(() => {
  const { data, loading, error, refetch } = useQuery<{ getUsers: IUser[] }>(
    GET_USERS
  );
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [form, setForm] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    age: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Failed!: ${error.message}`}</p>;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editingId) {
      await updateUser({
        variables: {
          id: editingId,
          name: form.name,
          email: form.email,
          age: Number(form.age),
        },
      });
      setEditingId(null);
    } else {
      await createUser({
        variables: {
          name: form.name,
          email: form.email,
          age: Number(form.age),
        },
      });
    }
    setForm({ id: "", name: "", email: "", age: 0 });
    refetch();
  };
  

  const handleEdit = (user: IUser) => {
    setForm(user);
    setEditingId(user.id);
  };

  const handleDelete = async (id: string) => {
    await deleteUser({ variables: { id } });
    refetch();
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          name="name"
          value={form.name}
          onChange={handleFormChange}
          placeholder="Name"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleFormChange}
          placeholder="Email"
          type="email"
          required
        />
        <input
          name="age"
          value={form.age}
          onChange={handleFormChange}
          placeholder="Age"
          type="number"
          required
        />
        <button type="submit">
          {editingId ? "Update User" : "Create User"}
        </button>
        <button
          type="button"
          onClick={() => setForm({ id: "", name: "", email: "", age: 0 })}
        >
          Clear
        </button>
      </form>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.getUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
