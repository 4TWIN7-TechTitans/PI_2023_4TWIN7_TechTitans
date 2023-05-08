from pysentimiento import create_analyzer

emotion_analyzer = create_analyzer(task="sentiment", lang="en")

print(emotion_analyzer.predict("good car decision  , the expert was kind"))
print(emotion_analyzer.predict("total scam fuck the expert the fucked me over"))
print(emotion_analyzer.predict("did his job and nothing else"))

