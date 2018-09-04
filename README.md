# React GraphQL Chat
Small App with sole point to touch onto connecting React with GraphQL.

## Project structure
This project is divided into client and server application.  
Both applications use their own env variables and scripts.

## Project setup
To setup the project you will need to do the following steps:
 - Install dependencies with `npm install` in both client and server folders
 - Create a `.env` file in both folders and copy parameters from `.env.example` files
 - Set `PORT` parameter value for `.env` file in server folder
 - Run server with `npm run dev`
 - Use URLs that are logged out in console to set `SERVER_URL` and `SUBSCRIPTION_URL` in `.env` file in client folder
 - Set `PORT` parameter value for `.env` file in client folder
 - Run client with `npm run dev`

## Production
This project was made purely for research purposes, and of course fun, it's not really meant to be used for anything serious.  
If you're brave/insane enough to actually run this in production mode,  
client enables building and running a production build, but server will need some work.
