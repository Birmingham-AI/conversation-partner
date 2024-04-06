import requests
import json

def transcribing_audio2text(audio: bytes) -> str:
    with open("audio.wav", "wb") as f:
        f.write(audio)
    url = "http://localhost:3000/convertAudioToText"

    files = {"file": open("audio.wav", "rb")}
    data = {'key': 'value'}
    response = requests.post(url, files=files, data=data)

    return response.text


def transcribing_text2audio(text: str):

    url = "http://localhost:3000/convertTextToAudio"

    payload = json.dumps({"text": text})
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", url, headers=headers, data=payload)
    return response.content

