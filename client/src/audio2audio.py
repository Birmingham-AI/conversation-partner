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


def analyze_user_response():
    url = "http://localhost:3000/analyzeUserResponse"

    payload = json.dumps(
        {
            "dialogue": {
                "questionInTargetLanguage": "¿Cómo estás hoy?",
                "questionInEnglish": "How are you today?",
                "summary": "This question builds on the simplicity of the first by requiring more than a numeric response and begins to engage with personal feelings, allowing for practice of different states of being.",
                "userResponse": "Estoy bien. Perro, soy un poco cansado hoy. No me dormir muy bien fue noche.",
                "analysis": "",
            }
        }
    )
    headers = {"Content-Type": "application/json"}

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.text
