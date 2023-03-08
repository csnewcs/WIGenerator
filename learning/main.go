package main

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"sync"
	"time"
	"github.com/leandroveronezi/go-terminal"
)

var done int
var max int
var startTime time.Time
var avgTime []int
var size *goTerminal.Coord
var blank string

func main() {
	goTerminal.Clean()
	goTerminal.CursorLineColumn(1,1)
	goTerminal.SetSGR(goTerminal.Reset)
	size, _ = goTerminal.Size()
	blank = strings.Repeat(" ", size.Y)
	reader := bufio.NewReader(os.Stdin)
	fmt.Println("몇 번 반복할까요?")
	text, _ := reader.ReadString('\n')
	text = text[:len(text) - 1]
	multiplation, _ := strconv.Atoi(text)
	startTime = time.Now()
	fmt.Println("START")
	const directory = "./DictJson"
	dir, _ := os.ReadDir(directory)
	all := make([]Dict, len(dir))
	fmt.Println("Read Files...")
	for index, file := range dir {
		all[index] = GetDictFromFile(directory + "/" + file.Name())
	}
	done = 0
	max = all[0].Channel.Total * multiplation
	avgTime = make([]int, len(all))
	fmt.Println("Learning...")
	for i := 0; i <= multiplation; i++ {
		var wg sync.WaitGroup
		wg.Add(len(all))
		for index, dict := range all {
			go dictLearn(dict, &wg, index)
		}
		wg.Wait()
	}
}
func dictLearn(dict Dict, wg *sync.WaitGroup, index int) {
	mongo := NewMongo()
	items := dict.Channel.Items
	startTime = time.Now()
	for _, item := range items {
		word := item.WordInfo.Word
		for _, posInfo := range item.WordInfo.PosInfos {
			if(posInfo.Pos != "명사" && posInfo.Pos != "형용사" && posInfo.Pos != "동사") {
				continue
			}
			for _, commPatternInfo := range posInfo.CommPatternInfo {
				for _, senseInfo := range commPatternInfo.SenseInfo {
					def := senseInfo.Definition
					kiwi := execKiwi(def)
					words := make([]string, len(kiwi)+1)
					for index, kiwiString := range kiwi {
						words[index] = kiwiToString(kiwiString)
					}
					words[len(kiwi)] = word
					allComb(strToWords(words, &mongo), &mongo)
				}
			}
		}
		done++
		go update(index)
	}
	wg.Done()
}

func execKiwi(text string) []string {
	cmd := exec.Command("python3", "./kiwi.py", text)
	result, _ := cmd.Output()
	words := strings.Split(string(result), "\n")
	words = words[:len(words) - 2]
	return words
}

func allComb(words []Word, mongo *Mongo) {
	for index, word := range words {
		for _, w := range words[index+1:] {
			mongo.WordComb(word, w)
		}
	}
}

func kiwiToString(kiwiData string) string {
	data := strings.Split(kiwiData, " ")
	if data[1] == "VA" || data[1] == "VV" {
		data[0] += "다"
	}
	return data[0]
}

func strToWords(words []string, mongo *Mongo) []Word {
	returnWords := make([]Word, len(words))
	for index, element := range words {
		returnWords[index] = mongo.FindOne(element)
	}
	return returnWords
}

func update(index int) {
	now := time.Now()
	duration := now.Sub(startTime)
	startTime = now
	avgTime[index] = int(duration / time.Millisecond)
	rest := max - done
	sum := 0
	for _, time := range avgTime {
		sum += time
	}
	avg := sum / len(avgTime)
	maybe := time.Duration(avg * rest) * time.Millisecond
	goTerminal.CursorColumn(1)
	fmt.Print(blank)
	goTerminal.CursorColumn(1)
	fmt.Print(fmt.Sprintf("%d / %d 학습 중... (약", done, max), maybe, "남음)")
}