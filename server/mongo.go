package main

import (
	"context"
	"math/rand"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const connectionUri = "mongodb://localhost:27017"
type Mongo struct {
	Client *mongo.Client
}
func NewMongo() Mongo {
	serverApi := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(connectionUri).SetServerAPIOptions(serverApi)
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}
	return Mongo{Client: client}
}
func (m Mongo) InsertOne(word Word) {
	coll := m.Client.Database("wigenerator").Collection("words")
	_, err := coll.InsertOne(context.TODO(), word)
	if err != nil {
		panic(err)
	}
}
func (m Mongo) FindOne(word string) Word {
	coll := m.Client.Database("wigenerator").Collection("words")
	var result Word
	err := coll.FindOne(context.TODO(), bson.M{"word": word}).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			newWord := m.newWord(word)
			newWord.Distances = make(map[string]int)
			return newWord
		}
		panic(err)
	}
	result.Distances = make(map[string]int)
	return result
}
func (m Mongo) newWord(word string) Word {
	newWord := Word{Word: word, Pos: []int{getRandom(0, 100),getRandom(0, 100),getRandom(0, 100), getRandom(0, 100), getRandom(0, 100) , getRandom(0, 100), getRandom(0, 100), getRandom(0, 100), getRandom(0, 100), getRandom(0, 100), getRandom(0, 100), getRandom(0, 100) , getRandom(0, 100), getRandom(0, 100), getRandom(0, 100), getRandom(0, 100)}}
	m.InsertOne(newWord)
	return newWord
}
func (m Mongo) WordComb(word1 Word, word2 Word)  {
	randomIndex := getRandom(0, len(word1.Pos))
	goPlus := word1.Pos[randomIndex] > word2.Pos[randomIndex]
	if word2.Pos[randomIndex] > 50 && word2.Pos[randomIndex] < 75 {
		word2.Pos[randomIndex] += 1
		word1.Pos[randomIndex] += 1
	} else if word2.Pos[randomIndex] > 25 && word2.Pos[randomIndex] < 50 {
		word2.Pos[randomIndex] -= 1
		word1.Pos[randomIndex] -= 1
	}
	if goPlus {
		word1.Pos[randomIndex] -= 1
	} else {
		word1.Pos[randomIndex] += 1
	}
	m.UpdateOne(word1)
        m.UpdateOne(word2)
}
func (m Mongo) UpdateOne(word Word) {
	coll := m.Client.Database("wigenerator").Collection("words")
	filter := bson.M{"word": word.Word}
	update := bson.M{"$set": bson.M{"pos": word.Pos}}
	_, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		panic(err)
	}
}

func getRandom(min int, max int) int {
	seed := time.Now().UnixNano()
	rand.Seed(seed)
	return rand.Intn(max - min) + min
}