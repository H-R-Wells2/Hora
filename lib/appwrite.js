import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "react-native-appwrite";

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.hrwells.hora',
    projectId: '66237015a88e39dfb49e',
    databaseId: '662371de66c9a9a476a2',
    userCollectionId: '662372081f49b55574b3',
    videoCollectionId: '66237233adc97e1c0d70',
    storageId: '662374a56963db0dca38'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = config;

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw new Error;

        const avatarUrl = avatars.getInitials();

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );


        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}


export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password)
        return session;
    } catch (error) {
        throw new Error(error)
    }
}


export const getCurrentUSer = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }

}



export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
        )
        return posts.documents
    } catch (error) {
        throw new Error(error);
    }
}


export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error);
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error);
    }
}
