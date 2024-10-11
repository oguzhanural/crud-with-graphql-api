import UserService from "../services/userService";
import { createToken } from "../utils/jwt";

export const userResolvers = {

    Query: {
        me: (_: any, __:any, { user }: any) => {
            return UserService.findUserByEmail(user.email);
        },
    },

    Mutation: {
        register: async (_:any, { firstName, lastName, email, password }: any) => {
            UserService.createUser( { firstName, lastName, email, password});
        },

        login: async (_:any, {email, password}: any) => {
            const user = await UserService.findUserByEmail(email);
            if (!user) {
                throw new Error("User not found!");
            }
            const isValid = await UserService.validatePassword(user, password);
            if (!isValid) {
                throw new Error("Invalid password");
            }
            return createToken(user.id);
        },

        updateProfile: (_:any, { firstName, lastName }:any, { user }: any) => {
            if (!user) {
                throw new Error("Not authenticated");
            }
            return UserService.updateUser(user.id, {
                firstName,
                lastName
            });
        },
    },
}

export default userResolvers;
