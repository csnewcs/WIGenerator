package main

import (
	"encoding/json"
	"os"
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDB struct {
	Host string `json:"hostname"`
	Port string `json:"port"`
	Username string `json:"username"`
	Password string `json:"password"`
	Client mongo.Client
}

func UseMongo() MongoDB { //Init
	file, err := os.ReadFile("config.json")
	if err != nil {
		panic(err)
	}
	var MongoDB MongoDB
	json.Unmarshal(file, &MongoDB)
	uri := "mongodb://localhost:" + MongoDB.Port
	if (MongoDB.Host != "localhost") {
		uri = "mongodb://" + MongoDB.Username + ":" + MongoDB.Password + "@" + MongoDB.Host + ":" + MongoDB.Port
	}
	client, _ := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	MongoDB.Client = *client
	return MongoDB
}