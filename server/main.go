package main

import (
	"context"
	"encoding/base64"
	"fmt"

	"github.com/labstack/echo/v4"
	"oss.terrastruct.com/d2/d2graph"
	"oss.terrastruct.com/d2/d2layouts/d2elklayout"
	"oss.terrastruct.com/d2/d2lib"
	"oss.terrastruct.com/d2/d2renderers/d2svg"
	"oss.terrastruct.com/d2/d2themes/d2themescatalog"
	"oss.terrastruct.com/d2/lib/textmeasure"
)

func main() {
	fmt.Println("Hello World")
	server := echo.New()
	server.POST("/", func(c echo.Context) error {
		text := c.FormValue("code")
		graph := makeGraph(text[0 : len(text)-1])
		// fmt.Println("graph")
		b64 := base64.StdEncoding.EncodeToString(graph)
		c.Response().Header().Add("Access-Control-Allow-Origin", "*")
		return c.String(200, b64)
	})
	server.Logger.Fatal(server.Start(":8080"))
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
