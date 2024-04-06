import streamlit as st
import requests
import json
from audio2audio import transcribing_audio2text, transcribing_text2audio
from streamlit_mic_recorder import mic_recorder

# Config the whole app
st.set_page_config(
    page_title="Conversation Partner",
    page_icon="🧊",
    layout="wide",  # initial_sidebar_state="expanded",
)

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
        with st.expander("See explanation"):
            st.write(convo["questions"])

        # question = st.selectbox(
        #     "Pick your first question:", convo["questions"]
        # )
        st.write(f"Your first question is: {convo['questions'][0]['questionInTargetLanguage']}")
        transcribed_audio = transcribing_text2audio(
            convo["questions"][0]["questionInTargetLanguage"]
        )
        st.audio(transcribed_audio)
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
            st.write("Your recording:")
            st.audio(audio["bytes"])
    
            response = transcribing_audio2text(audio["bytes"])
            st.write(f"\nTranscribed text: {response}\n")
            transcribed_text = transcribing_audio2text(transcribed_audio)


if __name__ == "__main__":
    main()
