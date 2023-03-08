package main

import (
	"encoding/json"
	"os"
)

type ExampleInfo struct {
	Example string `json:"example"`
	Source string `json:"source"`
}
type LexicalInfo struct {
	Word string `json:"word"`
	Type string `json:"type"`
}
type SenseInfo struct {
	Definition string `json:"definition"`
	DefinitionOriginal string `json:"definition_original"`
	CategoryInfos []string `json:"category_info"`
	LexicalInfos []LexicalInfo `json:"lexical_info"`
	ExampleInfos []ExampleInfo `json:"example_info"`
}
type CommPatternInfo struct {
	// CommPatternCode int `json:"comm_pattern_code"`
	SenseInfo []SenseInfo `json:"sense_info"`
}
type PosInfo struct {
	// PosCode int `json:"pos_code"`
	CommPatternInfo []CommPatternInfo `json:"comm_pattern_info"`
	Pos string `json:"pos"`
}
type RelationInfo struct {
	Word string `json:"word"`
	Type string `json:"type"`
}
type OriginalLanguageInfo struct {
	OriginalLanguage string `json:"original_language"`
	LanguageType string `json:"language_type"`
}
type WordInfo struct {
	RelationInfos []RelationInfo `json:"relation_info"`
	WordUnit string `json:"word_unit"`
	Word string `json:"word"`
	WordType string `json:"word_type"`
	OriginalLanguageInfo []OriginalLanguageInfo `json:"original_language_info"`
	PosInfos []PosInfo `json:"pos_info"`
}
type Item struct {
	TargetCode int `json:"target_code"`
	WordInfo WordInfo `json:"word_info"`
}
type Channel struct {
	Total int `json:"total"`
	Title string `json:"title"`
	Description string `json:"description"`
	Items []Item `json:"item"`
}
type Dict struct {
	Channel Channel `json:"channel"`
}

func GetDictFromFile(path string) Dict {
	var dict Dict
	file, err := os.ReadFile(path)
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal(file, &dict)
	if err != nil {
		panic(err)
	}
	return dict
}