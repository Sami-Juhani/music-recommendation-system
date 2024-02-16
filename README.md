# Ohjelmistotuotantoprojekti 1 - ryhmä 8 - Music recommendation system

## Kehitysympäristö

### Backend

- Install [Python](https://www.python.org/downloads/)

- Run the commands in your backend directory:

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

  OR (a script is provided which does the same thing)

  - Windows:  

    ```cmd
    python setup.py
    ```
  
  - Ubuntu:
    ```bash
    python3 setup.py
    ```

- Create .envrc file in the backend folder and add these lines:

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

- Install `direnv`

  - Ubuntu:
    ```bash
    sudo apt install direnv
    ```
  - MacOS:
    ```bash
    brew install direnv
    ```

- Run the commands in your backend directory:
  ```bash
  nano ~/.bashrc
  ```
  Add the following line to the end of the file:
  ```bash
  eval "$(direnv hook bash)"
  ```
  Save and exit the file. Then run the following commands:
  ```bash
  source ~/.bashrc
  direnv allow
  ```

#### Useful django commands

- Run the command to create a new Django project:

  ```bash
  django-admin startproject music_recommendation_system
  ```

- Run the command to create a new Django app:
  ```bash
  python manage.py startapp user_management
  ```

- To create a new migration after model changes:

  ```bash
  python manage.py makemigrations
  ``` 

- To apply migrations:
  ```bash
  python manage.py migrate
  ```

- To run server:

  ```bash
  python manage.py runserver
  ```

### Frontend  

- Run the commands in your frontend directory:  

  ```bash
  npm install
  ```

## Käyttöohjeet

### Backend

### Frontend

## Dokumentaatio

## Ohjelmoijat
- Mamadou Balde
- Sami Paananen
- Vladimir Piniazhin
- Ivan Semenov
# Ohjelmistotuotantoprojekti 1 - ryhmä 8 - Music recommendation system

## Kehitysympäristö

### Backend

- Install [Python](https://www.python.org/downloads/)

- Run the commands in your backend directory:

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

  OR (a script is provided which does the same thing)

  - Windows:  

    ```cmd
    python setup.py
    ```
  
  - Ubuntu:
    ```bash
    python3 setup.py
    ```

- Create .envrc file in the backend folder and add these lines:

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

- Install `direnv`

  - Ubuntu:
    ```bash
    sudo apt install direnv
    ```
  - MacOS:
    ```bash
    brew install direnv
    ```

- Run the commands in your backend directory:
  ```bash
  nano ~/.bashrc
  ```
  Add the following line to the end of the file:
  ```bash
  eval "$(direnv hook bash)"
  ```
  Save and exit the file. Then run the following commands:
  ```bash
  source ~/.bashrc
  direnv allow
  ```

#### Useful django commands

- Run the command to create a new Django project:

  ```bash
  django-admin startproject music_recommendation_system
  ```

- Run the command to create a new Django app:
  ```bash
  python manage.py startapp user_management
  ```

- To create a new migration after model changes:

  ```bash
  python manage.py makemigrations
  ``` 

- To apply migrations:
  ```bash
  python manage.py migrate
  ```

- To run server:

  ```bash
  python manage.py runserver
  ```

### Frontend  

- Run the commands in your frontend directory:  

  ```bash
  npm install
  ```

## Käyttöohjeet

### Backend

### Frontend

## Dokumentaatio

## Ohjelmoijat
