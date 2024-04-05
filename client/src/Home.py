import streamlit as st

# Config the whole app
st.set_page_config(
    page_title="Conversation Partner",
    page_icon="🧊",
    layout="wide",  # initial_sidebar_state="expanded",
)

# Title
st.title("Conversation Partner")
st.write(
    "This is a conversation generator that will help you practice your conversation skills"
)
