# Проект: STELLAR BURGERS
## Сосин Николай

### Обзор

* Интро
* Технологии
* Проблемы и сложности
* Дальнейшие планы по проекту
* Figma
* GitHub Pages

**Интро**

Это проект космической бургерной, в которой есть возможность перетаскивать ингредиенты из списка и менять их местами, составляя собственный космический бургер.
В проекте используются как готовые компоненты из сторонних библиотек, так и пользовательские компоненты, собранные с нуля, настроены роутинг и авторизация.
Все страницы проекта созданы по готовому макету в Фигме.

Проект реализован поэтапно:

1 этап - создание пользовательских компонентов и отрисовка базовых страниц, настройка drag-n-drop

2 этап - перенос состояние в стейт-менеджер

3 этап - роутинг и авторизация, сокет-соединение

4 этап - рефакторинг проекта на TypeScript


**Технологии**

* Проект создан с помощью create-react-app
* Настроен механизм перетаскивания элементов с использованием библиотеки dnd
* Для хранения состояния используется Redux
* Добавлены защищенные и незащищенные маршруты, возможность регистрации, авторизации, восстановления пароля и изменения данных пользователя
* Установлено сокет-соединение для просмотра изменений в режиме реального времени

**Проблемы и сложности**

Наибольшую сложность на всех итерациях вызвала концепция хранения глобального состояния приложения с использованием стейт-менеджера.
Вырос уровень абстракции, усложнилась и сильно разрослась структура проекта - и стало сложно понимать, что происходит при простых действиях пользователя там, где требуется обратиться к состоянию.
Верстка с использованием Реакта и JSX мало чем отличаются от нативной, тут проблем не возникло от слова совсем. Скорее даже наоборот, деструктуризация проекта на отдельные компоненты облегчает задачу и заставляет лишний раз задуматься, а что еще можно было бы переиспользовать.
Роутинг и вся магия редиректов тоже оказались интуитивно понятны.
Типизация компонентов и хранилища помогла выявить слабые места проекта и избежать потенциальных ошибок в коде.

**Дальнейшие планы по проекту**

В дальнейшем планируется перевести проект на Redux Toolkit

**Figma**
* [Ссылка на макет в Figma](https://www.figma.com/file/ocw9a6hNGeAejl4F3G9fp8/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8-(3-%D0%BC%D0%B5%D1%81%D1%8F%D1%86%D0%B0)_external_link?type=design&node-id=6291-2799&mode=design&t=4JSau1V2cyOd8Bcq-0)

**GitHub Pages**
* [Ссылка на проект в GitHub Pages](https://nmsosin.github.io/react-burger/)