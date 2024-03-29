package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/labstack/echo/v4"
	"oss.terrastruct.com/d2/d2graph"
	"oss.terrastruct.com/d2/d2layouts/d2elklayout"
	"oss.terrastruct.com/d2/d2lib"
	"oss.terrastruct.com/d2/d2renderers/d2svg"
	"oss.terrastruct.com/d2/d2themes/d2themescatalog"
	"oss.terrastruct.com/d2/lib/textmeasure"
)

func main() {
	args := os.Args[1:]
	mongo := NewMongo()
	testing := false
	origin := "https://wi.csnewcs.dev"
	if (len(args) == 0) {
		fmt.Println("Normal Mode(https, 443 port, sudo required)")
	} else if (args[0] == "test") {
		fmt.Println("Test Mode(http, 8080 port)")
		origin = "*"
		testing = true
	}
	server := echo.New()
	server.POST("/", func(c echo.Context) error {
		return mainPost(c, &mongo, origin)
	})
	server.POST("/find", func(c echo.Context) error {
		fmt.Println("find")
		return findClosest(c, &mongo, origin)
	})

	if testing {
		if err := server.Start(":8080"); err != http.ErrServerClosed {
			log.Fatal(err)
		}
	} else {
		if err := server.StartTLS(":443", "cert.pem", "key.pem"); err != http.ErrServerClosed {
			log.Fatal(err)
		}
	}
}

func mainPost(c echo.Context, mongo *Mongo, origin string) error {
	text := c.FormValue("code")
	go makeCombnation(text, mongo)
	graph := makeGraph(text[0 : len(text)-1])
	return returnGraph(c, graph, origin)
}

func findClosest(c echo.Context, mongo *Mongo, origin string) error {
	words := strings.Split(c.FormValue("words"), " ")
	comb := getClosestWords(words, mongo)
	
	command := ""
	for key, value := range comb {
		command += key + " <-> " + value + "\n"
	}
	graph := makeGraph(command[0 : len(command)-1])
	return returnGraph(c, graph, origin)
}

func returnGraph(c echo.Context, graph []byte, origin string) error {
	b64 := base64.StdEncoding.EncodeToString(graph)
	c.Response().Header().Add("Access-Control-Allow-Origin", origin)
	return c.String(200, b64)
}

func makeGraph(text string) []byte {
	ctx := context.Background()
	layout := func(ctx context.Context, g *d2graph.Graph) error {
		return d2elklayout.Layout(ctx, g, nil)
	}
	ruler, _ := textmeasure.NewRuler()
	diagram, _, _ := d2lib.Compile(ctx, text, &d2lib.CompileOptions{
		Layout:  layout,
		Ruler:   ruler,
		ThemeID: d2themescatalog.Aubergine.ID,
	})
	out, _ := d2svg.Render(diagram, &d2svg.RenderOpts{
		Pad: d2svg.DEFAULT_PADDING,	
	})
	return out
}


//AI
func makeCombnation(combString string, mongo *Mongo) { // 단어 조합을 DB에 등록
	for _, words := range strings.Split(combString, "\n") {
		split := strings.Split(words, " <-> ")
		word1 := mongo.FindOne(split[0])
		word2 := mongo.FindOne(split[1])
		mongo.WordComb(word1, word2)
	}
}

func getClosestWords(wordStrings []string, mongo *Mongo) map[string]string { // 가장 가까운 단어들을 찾아서 반환
	words := makeWords(wordStrings, mongo) // 단어들을 DB에서 찾기
	wordCombs := make(map[string]string)
	for _, word := range words { // 가까운 단어 찾기
		wordCombs[word.Word] = word.GetClosestWords(&words).Word
	}
	return wordCombs
}

func makeWords(words []string, mongo *Mongo) []Word { // 단어들을 DB에서 찾아서 반환
	returnWords := make([]Word, len(words))
	for i, word := range words {
		returnWords[i] = mongo.FindOne(word)
	}
	return returnWords
}
