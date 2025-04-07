# syntax=docker/dockerfile:1

FROM python:3.12.9-bookworm

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y curl

RUN curl -sSL https://install.python-poetry.org | python3 - && \
    export PATH="$PATH:$HOME/.local/bin" && \
    poetry config virtualenvs.in-project true && \
    poetry lock && \
    poetry install

ENV PATH="/root/.local/bin:$PATH"
EXPOSE 4333


CMD ["sh", "-c", "cd src/flask_docker && poetry run flask run --host=0.0.0.0 --debug --port=4333"]
