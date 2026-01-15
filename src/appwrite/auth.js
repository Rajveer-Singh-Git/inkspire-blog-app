import config from "../config/config"

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client;
    account;

    constructor() {
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID)
        this.account = new Account(this.client)
    }

    async createAccount({email, name, password}) {
        try {
            const userAccount = await this.account.Create(ID.unique(), email,name,password);
            if (userAccount) {
             return this.Login({email,password})
            } else {
                return userAccount;
            }
        } catch (error) {
            throw(error);
        }
    }

    async Login({email,password}) {
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw(error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser:: error",error);
        }   
    }

    async Logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service :: Logout:: error",error);
        }   
    }
}

const authService = new AuthService;

export default authService

