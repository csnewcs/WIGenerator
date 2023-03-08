import sys
from kiwipiepy import Kiwi
from kiwipiepy.utils import Stopwords
text = sys.argv[1]
kiwi = Kiwi(num_workers=2)
tokens = kiwi.tokenize(text)

result = ''
use = {'NNG', 'NR', 'NP', 'VV', 'VA'}
for token in tokens:
    if token.tag in use:
        result = result + token.form + ' ' + token.tag + '\n'
        
print(result)