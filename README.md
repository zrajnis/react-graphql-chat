# React GraphQL Chat
Small App with sole point to touch onto connecting React with GraphQL.

### To set up the project:  
 - Install dependencies with `npm install`
 - Run in development mode with `npm run dev`  

For development you will also need to install globally graphcool with `npm install -g graphcool` 

### Using graphcool:  
 - When you change the types, run `graphcool-framework deploy`  
 - Testing queries can be done in browser by running `graphcool-framework playground`

### Production  
This project was made purely for research purposes, and of course fun, it's not really meant to be used for anything serious.  
If you're brave/insane enough to actually run this in production mode, keep in mind the following:  
  - Current production scripts will enable building and serving the React code, but do not handle GraphQL  
  - Running in prod environment should be avoided until graphcools' free tier is replaced by either paid tier or by implementing your own server.  