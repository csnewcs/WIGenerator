package main

import (
	"math"
)

type Word struct {
	Word      string `bson:"word"`
	Pos       []int  `bson:"pos"`
	Distances map[string]int
}

func calculateDistance(word1 Word, word2 Word) int {
	distance := 0
	for i, pos := range word1.Pos {
		distance += (pos - word2.Pos[i]) * (pos - word2.Pos[i])
	}
	return distance
}

func (word Word) GetClosestWords(words *[]Word) Word {
	var closestWord Word
	var closestDistance int
	closestDistance = math.MaxInt
	for i, w := range *words {
		if word.Word == w.Word {
			continue
		}
		var dist int
		if val, contains := word.Distances[w.Word]; contains {
			dist = val
		} else {
			dist = calculateDistance(word, w)
			(*words)[i].Distances[word.Word] = dist
		}
		if dist < closestDistance {
			closestDistance = dist
			closestWord = w
		}
	}
	return closestWord
}
