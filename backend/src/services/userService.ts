import { User, IUser } from "../models/User";
import bcrypt from "bcrypt";

export class UserService {
    static async findUserByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }

    static async createUser(userData: Partial<IUser>): Promise<IUser> {
        const hashedPassword = await bcrypt.hash(userData.password!, 10);
        const user = new User({ 
            ...userData, 
            password: hashedPassword 
        });
        return user.save();
    }

    static async validatePassword(user: IUser, password: string):Promise<boolean> {
        return await bcrypt.compare(password, user.password);
    }

    static async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
          return User.findByIdAndUpdate(userId, 
            // {
            //     firstName: updateData.firstName,
            //     lastName: updateData.lastName,
            // }
            updateData,
            {new: true}
        );
        
    }


}