FROM python:3.11

WORKDIR /app

RUN pip install streamlit-mic-recorder requests

COPY . .

EXPOSE 8501
EXPOSE 3000

CMD ["streamlit", "run", "src/Home.py"]
