import streamlit as st
import requests
import json
from core_utils import (
    transcribing_audio2text,
    transcribing_text2audio,
    analyze_user_response,
)
from streamlit_mic_recorder import mic_recorder

# Config the whole app
st.set_page_config(
    page_title="Conversation Partner",
    page_icon="🧊",
    layout="wide",  # initial_sidebar_state="expanded",
)


@st.cache_data
def initializing_convo(
    name: str, skillLevel: str, language: str, age: int, interests: str
) -> str:

    url = "http://host.docker.internal:3000/generateConversation"

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


def conversation_generator(question):
    transcribed_audio = None
    audio = None
    response = None
    analysis = None
    analysis_audio = None
    st.write(f"Your question is: {question['questionInTargetLanguage']}")
    transcribed_audio = transcribing_text2audio(question["questionInTargetLanguage"])
    st.audio(transcribed_audio)
    audio = mic_recorder(
        start_prompt="Start recording",
        stop_prompt="Stop recording",
        just_once=True,
        use_container_width=True,
    )
    if audio:
        st.write("Your recording:")
        st.audio(audio["bytes"])
        response = transcribing_audio2text(audio["bytes"])
        st.write(f"\nTranscribed text: {response}\n")

        question["userResponse"] = response
        st.write("Analysis:")
        with st.spinner("Analyzing user response..."):
            analysis = analyze_user_response(question)
            analysis_audio = transcribing_text2audio(analysis)
        st.audio(analysis_audio)  # 44100 samples per second)
        st.write(analysis)
    return None


def main():
    st.title("Welcome to the conversation generator")
    st.subheader("From Birmingham-AI")
    st.write(
        "This is a conversation generator that will help you practice your conversation skills"
    )
    st.write("Please fill out the following information to know more about you!")
    col1, col2 = st.columns(2)  # ([2, 1])
    with col1:
        name = st.text_input("Name")
        age = st.number_input("Age")
    with col2:
        skillLevel = st.selectbox(
            "Skill Level", ["", "Beginner", "Intermediate", "Advanced"]
        )
        language = st.selectbox(
            "Target Language",
            [
                "",
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

    # check if all fields are filled
    if name and age and skillLevel and language and interests:
        # All fields are filled
        # Continue with the rest of the code
        convo = initializing_convo(name, skillLevel, language, age, interests)
        st.subheader(":sunglasses: Your Summary ")
        st.write(convo["summary"])
        with st.expander("See example questions"):
            st.write(convo["questions"])
        st.subheader("Let's start the conversation!")
        question = st.selectbox("Select a question", [None] + convo["questions"])
        if question:
            conversation_generator(question)

    else:
        st.warning("Please fill out all the fields.")


if __name__ == "__main__":
    main()
