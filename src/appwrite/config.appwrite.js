import conf from "..conf/conf.js";
import {Client, ID, Databases, Storage, Query} from "appwrite";

export class addStudentService{
    client = new Client;
    databases;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);   
    }

    async addNewStudent({id,name,course,batch,mobno,type}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                id,
                {
                    id,
                    name,
                    course,
                    batch,
                    mobno,
                    type
                }
            )
         } catch (error) {
             console.log("Appwrite Service :: addNewStudent :: error",error);
         }
    }

    async updateStudent(id,{id,name,course,batch,mobno,type}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                id,
                {
                    id,
                    name,
                    course,
                    batch,
                    mobno,
                    type
                }
            )
         } catch (error) {
             console.log("Appwrite Service :: updateStudent :: error",error);
         }
    }

    async deleteStudent(id){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                id
            )
            return true;
        } catch (error) {
             console.log("Appwrite Service :: deleteStudent :: error",error);
             return false;   
        }
    }

    async getStudent(id){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                id
            )
        } catch (error) {
             console.log("Appwrite Service :: getStudent :: error",error);
             return false;   
        }
    }

    async getAllStudent(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID
            )
        } catch (error) {
             console.log("Appwrite Service :: getAllStudent :: error",error);
             return false;   
        }
    }

    async getHostelStudent(queries = [Query.equal("Key","0")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        } catch (error) {
             console.log("Appwrite Service :: getHostelStudent :: error",error);
             return false;   
        }
    }

    async getDayStudent(queries = [Query.equal("Key","1")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        } catch (error) {
             console.log("Appwrite Service :: getDayStudent :: error",error);
             return false;   
        }
    }

}


const addstudentservice = new addStudentServiceService();
export default addstudentservice;