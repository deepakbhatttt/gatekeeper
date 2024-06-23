const conf = {
    appwriteUrl: String(process.env.APPWRITE_URL),
    appwriteProjectID: String(process.env.APPWRITE_PROJECT_ID),
    appwriteDatabaseID: String(process.env.APPWRITE_DATABASE_ID),
    appwriteCollectionID: String(process.env.APPWRITE_COLLECTION_ID)
    // appwriteBucketID: String(process.env.APPWRITE_BUCKET_ID)
}

export default conf;