<div align='center'>
  <img src='./assets/main_logo.png' />
</div>

<div align='center'>
  <h1>SIBSUTIS-STUDENT-API</h1>
  <p>API для мобильного приложения, реализующего функционал личного кабинета студента СибГУТИ, на основе микросервисной архитектуры.</p>
</div>

## О проекте

Этот репозиторий содержит API, построенное по микросервисной архитектуре с использованием Node.js и TypeScript. Архитектура спроектирована таким образом, чтобы быть масштабируемой, поддерживаемой и легкой в развертывании. Каждый микросервис отвечает за определенную функциональность и взаимодействует с другими сервисами через HTTP.

## Архитектура

Архитектура состоит из следующих микросервисов:

* **Сервис пользователей (account)**: Управляет данными пользователей и аутентификацией.
* **Сервис расписания (schedule)**: Управляет данными о расписании занятий студентов.
* **Сервис обновления данных (update-data)**: Опрашивает API ВУЗа на предмет наличия обновлений и рассылает их другим сервисам.
* **Сервис-шлюз (gateway)**: Действует как API шлюз, маршрутизируя запросы к соответствующему микросервису.

## Предварительные требования

* NodeJS
* npm
* PostreSQL
* Docker (опционально для установки через Docker)
* Docker Compose (опционально для установки через Docker)

## Установка

### Ручная установка
1. Клонируйте репозиторий:
   ```sh
   git clone https://github.com/RipeCherries/sibsutis-student-api.git
   cd sibsutis-student-api
   ```
2. Установите зависимости для каждого микросервиса:
   ```sh
   cd account
   npm install

   cd schedule
   npm install

   cd update-data
   npm install

   cd gateway
   npm install
   ```
3. Настройте переменные окружения:
   
   Создайте файл .env в директории каждого сервиса и добавьте необходимые настройки. Пример находится в файле .env.example
5. Соберите микросервисы:
   ```sh
   cd account
   npm run build

   cd schedule
   npm run build

   cd update-data
   npm run build

   cd gateway
   npm run build
   ```
6. Запустите каждый микросервис:
   
   Внимание, очень важен порядок запуска
   ```sh
   cd account
   npm run start

   cd schdeule
   npm run start

   cd update-data
   npm run start

   cd gateway
   npm run start
   ```

### Установка через Docker
1. Клонируйте репозиторий:
   ```sh
   git clone https://github.com/RipeCherries/sibsutis-student-api.git
   cd sibsutis-student-api
   ```
2. Сборка и запуск Docker контейнеров:
   ```sh
   docker-compose up --build
   ```

## Доступ к API
После развётывания проекта сервис-шлюз будет доступен по адресу http://localhost:8000 (или настроенному порту).

## Документация API
Документация к эндпоинтам развёрнута на /docs с использованием swagger. Сообщение с адресом выводится в консоль при запуске микросервиса.
