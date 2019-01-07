# Recap of week 1

## What is Node.js?

### General

Node.js (or node in short) allows you to create a server side application in JavaScript, a language which up until recently was only used for backend.

A server side application allows you to for example create your own API. This makes it so you can serve data from the database to an application.

To make the difference clear, you can have the frontend of an application, which will show data in a visual way. Node.js allows you to make an application that will provide that data to the frontend.

![image of backend](http://felixthea.com/wp-content/uploads/2014/04/Diagram-of-Fullstack.png "title")
in the image above, the backend is written in node (javascript), eventhough it is not in the picture.

The big benefits of Node.js is that you can write javascript, so you do not need to learn a different programming language.

It also allows for easy asynchronous programming (though you can work in a synchronous fashion!), which gives it a lot of flexibility.
See the [lecture section](https://github.com/HackYourFutureBelgium/Node.js/tree/master/week1#what-is-nodejs) for more information.

### installing Node.js

Depending on your platform, there are multiple ways to install Node.
First visit the [Node.js Download Section](https://nodejs.org/en/download/). Windows and MacOS have an installer, which makes it easy to install.

For Ubuntu:

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt install nodejs
```

then check the version with

```bash
node -v
```

this should show version 8.15.0 (or similar, but first nr should be 8).

### NPM

By default, Node.js comes with NPM. NPM Stands for Node Package Manager.

Fellow developers can make packages of code that are reusable. They can put these online on a registry (the NPM Registry), which then allows other developers to download these packages. This is done through NPM. an example of this is [chalk](https://www.npmjs.com/package/chalk)(a package that allows you to use colors in the console easily).

More about this later, but keep in mind that this exists and is used a lot so you don't have to reinvent the wheel a lot and write the same code over and over.

### NVM

There is a tool called nvm (node version manager) which allows you to change node versions on the fly, instead of having to remove and reinstall a version. This comes in handy when you have more than 1 node project, but they have different versions.

## Finding Documentation

All of it can be found on the [node website](https://nodejs.org/docs/latest-v8.x/api/documentation.html).

At the top, make sure that you are in the version 8. Some functions you will use may not work in newer versions, and code from newer versions will not work in version 8. This makes it very important.

For general information about JavaScript, go to the [MDN](https://developer.mozilla.org/en-US/docs/Web).

## REPL

Read--Evaluate-Print-Loop. This is basically the node loop. You can access it by typing `node` in your terminal. ctrl+c or cmd+c to cancel it.

## Starting a project

### npm init

When you start a project, you should create a folder (do this through the command line!) and run `npm init` inside of the folder. The terminal will ask you some questions that you need to answer.

once you have answered all of these, you will see a file called `package.json` in your folder.

This package.json file does a few things. It holds some general information about your project (which you filled in). It remembers all the packages you installed (more about that later) and allows you to create small scripts.

More about the package.json and npm init [here](https://github.com/HackYourFutureBelgium/Node.js/tree/master/week1#setting-up-a-nodejs-project-using-npm-init-and-packagejson).

### npm install

npm install is the command you will run when you want to install a package. Remember how we said NPM allows us to install code written by other developers who put this online? This is how we reach that code.

As an example, let's use chalk and nodemon.

In [this exampl repository](https://github.com/wesobi/HYF-node-example) (which i will use from this point out), you can see that we have a package.json file. It has a JSON object, with the dependencies field and devDependencies field.

`Dependencies` are packages of code your application relies on to run. If you ever put this node.js app online somewhere, it will require the code of chalk to run.

you install this by running `npm install chalk`.

`devDependencies` are packages of code your application does not need to run, but for development purposes. A good example of this is Nodemon. It auto restarts the Node server whenever there is a change detected in one of your files, so you don't have to do this manually.

You install this by running `npm install nodemon --save-dev`. The extra --save-dev flag indicates it should be saved as a devDependency.

### node_modules

The code of these third party packages are saved in a folder called `node_modules`. Once you ran the commands above you will see this folder in your project.

You might see some folders in there which you did not installQ Don't panic though, it might be that chalk and nodemon in turn also rely on other people's code to make theirs work. This means they are also installed in your project.

### npm scripts

now, open package.json and check for the scripts section. Add the following script to it.

```javascript
  "scripts": {
    "dev": "nodemon index.js",
  },
```

We'll get back to the use of this later at some point.

## require.js

Now that we know how to install external packages, we need to include this code in our code somehow.

We do this by using `require`. It is a file and module loader. More information can be found at [their website](https://requirejs.org/).

There are 2 types of modules we can require.

- custom modules
- node modules

### custom modules

these are basically modules you write yourself.
If you have some code you are going to use multiple times in your codebase, you'll want to make this into a separate file and export this code (as a module), so it can be required in another file whenever you like.

These will always be a relative path.

log-color.js is an example of this (for example: `const log-color = require('./log-color');`).

### node modules

There are two kind of node modules. First off you have the ones that node.js itself offers (for example: `const http = require ('http');`).

Second, you have external ones which are installed through NPM (for example: `const chalk = require ('chalk');`) This is not in the default nod modules library.

running the following commands will install chalk and nodemon, and run index.js as a node process.

```javascript
npm install
node index.js
```

You will see index.js requires log-color in a module. This is a custom module we made that in turn uses chalk (a node module). It allows us to customize logs a bit more by adding some color.

More information can be found at [the lecture](https://github.com/HackYourFutureBelgium/Node.js/tree/master/week1#importing-modules-using-require).

## http server with built in http module

In our index.js we now have required the http module. This gives us access to the functions this module exports.

With this we can create a web server. Here we can use data from the request that is sent to us through the brwoser and send a response back with the details that we decide.

In our example, you can see we created a server that listens to port 3000 of our localhost. If we go to `http://localhost:3000/red` (make sure you ran `node index.js` before!), it will print a red string in the console and return a message in the browser. Same for `/blue` and `/green`.

If it's any other page, it will throw a 404 status code (which is the general status code for when a page is not found).

If we want to make changes, they will not show up. To do that, we would have to cloe our node server and start it up again.

This is where nodemon comes in and the script we made for it in our package.json! If we run `npm run dev`, instead of `node index.js` it will start nodemon, and that will detect any change that is made to index.js and auto restart the server.
