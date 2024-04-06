import streamlit as st
from audio2audio import transcribing_audio2text, transcribing_text2audio

from streamlit_mic_recorder import mic_recorder

# Config the whole app
st.set_page_config(
    page_title="Conversation Partner",
    page_icon="🧊",
    layout="wide",  # initial_sidebar_state="expanded",
)


def main():
    st.title("Conversation Partner")
    st.write(
        "This is a conversation generator that will help you practice your conversation skills"
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
        st.write('Your recording:')
        st.audio(audio["bytes"])

        response = transcribing_audio2text(audio["bytes"])
        st.write(f"\nTranscribed text: {response}\n")
        response = transcribing_text2audio(response)
        st.write('Generated audio:')
        st.audio(response)


if __name__ == "__main__":
    main()
