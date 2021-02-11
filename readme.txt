node --version => v12.13.0 (Node version)
npm --version  => 6.12.0 (Npm version)

Using Vue CLI
Install Vue Cli globally:
>npm i -g @vue/cli or npm i -g vue-cli
>vue --version

Set a certificate if necessary:
>set NODE_EXTRA_CA_CERTS=d:\python\examples\heroku\ANFH-CA.cer

Create app 'sample-vue.js'
Using vue cli:
>vue init webpack sample-vue.js      -webpack is the template
It create a project directory with a package.json file with: scripts, devDependencies(35: babel, webpack...), engines, browserslist..
Ex: "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "node build/build.js"
    }
>cd sample-vue.js
sv>npm install
sv>code .
sv>npm run dev or npm run start
http://localhost:8081 , if 8080 is used
The port number is in config/index.js files

Install dependencies: bootstrap, font-awesome
>npm install bootstrap font-awesome --save
For our API calls(Spring Boot API), we will be using Axios. Others options are: Axios,Fetch,Superagent,React-axios,Use-http,React-request
Below is the npm command to install Axios
>npm install axios

For a fake Json server based on json file we can install json-server
>npm install json-server
Start JSON Server with json file as input:
>json-server --watch src\json\clients.json --port 3001
Then go to:
http://localhost:3001/clients

Import this styles globally in your Vue app entry file(src/main.js):
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

Project structure:
Folder src/components/clients with:
  client.service.vue
  client-liste.component.vue
  client-consult.component.vue
  client-fiche.component.vue
Folder src/components/shared with:
  header.component.vue
  footer.component.vue
  flash.messages.component.vue
Folder src/components/home with:
  welcome.component.vue
Folder src/assets with:
  messages.json
Folder src/json with:
  clients.json
Folder src/router with:
  index.js
Folder src with:
  mais.js  - mais app js
  App.vue  - main component

Configure Vue App Routing
To use Vue Router, you first have to install it using NPM(if not selected with vue init...)
>npm install vue-router
Then in the router file(index.js) import Vue, Router:
import Vue from 'vue'
import Router from 'vue-router'
and the components:
import ClientListeComponent from '@/components/clients/client-liste.component';
import ClientConsultComponent from '@/components/clients/client-consult.component';
import ClientFicheComponent from '@/components/clients/client-fiche.component';
import WelcomeComponent from '@/components/home/welcome.component'
Then we define the routes.

In Spring App:
Suport CORS in Spring App, add @CrossOrigin annotation to the rest controller to specify that calls will be made to this controller from different domains
(In our case we have specified that a call can be made form localhost:8081)
@CrossOrigin(origins = "http://localhost:8081")
@RestController

In Vue APP:
If you are using Json Server Npm module change the url in ClientService: 
const CLIENT_API_BASE_URL = "http://localhost:3001/clients" and let isJsonServer  = true;
For Spring Boot API
const CLIENT_API_BASE_URL = "http://localhost:8090/clients"; and let isJsonServer  = false;


A simple client for REST api in VueJS:
http://localhost:8081/clients                    HTTP GET         - get all clients
http://localhost:8081/clients/new                HTTP GET/POST    - create client
http://localhost:8081/clients/1                  HTTP GET         - consult client
http://localhost:8081/clients/1/edit             HTTP GET/POST    - edit client or PUT for Json Server ( modification)
http://localhost:8081/clients/1/delete           HTTP GET or HTTP DELETE for Json Server  - delete client

http://localhost:8081/welcome - test page

Using Concurrently with json-server and your Vue App
During the development of a Vue app, you will be running 'npm run dev' more times.
If you are working with json-server we run 'json-server --watch db.json' in one terminal then 'npm run dev' in another terminal.
Install: npm i -S concurrently
In the scripts section of our 'package.json' file, we’ll insert:
"json-server": "json-server --watch src/json/clients.json --port 3001"
and
"both": "concurrently \"npm run dev\" \"npm run json-server\""
We combined npm run dev and the json-server command into 'both' command:
Run: npm run both
You’ll see that your json-server is running on localhost:3001, and your vue app will open automatically.

Build for production:
>npm run build  - create the build files in 'dist' folder

Using Express(a server for our application, we need a script in JS to tell Express what to do, we call it server.js)
Install Express: npm i express -S
Create a server.js file(server http + json-server that use a json file). I use the port 8081 for Vue(http) and 3001(json-server)
I made a serverJson.js to open the json-server separatelly with: node serverJson.js, test to: http://localhost:3001/clients
For dev server: npm run dev then http://localhost:8081/clients
For production: npm run build
node server.js then go to: http://localhost:8081/clients
We can use a proxy in package.json
Ex: "proxy": "http://localhost:8081"

Optional using serve package(default port 5000):
npm install -g serve / npm uninstall -g serve 
serve -s build
http://localhost:5000/clients

Github:
git init
git add src/*
git add config/*
git add readme.txt
git add server.js
git add serverJson.js
git add index.html
git add package-lock.json
git add package.json
git add .*
git commit -m "first commit"
Connect it to github and create a new repository: sample-vue.js
git remote add origin https://github.com/danielvornicu/sample-vue.js.git
git push -u origin master

Deploy 'sample-vue.js' application on Heroku:
1.First of all, we need a server for our application and what we are going to use is the Express server.
Locally we run 'node server.js' from terminal to run our app on local browser.
Install il with:
   npm install express --save / npm i express -S
2. Now we need a script in JS to tell Express what to do, I like to call it server.js (in your project’s root directory)
Test That Everything is OK:
>npm run build  -build and create dist folder
>node server.js -lance the app
3.Change start command
In package.json, change the “start” command to node server.js so:
   "start": "npm run dev"  becomes:  "start": "node server.js"
We also can create a Procfile with: web: node server.js and leave "start": "npm run dev" 
We can add also Node and NPM engines that Heroku will use to run your application. 
Preferably, it should be same version you have on your machine.
So, run node -v and npm -v to get the correct version and include it in your package.json file like so:
"engines": {
    "node": "12.13.0",
    "npm": "6.12.0"
  }
  
Procfile
web: node server.js
api: node serverJson.js

heroku ps:scale web=1 api=1

Deploy 'sample-vue.js' application on GitHub Pages:
1. Create a vue.config.js file in the root directory of your Vue project and set publicPath in vue.config.js to our repository name
>touch vue.config.js
module.exports = {
  publicPath: '/sample-vue.js/'
}
2.Build your project using npm run build:
>npm run build
3.Run:
>git add dist 
>git commit -m "adding dist subtree"
This commits our changes to the master branch so that we can create a dist subtree in the next step. Make sure that dist is not included in your .gitignore file
4.Now deploy it to GitHub Pages
>git subtree push --prefix dist origin gh-pages
This step makes gh-pages a subtree of our master branch. The prefix option specifies the folder that we want for our the subtree. 
If we take a look at our gh-pages branch, we will see that it is equivalent to being the root of the dist folder
5. Go to: https://danielvornicu.github.io/sample-vue.js/ then click to header 'Liste des Clients (version Vue JS)' to redirect to
https://danielvornicu.github.io/clients

Deploy 'sample-vue.js' application on Surge:
1.install Surge globally:
>npm install --global surge
2.Build your project using npm run build:
>npm run build
3.Now, run surge from within any directory, to publish that directory onto the web.
>cd dist
Set a certificate if necessary:
>set NODE_EXTRA_CA_CERTS=d:\python\examples\heroku\ANFH-CA.cer
>surge enter email and password and domain: sample-crud-vue-js.surge.sh
Go to generated domain: sample-crud-vue-js.surge.sh

Shorthand usage:
  surge [project path] [domain]

Additional commands:
  surge whoami        show who you are logged in as
  surge logout        expire local token
  surge login         only performs authentication step
  surge list          list all domains you have access to
  surge teardown      tear down a published project



  


