<div style="display:flex; align-items: center">
  <img src="readme/assets/logo.svg" alt="drawing"  height="100" style="margin-right: 20px; margin-top: 35px" />
  <h1 style="position:relative; top: -6px" >Movie Quotes: Share Your Favorite Film Quotes </h1>
</div>

---

Movie Quotes is an app dedicated to exploring and enjoying famous quotes from your favorite films. Dive into the world of cinema and relive iconic moments through memorable lines.
#
### Table of Contents
* [Prerequisites](#prerequisites)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Development](#development)
* [API Documentation](#api-documentation)


#
### Prerequisites

* <img src="readme/assets/node.svg" alt="node-logo" width="30" style="position: relative; top: 6px;margin-right:1rem;" />**node@20.11.0**
* <img src="readme/assets/npm.svg" alt="npm-logo" width="45" style="position: relative; top: 17px;margin-right:1rem;" />**npm@10.2.4**

#
### Tech Stack

* <img src="readme/assets/vue.svg" alt="vue-logo" height="30" style="position: relative; top: 4px;margin-right:1rem;" />**Vue.js V3**
* <img src="readme/assets/vite.svg" alt="vite-logo" height="30" style="position: relative; top: 4px;margin-right:1rem;" />**Vite v5.2.11**
* <img src="readme/assets/tailwind.svg" alt="tailwind-logo" height="35" style="position: relative; top: 4px;margin-right:1rem;" />**Tailwind CSS v3.4.3**
* <img src="readme/assets/typescript.svg" alt="typescript-logo" height="30" style="position: relative; top: 4px;margin-right:1rem;" />**TypeScript v5.4.5**

#
### Getting Started
1 . Clone the repository
```sh
git clone https://github.com/RedberryInternship/movie-quotes-front-luka-trapaidze.git
```

2 . Next step requires you to run *npm install* in order to install all the dependencies.
```sh
npm install
```

3 . Now we need to set our env file. Go to the root of your project and execute this command.
```sh
cp .env.example .env
```
And now you should provide **.env** file all the necessary environment variables:

---
####  
**API:**
> VITE_BACKEND_URL=...

**App domain:**
> VITE_APP_DOMAIN=...

**Environment:**
> VITE_APP_ENV=development | production

**Laravel Reverb:**
> VITE_REVERB_APP_KEY=...

> VITE_REVERB_HOST=...

> VITE_REVERB_PORT=...

> VITE_REVERB_SCHEME=http | https

##### Now, you should be good to go!


#
### Development

You can now run the development server by executing:

```sh
npm run dev
```

#
### API Documentation

[API Documentation](https://documenter.getpostman.com/view/33136231/2sA3XLEPPg#c8264a92-1ed2-4593-afdb-d7f9556603cd "Postman")