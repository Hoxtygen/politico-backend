const db = require("../database/dbConfig")
import { User } from './../typedef/index';

class UserAccess {
    static createUser(user: User) {
        return db("users").insert(user).returning("*")
    }

    static getUserByEmail(email: string) {
        return db("users").where({ email }).select("firstName", "lastName", "email", "passportUrl", "phoneNumber").first();
    }
}


export default UserAccess