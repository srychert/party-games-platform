# party-games-platform

[![en](https://img.shields.io/badge/lang-en-blue.svg)](https://github.com/srychert/party-games-platform/blob/main/README.md)
[![pl](https://img.shields.io/badge/lang-pl-red.svg)](https://github.com/srychert/party-games-platform/blob/main/README.pl.md)

Internetowa platforma umożliwiająca tworzenie, przeglądanie oraz granie w gry przeglądarkowe. Umożliwia rozgrywkę wielu użytkownikom naraz w czasie rzeczywistym dzięki wykorzystaniu pokojów WebSocketowych.

![party-games-platform](https://github.com/srychert/party-games-platform/assets/83415215/9cd1eaa3-accd-41e9-8ae7-6505f2c208fb)

## Cechy

-   Interaktywny kreator gier oparty na grafach stworzony przy użyciu biblioteki ReactFlow
-   Dołączanie do pokoju gry na podstawie automatycznie wygenerowanego kodu PIN
-   Rejestracja oraz logowanie
-   Możliwość gry anonimowej
-   Konfigurowalne elementy z ustawieniami domyślnymi (poziomy, przeciwnicy, przedmioty)
-   Opcja tworzenia oraz grania w proste quizy

### Technologie

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

## Instalacja

Zalecaną opcją instalacji projektu jest użycie narzędzia `docker compose`.

### Wymagania wstępne

-   Użytkownik musi mieć możliwość uruchamiania poleceń docker (bezpośrednio lub przez sudo).
-   Musisz mieć zainstalowaną aplikację docker compose.
-   Użytkownik musi mieć możliwość zmiany uprawnień do plików (bezpośrednio lub przez sudo).

### Kroki

-   Utworzyć plik `.env` w katalogu głównym projektu oraz zdefiniować wymagane zmienne. Jako szablon może posłużyć plik `.env-example`

-   Uruchomić projekt za pomocą komendy:

```bash
docker compose up -d
```

---

## Współtwórcy

<a href="https://github.com/srychert/party-games-platform/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=srychert/party-games-platform" />
</a>
