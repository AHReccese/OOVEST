package com.oovest.dataBase;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.ServerAddress;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;

import com.oovest.crypto.Hash;
import org.bson.Document;

import java.util.Arrays;

import com.mongodb.Block;

import com.mongodb.client.MongoCursor;

import static com.mongodb.client.model.Filters.*;

import com.mongodb.client.result.DeleteResult;

import static com.mongodb.client.model.Updates.*;

import com.mongodb.client.result.UpdateResult;

import java.util.ArrayList;
import java.util.List;

public class DataBaseController {

    private final static MongoClientURI connectionString = new MongoClientURI("mongodb://localhost:27017");
    private static MongoClient mongoClient;
    private static MongoDatabase database;
    private static MongoCollection<Document> collection;

    public static void loadMongoDB() {
        mongoClient = new MongoClient(connectionString);
        database = mongoClient.getDatabase("Authenticator");
        collection = database.getCollection("user");
    }

    public static void addUser(String username, String email, String pass) {
        Document doc = new Document("username", username)
                .append("password", Hash.sha256(pass))
                .append("email", email);
        collection.insertOne(doc);
    }

    public static Document doesExist(String userMail) {
        return collection.find(new Document("username", userMail)).first();
    }

    public static void resetDB() {
        collection.drop();
    }

    public static void main(String[] args) {
        loadMongoDB();
        addUser("AHReccese", "amirhssin6rst@gmail.com", "dummyPass:)");
        Document d = doesExist("amir");
        System.out.println(d != null);
        System.out.println(d.get("passwor"));
        collection.drop();
    }

}
