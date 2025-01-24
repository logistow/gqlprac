import { UserEntity } from "database/entity";
import { AppDataSource } from "database";

const userRepository = AppDataSource.getRepository(UserEntity);

export const resolvers = {
  Query: {
    getUser: async (_, { id }: { id: number }) => {
      return await userRepository.findOneBy({ id: id });
    },

    getUsers: async () => {
      return await userRepository.find();
    },
  },
  Mutation: {
    createUser: async (
      _,
      { name, email, age }: { name: string; email: string; age: number }
    ) => {
      const user = userRepository.create({ name, email, age });
      return await userRepository.save(user);
    },

    updateUser: async (
      _,
      {
        id,
        name,
        email,
        age,
      }: { id: number; name?: string; email?: string; age?: number }
    ) => {
      await userRepository.update(id, { name, email, age });
      return await userRepository.findOneBy({id: id});
    },

    deleteUser: async (_, { id }: { id: number }) => {
      const user = await userRepository.findOneBy({id: id});
      if (user) {
        await userRepository.remove(user);
        return user;
      }
      throw new Error("User not found");
    },
  },
};
