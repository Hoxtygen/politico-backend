import { deflate } from 'zlib';
import UserAccess from '../data-access/userAccess'
import { User } from './../typedef/index';

class UserService {

    static async createUser(user: User) {
        return await UserAccess.createUser(user)
    }

    static async getUserByEmail(email:string) {
        return await UserAccess.getUserByEmail(email)
    }
}

export default UserService;