# party-games-platform

[![en](https://img.shields.io/badge/lang-en-blue.svg)](https://github.com/srychert/party-games-platform/blob/main/README.md)
[![pl](https://img.shields.io/badge/lang-pl-red.svg)](https://github.com/srychert/party-games-platform/blob/main/README.pl.md)

An online platform for creating, browsing and playing browser-based games. Allows multiple users to play at once in real time through the use of WebSocket rooms.

![party-games-platform](https://github.com/srychert/party-games-platform/assets/83415215/9cd1eaa3-accd-41e9-8ae7-6505f2c208fb)

## Features

-   Interactive graph-based game creator made with ReactFlow library
-   Joining a game room based on an automatically generated PIN code
-   Registration and login
-   Possibility of playing anonymously
-   Configurable elements with default settings (levels, opponents, items)
-   Option to create and play simple quizzes

### Technologies

-   #### Backend

    -   Java Spring Boot 3
    -   Websockets
    -   MongoDB
    -   Redis

-   #### Frontend

    -   ReactJS
    -   Tailwind
    -   Websockets
    -   Vite

### Instalation

The recommended option to install the project is to use the `docker compose` tool.

#### Prerequisits

-   Your user must be allowed to run docker commands (directly or via sudo).
-   You must have docker compose installed.
-   Your user must be allowed to change file permissions (directly or via sudo)

### Steps

-   Create a `.env` file in the project root directory and define the required variables. The `.env-example` file can be used as a template.

-   Run the project using the command:

```bash
docker compose up -d
```

---

## Contributors

<a href="https://github.com/srychert/party-games-platform/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=srychert/party-games-platform" />
</a>
