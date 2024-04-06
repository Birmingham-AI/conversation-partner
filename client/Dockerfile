FROM python:3.11

WORKDIR /app

RUN pip install streamlit-mic-recorder

COPY . .

EXPOSE 8501

CMD ["streamlit", "run", "src/Home.py"]
