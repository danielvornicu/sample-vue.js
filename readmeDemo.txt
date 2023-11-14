Create Vue project from scratch with Webpack
https://github.com/vietcuongk99/vue3-from-scratch

node --version => v21.1.0 (Node version)
npm --version  => 10.2.0 (Npm version)

Create a new package.json with:
npm init 
 
Optional we can create a complete vue project with: npm init vue@latest (with all options)

1.Install and bundle project with Webpack

Install Webpack with the two packages above:
npm install webpack webpack-cli webpack-dev-server
webpack             - package itself, used to bundle, modularize and resolve JS dependences
webpack dev server  - dev server support hot loading
webpack-cli         - cli tool for webpack commands


Create webpack config file(webpack.config.js) for project on root folder with: entry, output and devServer

When we launch the project, Webpack reads ./src/main.js and generates bundle.js inside ./dist folder. 
Also, the configuration of devServer is used when we run the project on the dev server.

We initialize the folder src and create ./src/main.js file with the following content:
console.log('Hello World');

To compile project, we add some scripts to package.json file:
{
  "scripts": {
    "dev": "webpack serve",
    "build": "webpack --mode production --progress --hide-modules"
  }
}
Finally, we create a simple HTML file(index.html) inside /dist folder with script tag attached to bundle.js file.
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>TITLE HERE</title>
  </head>
  <body>
    <script src="./bundle.js"></script>
  </body>
</html>

Then run:
npm run dev

Open your browser and go to:
http://localhost:8090/
The port for devServer was changed in webpack.config.js to 8090 (default 8080)

2.Install and use Vue
Install latest Vue version for your project:
npm install --save vue@next
Install vue-loader( is a loader for webpack, allow us to create file .vue and load it)
npm install --save vue-loader

Next, we need to add vue-loaderconfig for webpack.config.js:
module: {
  rules: [
    // ... other rules
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    }
  ]
},
plugins: [
  // make sure to include the plugin!
  new VueLoaderPlugin()
]

We will update file ./src/main.js with new content below:
import { createApp } from 'vue';
import App from './App.vue'
createApp(App).mount('#app')

So, every Vue app starts by creating a new instance with createApp method provided by vue.
The object that we pass to createApp is actually a component. Every Vue app needs a root component, that can contain other components as its child when extending the project.
In real world examples, Vue projects has many components, which are organized as tree.
The parameter passed to 'mount()' method can be a DOM element or selectorstring

Run npm run dev command on cmd



