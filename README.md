# hetic-p2019-04 [![Build Status](https://travis-ci.org/Far0s/hetic-p2019-04.svg?branch=master)](https://travis-ci.org/Far0s/hetic-p2019-04)
HETIC Front-End Development Project

## Install
Clone or download the repo, with your method of choice. Then `cd` in it

(you might need to use ```sudo``` for the next lines)
```bash
npm install   // Install all node dependencies (saved in node_modules/)

gulp          // Run gulp and view the app at http://localhost:3000/
```

## Setup
Once running, the app does the following:
* Mounts the `app` folder onto a local server.
* Listens for changes inside the `src` directory, and compiles the necessary files into the `app` directory, which will then automaticaly livereload or inject changes.
* CSS changes are injected, all other changes force a page reload.

## SCSS Setup
* `mixins` holds all Sass/SCSS mixins, FastShell ships with a few helpers
* `module` holds modules, more Object-Orientated components and a generic `app.scss` for everything else, all file names should be modular/OO.
* `partials` holds the blueprints for the project, the header, footer, sidebar and so on.
* `vendor` holds any files that are third party, such as the font awesome icons CSS
* `style.scss` imports all the necessary files from the above folders, when adding new files be sure to add it inside this file.
Gulp compiles all of that into a minified `style.min.css`.

## Handlebars Setup
* 'partials' holds all included files in the main template.
* 'index.hbs' is the main template, and is compiled into 'app/index/html'.

## License
inspired by [FastShell](http://github.com/HosseinKarami/fastshell)

#### The MIT License (MIT)
Copyright (c) FastShell

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
