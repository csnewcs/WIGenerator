package main
import (
	"fmt"
)
func main() {
	dict := GetDictFromFile("./DictJson/1097133_5000.json")
	fmt.Println(dict.Channel.Item[0].WordInfo.Word)
}