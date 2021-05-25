<!-- logo: start -->
<div align="center">
    <img src="https://github.com/jeanmathieupotvin/hydria.dev/blob/main/src/images/logo-192.png" >
</div>
<!-- logo: end -->

# hydria.dev

<!-- badges: start -->
![](https://img.shields.io/badge/lifecycle-experimental-orange?style=for-the-badge)
![](https://img.shields.io/badge/version-alpha-green?style=for-the-badge)
<!-- badges: end -->

# Description

The static website of Hydria.

# Environment

In order to be able to modify and rebuild the website, users must have [Node.js](https://nodejs.dev) (>= 14.16.0) properly installed on their computer, along with `npm` (>= 6.14.0). On Windows, the underlying binaries must be properly added to the `PATH` environment variable. Aside from that, only regular `npm` packages are required.

Furthermore, [Dart Sass](https://sass-lang.com) is required to compile SCSS code to regular CSS. On Windows, its underlying binaries must also be properly added to the `PATH` environment variable.

# Installation

First, clone this repository.

```bash
git clone https://github.com/jeanmathieupotvin/hydria.dev.git
```

Then, install developers' dependencies. These allow you to build the whole website. 

```bash
npm install
```

No packages are required in production.

# Serving

This website can be served by any `HTTP(S)` server. In production, it is currently served by [NGINX](https://www.nginx.com/). It can be served locally on port 3000 via `npm` command `serve`.

```bash
npm run serve
```

Furthermore, `npm` command `watch` can also be used. This creates a feedback loop that responds to any changes to HTML, JS or SCSS files in `src/`, recompiles them, and refresh your browser. If none is opened, it will open one for you.

```bash
npm run watch
```

# Scripts

A couple of `npm` scripts are available to the developers. You typically only need to use `watch`, `build` and `serve`.

* `css:scss`: compile SCSS files to regular CSS files.
* `css:prefix`: run [PostCSS](https://postcss.org/) Autoprefixer.
* `css:build`: run both `css:build` and `css:prefix`.
* `css:watch`: watch for any changes in `src/scss` and run `css:build` each time a change is detected.
* `html:build`: run the custom builder Javascript's EJS static builder script ([ejs.builder.js](https://github.com/jeanmathieupotvin/hydria.dev/blob/main/ejs.builder.js)).
* `html:watch`: watch for any changes in `src/views` and run `html:build` each time a change is detected.
* `js:build`: run [Webpack](https://webpack.js.org/).
* `js:watch`: watch for any changes in `src/js` and run `js:build` each time a change is detected.
* `images:build`: optimize all images in `src/images`.
* `images:watch`: watch for any changes in `src/images` and run `images:build` each time a change is detected.
* `serve`: serve the website (contents of `build/`).
* `watch`: wrapper command to run `css:watch`, `html:watch`, `js:watch`, `images:watch` at the same time and in the same process.
* `build`: wrapper command to run `css:build`, `html:build`, `js:build`, `images:build` at the same time and in the same process.

# Working on the website

The actual website is located in `build/`. All files in `src/` are compiled to this location. Compilation is handled by `npm` scripts. Developers never have to write code in `build/`, unless the configuration files `browserconfig.xml` and `site.webmanifest` must be changed. Actual code must be saved in `src/`. 

The current *toolchain* relies on the following tools to compile the website.

* [EJS](https://ejs.co/) is the HTML view model.
* [SCSS](https://sass-lang.com/documentation/syntax) is the preferred CSS syntax.
* [Webpack](https://webpack.js.org/) is the JS bundler.
* [imagemin](https://www.npmjs.com/package/imagemin) is the images optimizer. 

# Architecture

The current architecture relies on this simple structure. It is inspired from this [great tutorial](https://wweb.dev/blog/how-to-create-static-website-npm-scripts/). The purpose is to keep things simple, and avoid big front-end frameworks (for now).

```
root
│
├── .gitignore
├── LICENSE
├── README.md
├── ejs.builder.js
|   └── custom EJS builder; compiles all .ejs files in src/views into HTML files in build/
├── ejs.config.js
├── package-lock.json
├── package.json
├── webpack.config.js
|
├── src/
│   ├── images/
│   |   └── (unoptimized) images used by website 
|   |
│   ├── js/
│   |   └── source JS scripts and modules; bundled into monolithic bundle scripts in build/javascripts/
|   |
│   ├── scss/
│   |   └── SCSS partials and files; compiled into monolithic bundles in build/stylesheets/
|   |
│   └── views/
│       ├── hiearchy matters; routing in build/ is derived from it
│       └── EJS views; partials and webpages are compiled into real HTML files in build/
|
├── build/
│   ├── browserconfig.xml
|   ├── site.webmanifest
│   └── build the rest with npm run build or npm run watch
|
└── etc/
    └── other files that could be useful, but that are not part of the build
```

The files in `build/` are all ignored, excepted for configuration files that never change. These by-products can be generated anytime by using proper `npm` scripts. See
scripts above.

# License

**Creative Commons Zero v1.0 Universal** (CC0 1.0 Universal). Essentially, this means you can reuse everything in this repository (the code, the files, etc.), but not the trademark itself. See [LICENSE](https://github.com/jeanmathieupotvin/hydria.dev/blob/main/LICENSE) for more information.

# Bugs and feedback

Submit them [here](https://github.com/jeanmathieupotvin/hydria.dev/issues/new). Thank you!

# Hydria

This section is only relevent to Hydria's contributors.

## TODOs

1. Integrate a HTML minifier into the development pipeline.
2. Google Analytics integration (this includes actual account's creation).
3. Choose better keywords, and update `index.ejs` and `package.json`.
4. Integrate latest version of manifest.
5. Translate website to English.
6. Make EJS builder more intelligent, so that it can properly compile all sub-directories in `src/views`.
7. Restructure `src/views` and anchors in views to better match a bilingual routing structure.
8. Add accessibility support.
9. Consider switching to another HTML template engine, such as PostHTML. Should we also look into a popular front-end dev framework such as [Svelte](https://svelte.dev/)?
