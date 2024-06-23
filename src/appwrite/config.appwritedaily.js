import conf from "../conf/conf";
import {Client,ID,Databases, Query} from "appwrite";

// export class addStudentService{
//     client = new Client;
//     databases;

//     constructor(){
//         this.client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectID);
//         this.databases = new Databases(this.client);   
//     }

// //* ------------ Daily Entry ---------------- *//
//     async addNewStudentDailyEntry({slug,id,name,type,inTime,outTime,createdOn}){
//         try {
//             return await this.databases.createDocument(
//                 conf.appwriteDatabaseID,
//                 conf.appwriteDailyEntryCollectionID,
//                 slug,
//                 {
//                     id,
//                     name,
//                     type,
//                     inTime,
//                     outTime, 
//                     createdOn
//                 }
//             )
//          } catch (error) {
//              console.log("Appwrite Service :: addNewStudentDailyEntry :: error",error);
//          }
//     }
//     async updateStudentDailyEntry(slug,{id,name,type,inTime,outTime,createdOn}){
//         try {
//             return await this.databases.updateDocument(
//                 conf.appwriteDatabaseID,
//                 conf.appwriteCollectionID,
//                 slug,
//                 {
//                     id,
//                     name,
//                     type,
//                     inTime,
//                     outTime, 
//                     createdOn
//                 }
//             )
//          } catch (error) {
//              console.log("Appwrite Service :: updateStudent :: error",error);
//          }
//     }
    
// }


// const appwriteService = new addStudentService();
// export default appwriteService;