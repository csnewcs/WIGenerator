package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"os"
	"log"
	"net/http"

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
		text := c.FormValue("code")
		go addToDB(text)
		graph := makeGraph(text[0 : len(text)-1])
		b64 := base64.StdEncoding.EncodeToString(graph)
		if testing {
			os.WriteFile("test.svg", graph, 0644)
			os.WriteFile("test.txt", []byte(b64), 0644)
		}
		c.Response().Header().Add("Access-Control-Allow-Origin", origin)
		return c.String(200, b64)
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
func addToDB(text string) {
	//DB에 단어 조합을 거리 조절(벡터?)
}
func makeCombnation(texts []string) string {
	//단어 조합을 만들어서 리턴
	return ""
}
