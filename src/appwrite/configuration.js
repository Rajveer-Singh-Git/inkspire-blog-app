import config from "../config";
import {Client, ID, Databases, Storage, Query} from "appwrite";

export class Service {
    client = new Client;
    databases;
    storage;

    Service() {
        this.client
        .setEndpoint(config.appwriteURL)
        .setProject(config.appwriteProjectID)
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, content, slug, featuredImg, status, userId})
    {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID, 
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status,
                    userId
                }
            )
        } catch (error) {
             console.log("Appwrite Service :: createPost :: error",error);
        }
    }

    async updatePost(slug, {title, content, featuredImg, status} ) {
        try {
           return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImg,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error",error);
        }
    }

    async deletePost(slug) {
        try {
                await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error",error);
        }
    }

     async getPost(slug) {
        try {
                await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error",error);
            return false;
        }
    }

     async getposts(queries = [Query.equal("status","active")]) {
        try {
                await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("Appwrite Service :: getposts :: error",error);
        }
    }

    async uploadFile(file) {
        try {
                await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error",error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
                await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error",error);
            return false;
        }
    }

    async getFilePreview(fileId) {
       return await this.bucket.getFilePreview(
            config.appwriteBucketID,
            fileId
        )
    }
}

const service = new Service();
export default service;