# Микросервис «Account» | SIBSUTIS-STUDENT-API

Микросервис «Account» представляет собой часть системы, отвечающую за манипуляции с пользователями.
С помощью этого микросервиса можно создавать, обновлять, просматривать и удалять учётные данные пользователей,
а также получать информацию о них.







POST /create-user:
    201 Created:
    {
        "firstname": "Иван",
        "lastname": "Иванов",
        "email": "ivanivanov@example.ru",
        "password": "password123",
        "groupID": 1,
        "courseID": 2
    }

    409 Conflict:
    {
        "firstname": "Иван",
        "lastname": "Иванов",
        "email": "ivanivanov@example.ru",
        "password": "password123",
        "groupID": 1,
        "courseID": 2
    }

    500 Internal Server Error:
    {
        "firstname": "Иван",
        "lastname": "Иванов",
        "email": "ivanivanov@example.ru",
        "groupID": 1,
        "courseID": 2
    }