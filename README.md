[![Build Status](https://travis-ci.org/abhishek97/ide.svg?branch=master)](https://travis-ci.org/abhishek97/ide)

![alt img](http://i.imgur.com/mTjKodQ.png)

# Coding Blocks IDE  
Coding Blocks IDE is an online IDE which supports compliation of multiple programming languages. 

![image](https://user-images.githubusercontent.com/22571395/28400188-1986c13c-6d2f-11e7-8955-98f257abb5ff.png)

## Table of Contents
- [Build Setup](#build-setup)
- [Features](#features)
- [Functions](#functions)
- [API](#api)
  
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Features
This responsive online code editor and compiler have the following features.

|Feature|Deatils|
|-------|-------|
|**Multiple Language Support**|C, C++, Java, Python, Java Script.|
|**Upload Code**|Code can be uploaded from local system|
|**Download Code**|Code can be downloaded with the name specified by the user.|
|**Custom Input**|A custom input box available for the user where user can enter inputs required by the program to run.|
|**FullScreen Mode**|Editor can go fullscreen.|
|**Save and Auto Save**|Code and editor settings gets auto-saved after every 10 seconds to prevent lose of code on closing the window accidently. User can also save the code manually by clicking the save button.|
|**Themes**|There are 9 editor themes available to choose from.|
|**Fonts**|7 different fonts for the editor.|
|**Font Size**|User can also set font size for the editor.|

## Functions
|Button|Function|
|------|--------|
|**Run**|Use the button to compile the code.|
|**Save**| Manually save all the content in localStorage.|
|**Reset**|To clear all the content, localStorage and resetting settings.
|**Reset Defaults**| Reset all the editor settings.|
|**UPLOAD**|Use to button and choose the file from local system to upload.|
|**DOWNLOAD**|Use the button to download the code in the editor into a file.|
|**Custom Input**|Use to toggle custom input box.|

## API 
This hits the Coding Blocks Judge API, which you can find documented here

<https://codingblocks.com/judge-blocks-docs/>

