
import sys
from pysentimiento import create_analyzer

emotion_analyzer = create_analyzer(task="sentiment", lang="en")

print(emotion_analyzer.predict(sys.argv[1]))
