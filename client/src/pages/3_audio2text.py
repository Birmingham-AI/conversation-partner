import streamlit as st
import requests
import io
from streamlit_mic_recorder import mic_recorder


def transcribing_audio(audio: bytes) -> str:
    with open("audio.wav", "wb") as f:
        f.write(audio)
    url = "http://localhost:3000/convertAudioToText"

    files = {"file": open("audio.wav", "rb")}
    data = {'key': 'value'}
    response = requests.post(url, files=files, data=data)

    return response.text

def main():
    st.title("Audio to Text")
    st.write(
        "This is an audio to text converter that will help you practice your pronunciation"
    )
    audio = mic_recorder(
        start_prompt="Start recording",
        stop_prompt="Stop recording",
        just_once=False,
        use_container_width=False,
        callback=None,
        args=(),
        kwargs={},
        key=None,
    )

    if audio:

        st.audio(audio["bytes"])

        response = transcribing_audio(audio["bytes"])

        # url = "http://localhost:3000/convertAudioToText"

        # files = {"file": open("audio.wav", "rb")}
        # data = {'key': 'value'}
        # response = requests.post(url, files=files, data=data)

        st.write(response)


if __name__ == "__main__":
    main()
