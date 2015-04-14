Starter Site Template
=====================

This is a base site template set up with specific modules one might want when starting a new project. Feel free to use this as an example and add / remove whatever you want.


## What You Need

For this to work you will need to have the following tools installed.

* [Node](https://nodejs.org/) - recommend updating to the newest version
* [Grunt](http://gruntjs.com/getting-started) (npm install -g grunt-cli)
* [Bower](http://bower.io/) (npm install -g bower)


## Getting Started

Here's the quick explanation. Clone this project to your directory and run the following commands. Follow the links for further info.

1. [npm install](#node-modules)
2. [bower install](#bower-components)
3. [grunt](#grunt)
4. [grunt dev](#grunt-dev)


## Node Modules

```
npm install
```

Here's a list of the modules being installed, links to their repositories / sites for details and a quick note on how they're being used.

* [assemble](http://assemble.io/) - For templating using Handelbars.js, Markdown, etc

* [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer) - No more worrying about CSS browser prefixes

* [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean) - Clean up package before compiling

* [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) - Concat JS files to reduce http requests

* [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect) - Start local server for developement

* [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy) - Move necessary bower package files to src and move static assets to dist

* [grunt-contrib-csslint](https://github.com/gruntjs/grunt-contrib-csslint) - Lint CSS

* [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin) - Minify CSS

* [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) - Optimize JPGs, GIFs and SVGs

* [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint) - Lint JS

* [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) - Using SASS preprocessing for CSS

* [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) - Minify JS

* [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) - Watch files for changes while developing

* [grunt-htmlhint](https://github.com/yaniswang/grunt-htmlhint) - Lint HTML

* [grunt-newer](https://github.com/tschaub/grunt-newer) - Only recompile newer assets to save time when developing

* [grunt-pngmin](https://github.com/zauni/pngmin) - Using to optimize PNGs instead of imagemin because pngquant has much better compression and still outputs a good quality image

* [grunt-scss-lint](https://github.com/ahmednuaman/grunt-scss-lint) - Lint SASS


## Bower Components

```
bower install
```

Bower will install the below packages. Then you can use it to manage your other packages!

* jQuery 2.1 (no < IE 8 for us)
* Modernizr.js
* Normalize.css


## Grunt

```
grunt
```

This will:

1. Clean the dist and any bower files already copied over to the project
2. Lint and compile your SASS, then prefix, lint and minify the CSS
3. JSHint your JS, concat dat, uglify it
4. Assemble your HTML, lint it
5. Minify your images
6. Copy over any docs and root files


### Grunt Dev

```
grunt dev
```

This will:

1. Start a local server using Connect (set for port 8080)
2. Watch for any changes to your files
3. Recompile any files that change and run only the necessary tasks (CSS, JS, HTML, Images)
4. Live Reload the browser using the [live reload browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-)


#### Author

Will Hutchinson
(_set this up while working at [Infinity Interactive](http://iinteractive.com)_)
