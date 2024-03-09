# Ohjelmistotuotantoprojekti 1 - Music Recommendation System

## Vaatimukset

- [Python](https://www.python.org/downloads/)
- SQL tietokanta (e.g. [MySQL](https://dev.mysql.com/downloads/installer/), [PostgreSQL](https://www.postgresql.org/download/), [SQLite](https://www.sqlite.org/download.html))
- Luotu SQL tietokanta nimeltä *music_recommender*
- Spotify tili [Spotify](https://www.spotify.com/)
- Spotify API käyttäjätunnukset [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)

## Kehitysympäristö - Backend

### Asenna [Python](https://www.python.org/downloads/)

### Asenna python paketit, tähän on kaksi tapaa:

  1. Suorita nämä komennot backend kansiosta:

  - Windows:  

    ```cmd
    python -m venv venv
    venv\Scripts\activate
    pip install -r requirements.txt
    ```
    
  - Ubuntu:
  
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    pip3 install -r requirements.txt
    ```

  2. Vaihtoehtoisesti:

  - Windows:  

    ```cmd
    python setup.py
    ```
  
  - Ubuntu:
    ```bash
    python3 setup.py
    ```

#### Luo SQL tietokanta
  - Ydistä tietokantaan ja luo *music_recommender*:

    ```sql
    CREATE DATABASE music_recommender;
    ```

#### Luo spotify api käyttäjätunnukset
  - Mene [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and create a new app.
  - Määrittele app name ja description.
  - Lisää redirect URIs: http://127.0.0.1:8000/api/spotify/callback/
  - APIs used: Web API.

#### Luo ympäristömuuttujat

- Luo .env tiedosto backend kansioon ja lisää seuraavat muuttujat:

  ```bash
  SPOTIFY_CLIENT_ID=your_spotify_client_id
  SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
  DB_ADMIN=your_db_admin
  DB_HOST=your_db_host
  DB_PASSWORD=your_db_password
  DJANGO_ENV=production
  ```

  Korvaa placeholderit omilla tiedoillasi.

### Install `direnv` (VALINNAINEN)

- Luo .envrc tiedosto backend kansioon ja lisää nimi rivit:

  ```bash
  # Activate the virtual environment
  if [ -d "venv" ]; then
      if [ -f "venv/bin/activate" ]; then
          source venv/bin/activate
      elif [ -f "venv/Scripts/activate" ]; then
          source venv/Scripts/activate
      fi
  fi
  ```

  Ubuntu:
    ```bash
    sudo apt install direnv
    ```
  MacOS:
    ```bash
    brew install direnv
    ```

  Aja nämä komennot backend kansiosta:
    ```bash
    nano ~/.bashrc
    ```
    Lisää seuraava rivi tiedoston loppuun:
    ```bash
    eval "$(direnv hook bash)"
    ```
    Tallenna ja sulje tiedosto. Ajaa seuraavat komennot:
    ```bash
    source ~/.bashrc
    direnv allow
    ```

### Kehitysympäristö - Frontend  
- Luo .env.development tiedosto frontend kansioon ja lisää seuraavat muuttujat:

  ```bash
  REACT_APP_BASE_URL=http://127.0.0.1:8000
  ```

- Aja nämä komennot frontend kansiosta:  
  ```bash
  npm install
  ```

### Käyttöohjeet - Backend

- Suorita kaikki tarvittavat migraatiot:
  ```bash
  python manage.py makemigrations
  ``` 

- Lisää muutokset tietokantaan:
  ```bash
  python manage.py migrate
  ```

- Käynnistä palvelin:
  ```bash
  python manage.py runserver
  ```

- Aja testit:
  ```bash
  python manage.py test
  ```

- Luo testi kattavuusraportti:
  ```bash
  coverage html
  ```

### Käyttöohjeet - Frontend

- Käynnistä sovellus:
  ```bash
  npm start
  ```

- Luo tuotantoversio:
  ```bash
  npm run build
  ```

## Dokumentaatio
- Swagger dokumentaatio löytyy osoitteesta http://127.0.0.1:8000/api/swagger kun palvelin on käynnissä.

- Muu dokumentaatio löytyy [documentation](./documentation) kansiosta.

## Ohjelmoijat
- Mamadou Balde
- Sami Paananen
- Vladimir Piniazhin
- Ivan Semenov