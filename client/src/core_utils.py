import requests
import json
import os

def transcribing_audio2text(audio: bytes) -> str:
    with open("audio.wav", "wb") as f:
        f.write(audio)
    url = "http://host.docker.internal:3000/convertAudioToText"

    files = {"file": open("audio.wav", "rb")}
    data = {'key': 'value'}
    response = requests.post(url, files=files, data=data)

    os.remove("audio.wav")
    return response.text


def transcribing_text2audio(text: str):

    url = "http://host.docker.internal:3000/convertTextToAudio"

    payload = json.dumps({"text": text})
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", url, headers=headers, data=payload)
    return response.content


def analyze_user_response(convo):
    url = "http://host.docker.internal:3000/analyzeUserResponse"

    payload = json.dumps(
        {
            "dialogue": convo
        }
    )
    headers = {"Content-Type": "application/json"}

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.text

