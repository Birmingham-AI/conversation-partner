from streamlit_mic_recorder import speech_to_text
import streamlit as st
import requests
import json
import io


@st.cache_data
def initializing_convo(name: str , skillLevel: str, language: str, age: int, interests: str) -> str:

    url = "http://localhost:3000/generateConversation"

    payload = json.dumps(
        {
            "name": name,
            "skillLevel": skillLevel,
            "language": language,
            "age": age,
            "interests": interests,
        }
    )
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", url, headers=headers, data=payload)

    return response.json()


def main():
    st.title("Welcome to the conversation generator")
    st.write("This is a conversation generator that will help you practice your conversation skills")
    st.write("Please fill out the following information to know more about you!")
    col1, col2 = st.columns(2)  # ([2, 1])
    with col1:
        name = st.text_input("Name")
        age = st.number_input("Age")
    with col2:
        skillLevel = st.selectbox(
            "Skill Level", ["Beginner", "Intermediate", "Advanced"]
        )
        language = st.selectbox(
        "Language",
        [
            "English",
            "Spanish",
            "French",
            "German",
            "Italian",
            "Portuguese",
            "Russian",
            "Chinese",
            "Japanese",
            "Korean",
            "Telugu",
            "Hindi",
        ],
    )
    interests = st.text_input("list some Interests")

    if st.button("Start Conversation"):
        convo = initializing_convo(name, skillLevel, language, age, interests)
        st.write(":sunglasses: Your Summary: ")
        st.write(convo['summary'])
        st.write(convo["questions"])


if __name__ == "__main__":
    main()
