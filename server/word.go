package main

import (
	"math"
)

type Word struct {
	Word string `bson:"word"`
	Pos []int `bson:"pos"`
}

func calculateDistance(word1 Word, word2 Word) float64 {
	var distance float64 = 0
	for i, pos := range word1.Pos {
		distance += math.Pow(float64(pos) - float64(word2.Pos[i]), 2)
	}
	return distance
}

func (word Word) FindClosest(words []Word) Word {
	var closest Word
	var closestDist = math.MaxFloat64
	for _, w := range words {
		dist := calculateDistance(word, w)
		if dist < closestDist {
			closestDist = dist
			closest = w
		}
	}
	return closest
}