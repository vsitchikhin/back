# Сервер для мобильного приложения

> ## Для запуска сервера необходимо:
> 1. Выполнить `npm install`
> 2. Создать файл `.env`
> 3. Создать базу данных
> 4. Записать в этот файл данные для подключения к базе следующего вида:
> `DATABASE=
   DB_USER=
   DB_HOST=
   DB_PASSWORD=`
> После знака `=` без пробелов и кавычек задать данные для своей базы
> 5. Запустить файл ***hashSalt.js*** командой `node hashSalt`
> 6. Скопировать вывод из консоли и вставить его в `.env` как: `SALT=` также без пробелов и кавычек
> 7. Запустить сервер командой `node index`