# party-games-platform

## Opis

Projekt grupowy stworzony na zaliczenie zajęć o nazwie "Projekt zespołowy".

Platforma umożliwia tworzenie oraz granie w zespołowe quizy.

### Zasada działania
"Host" zaczyna grę i po dołączeniu graczy wyświetla pytania, na które gracze odpowiadają na swoich urządzeniach. 

## Cechy
- Dołączenie do gry na podstawie wygenerowanego automatycznie kodu PIN
- Zabezpieczone logowanie
- Formularz do tworzenia gier
- Mobilny widok dla graczy
- Widok hosta
- Własne modele danych i API do obsługi serwisu

### Technologie
- #### Backend
  - MongoDB
  - Redis(cache)
  - Java Spring Boot
  - Websockets

- #### Frontend
  - ReactJS
  - Tailwind
  - Cookies
  - Websockets
 
### Dalszy rozwój
W przyszłości na platformie będzie można stworzyć i zagrać także w bardziej skomplikowane gry na kształt gier planszowych

## Start
### Wymagania
- [Docker](https://docs.docker.com/desktop/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git/)

### Instalacja

Do uruchomienia potrzebny jest także plik .env ze zmiennymi środowiskowymi potrzebnymi do konfiguracji poszczególnych elementów platformy.
W repozytorium znajduje się przykładowy plik .env-example


- Ścieżka do folderu z danymi:
```
MONGO_DATA_HOST_PATH
MONGO_LOG_HOST_PATH
REDIS_DATA_HOST_PATH
```

- Nazwy kontenerów:
```
BACKEND_NAME
FRONTEND_NAME
NETWORK_NAME
```
- Konfiguracja baz:
```
# mongodb
MONGO_AUTO_INDEX_CREATION
MONGO_ROOT_USERNAME
MONGO_ROOT_PASSWORD
MONGO_DB
# redis
REDIS_GENERATE
```

#### Komendy potrzebne do pobrania, zainstalowania i uruchomienia

```
git clone https://github.com/srychert/party-games-platform.git
cd party-games-platform
#stworzenie pliku .env na wzór pliku .env-example znajdującego się w repozytorium
docker-compose --env-file ".env" up -d
```

## Współtwórcy

<a href="https://github.com/srychert/party-games-platform/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=srychert/party-games-platform" />
</a>



