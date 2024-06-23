import conf from "../conf/conf";
import {Client,ID,Databases, Query} from "appwrite";

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
                // ID.unique(),
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

    async updateStudent(id,{name,course,batch,mobno,type}){
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
        // console.log(id);
        try {
             await this.databases.deleteDocument(
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

//* ------------ Daily Entry ---------------- *//
    async addNewStudentDailyEntry({slug,id,name,type,inTime,outTime,createdOn}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteDailyEntryCollectionID,
                slug,
                {
                    slug,
                    id,
                    createdOn,
                    inTime,
                    outTime, 
                    name
                }
            )
         } catch (error) {
             console.log("Appwrite Service :: addNewStudentDailyEntry :: error",error);
         }
    }
    /*
    async updateStudentDailyEntry(slug,{id,name,type,inTime,outTime,createdOn}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteDailyEntryCollectionID,
                slug,
                {
                    id,
                    name,
                    type,
                    inTime,
                    outTime, 
                    createdOn
                }
            )
         } catch (error) {
             console.log("Appwrite Service :: updateStudent :: error",error);
         }
    }
    */
    async updateStudentDailyEntry(slug, { inTime, outTime }) {
        try {
          return await this.databases.updateDocument(
            conf.appwriteDatabaseID,
            conf.appwriteDailyEntryCollectionID,
            slug,
            {
              inTime,
              outTime
            }
          );
        } catch (error) {
          console.log("Appwrite Service :: updateStudentDailyEntry :: error", error);
        }
      }
      

    async getDailyEntryStudentsByDate(date) {
        try {
          // Assuming date is in 'YYYY-MM-DD' format
          const startOfDay = new Date(date);
          startOfDay.setHours(0, 0, 0, 0);
    
          const endOfDay = new Date(date);
          endOfDay.setHours(23, 59, 59, 999);
    
          const queries = [
            Query.greaterThanEqual('createdOn', startOfDay.toISOString()),
            Query.lessThanEqual('createdOn', endOfDay.toISOString()),
          ];
    
          return await this.databases.listDocuments(
            conf.appwriteDatabaseID,
            conf.appwriteDailyEntryCollectionID,
            queries
          );
        } catch (error) {
          console.log("Appwrite Service :: getDailyEntryStudentsByDate :: error", error);
          return false;
        }
    }

    async getAllDailyStudents(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteDailyEntryCollectionID
            )
        } catch (error) {
             console.log("Appwrite Service :: getAllStudent :: error",error);
             return false;   
        }
    }

    
}


const appwriteService = new addStudentService();
export default appwriteService;

/*
import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";

export class addStudentService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
    }

    async addNewStudent({ id, name, course, batch, mobno, type }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                ID.unique(),
                { id, name, course, batch, mobno, type }
            );
        } catch (error) {
            console.log("Appwrite Service :: addNewStudent :: error", error);
        }
    }

    async updateStudent(id, { name, course, batch, mobno, type }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                id,
                { id, name, course, batch, mobno, type }
            );
        } catch (error) {
            console.log("Appwrite Service :: updateStudent :: error", error);
        }
    }

    async deleteStudent(id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                id
            );
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteStudent :: error", error);
            return false;
        }
    }

    async getStudent(id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                id
            );
        } catch (error) {
            console.log("Appwrite Service :: getStudent :: error", error);
            return null;
        }
    }

    async getAllStudent() {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID
            );
            return response.documents;
        } catch (error) {
            console.log("Appwrite Service :: getAllStudent :: error", error);
            return [];
        }
    }

    async addNewStudentDailyEntry({ slug, id, name, type, inTime, outTime, createdOn }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteDailyEntryCollectionID,
                slug,
                { id, name, type, inTime, outTime, createdOn }
            );
        } catch (error) {
            console.log("Appwrite Service :: addNewStudentDailyEntry :: error", error);
            return null;
        }
    }

    async updateStudentDailyEntry(slug, { id, name, type, inTime, outTime, createdOn }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteDailyEntryCollectionID,
                slug,
                { id, name, type, inTime, outTime, createdOn }
            );
        } catch (error) {
            console.log("Appwrite Service :: updateStudentDailyEntry :: error", error);
            return null;
        }
    }
}

const appwriteService = new addStudentService();
export default appwriteService;
*/