## Running

Install dependencies with and npm. You'll first need to have [npm](npmjs.org) installed to do so. Then run the following:

```
npm install
```

This project comes with a grunt task to compile the js webpack bundle and scss, run a [`connect`](https://github.com/gruntjs/grunt-contrib-connect) web server and and opens up the web browser for you. You'll need to have [the grunt CLI](http://gruntjs.com/getting-started) installed first then, just run:

```
grunt
```

## Decisions

- Grunt with livereload and built in compilation helps maintainability by making dev environments easily reproducable and encouraging fast experimentation for quick learning with livereload.
    - And using Stylus over Sass to avoid requiring Ruby and Sass to be installed
