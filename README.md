# generator-mbf [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Yeoman Generator for LaTeX MBF courses

## Installation

First, install [Yeoman](http://yeoman.io) and generator-mbf using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-mbf
```

Then generate your new project:

```bash
yo mbf
```

## Getting Started

### What will be created?

#### Directory Structure

This generator will be perfect for every type of your LaTeX courses.
It helps you to create a solid structure of your project.

Take a look at this final structure:

```
│- .editorconfig
│- Gruntfile.js        # The compilator launcher file
│- main.tex            # The global file
│- package.json
│
└── src
    │- glossary.tex        # The glossary file
    │- references.bib        # The reference file
    │- ...
    │
    └── 1
        │- main.tex    # First chapter global file
        │- ...

    └── 2
        │- main.tex    # Second chapter global file
        │- ...

    └── assets
        │- figures.svg # Optionnal figures files
        │- ...

    └── ...

└── dist
    │- [PROJECT].pdf   # The final PDF file output
    │- ...             # Some files used for compilation

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Ghislain IRANYUMVA]()


[npm-image]: https://badge.fury.io/js/generator-mbf.svg
[npm-url]: https://npmjs.org/package/generator-mbf
[travis-image]: https://travis-ci.org/MBFAssas/generator-mbf.svg?branch=master
[travis-url]: https://travis-ci.org/MBFAssas/generator-mbf
[daviddm-image]: https://david-dm.org/MBFAssas/generator-mbf.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/MBFAssas/generator-mbf
[coveralls-image]: https://coveralls.io/repos/MBFAssas/generator-mbf/badge.svg
[coveralls-url]: https://coveralls.io/r/MBFAssas/generator-mbf
