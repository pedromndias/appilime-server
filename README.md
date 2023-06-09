# appilime

## [See the App!](https://appilime.netlify.app/)

![App Logo](https://github.com/pedromndias/appilime-client/blob/main/src/assets/logo-with-name-02.png)

## Description

Productivity app with focus environment and task features like To-Dos List, Expenses tracker, Timer, Weather based on location, BTC and ETH crypto prices and a game. Depending on your mood, you can change the theme and all the app will show a different style and the music playlist will also change accordingly.

#### [Client Repo here](https://github.com/pedromndias/appilime-client)
#### [Server Repo here](https://github.com/pedromndias/appilime-server)

## Backlog Functionalities

In the future I would like to add a calculator and connect the Spotify API so the music playlist comes from there and not Youtube.

## Technologies used

HTML, CSS, Javascript, React, axios, React Context, Services, React Router, leaflet, iframe, React Player, React Spinners and React Hooks like useState, useEffect, useContext, useRef.

# Server Structure

## Models

User model

```javascript
{
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required."],
    },
    imageUrl: String,
    mood: {
        type: String,
        enum: ["focus", "lazy", "excited", "melancholic"],
        default: "focus"
    },
},
{
    timestamps: true,
}

```

List model

```javascript
{
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: 20
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
},
{
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
}
```

Todo model

```javascript
{
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: 25
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: "List"

    },
    isChecked: {
        type: Boolean,
        default: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"    
    }
},
{
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
}
```

Expense model

```javascript
{
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: 20
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    location: String,
    geoLocation: [Number],
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"    
    }
},
{
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
}
```

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/auth/signup`              | {username, email, password}      | 201            | 400          | Registers the user in the Database                             |
| POST        | `/auth/login`               | {username, password}         | 200            | 400          | Validates credentials, creates and sends Token                 |
| GET         | `/auth/verify`              |                              | 200            | 401          | Verifies the user Token                                        |
| GET         | `/lists`                     |                              | 200            | 400          | Get all ToDos Listss                   |
| POST        | `/lists/create`                     | {name}                      | 201            | 400          | Gets details from the Frontend and creates a ToDo List                                    |
| GET         | `/lists/:todoListId`             |                              | 200            | 400, 401     | Send the Frontend details of a ToDo List                                         |
| PUT         | `/lists/:todoListId`             |           {name}              | 200            | 400, 401     | Gets data from a ToDo List and updates its name                                            |
| DELETE      | `/lists/:todoListId`             |                              | 200            | 401          | Deletes a ToDo List by its Id                                          |
| GET      | `/todo/:todoListId`             |                              | 200            | 401          | Get all the Todos                                          |
| POST      | `/todo/:todoListId`             |                {name}              | 200            | 401          | Adds a single ToDo to the DB and sends it to the Frontend                                          |
| PATCH      | `/todo/:todoId`             |                {isChecked}              | 200            | 401          | Gets the Id of a single ToDo and changes the isChecked property                                          |
| DELETE      | `/todo/:todoListId`             |                              | 200            | 401          | Delete all single ToDos that is checked on that List                                          |
| GET         | `/profile`                  |                              | 200            | 401          | Sends user profile details                                     |
| PUT         | `/profile`                  |                  {username}            | 200            | 400, 401     | Gets data from the profile and updates the username                                         |
| PATCH         | `/profile`                  |                  {iamgeUrl}            | 200            | 400, 401     | Gets data from the profile and updates the User's profile picture                                         |
| GET      | `/main`          |                              | 200            | 401          | Shows the mood of a User                                      |
| PUT         | `/main`                  |                {mood}              | 200            | 401          | Gets the mood and updates
it in the User (and changes theme)                               |
 GET         | `/expenses`                     |                              | 200            | 400          | Get all Expenses                   |
| POST        | `/expenses/create`                     | {name, price, location}        | 201            | 400          | Gets details from the Frontend and creates an Expense                                    |
| GET         | `/expenses/:expenseId`             |                              | 200            | 400, 401     | Send the Frontend details of an Expense                                         |
| PUT         | `/expenses/:expenseId`             |           {name, price, location}         | 200            | 400, 401     | Gets data from an Expense and updates it                                           |
| DELETE      | `/expenses/:expenseId`             |                              | 200            | 401          | Deletes an Expense by its id                           
| DELETE      | `/expenses/`             |                              | 200            | 401          | Deletes all Expenses                            
  
## Links



### Project

[Repository Link Client](https://github.com/pedromndias/appilime-client)

[Repository Link Server](https://github.com/pedromndias/appilime-server)

[Deploy Link](https://appilime.netlify.app/)

### Trello

[Link to your trello board](https://trello.com/b/ML2qaUGw/project-3)

### Slides

[Slides Link](www.your-slides-url-here.com)