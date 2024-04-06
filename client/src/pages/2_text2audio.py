import streamlit as st
import requests
import json

def main(text: str):

    url = "http://localhost:3000/convertTextToAudio"

    payload = json.dumps(
        {"text": text}
    )
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", url, headers=headers, data=payload)
    st.audio(response.content)

    # st.audio(response.text)

if __name__ == "__main__":
    st.title("Text to Audio")
    st.write(
        "This is a text to audio converter that will help you practice your pronunciation"
    )
    text = st.text_input("Please enter the text you want to convert to audio")
    if text:
        main(text)
