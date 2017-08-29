'use strict';
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const yosay = require('yosay');

// Const docClasses = [
// 	'report', 'article', 'book', 'slides', 'beamer', 'lettre', 'memoir'
// ];

// const languages = [
// 	'english', 'afrikaans', 'ancientgreek', 'arabic', 'armenian', 'assamese',
// 	'basque', 'bengali', 'bokmal', 'bulgarian', 'catalan', 'coptic', 'croatian',
// 	'czech', 'danish', 'dutch', 'esperanto', 'estonian', 'farsi', 'finnish',
// 	'french', 'galician', 'german', 'german-x-2013-05-26', 'greek', 'gujarati',
// 	'hindi', 'hungarian', 'icelandic', 'indonesian', 'interlingua', 'irish',
// 	'italian', 'kannada', 'kurmanji', 'latin', 'latvian', 'lithuanian',
// 	'malayalam', 'marathi', 'mongolian', 'mongolianlmc', 'monogreek', 'ngerman',
// 	'ngerman-x-2013-05-26', 'nynorsk', 'oriya', 'panjabi', 'pinyin', 'polish',
// 	'portuguese', 'romanian', 'russian', 'sanskrit', 'serbian', 'slovak',
// 	'slovenian', 'spanish', 'swedish', 'swissgerman', 'tamil', 'telugu',
// 	'turkish', 'turkmen', 'ukenglish', 'ukrainian', 'uppersorbian',
// 	'usenglishmax', 'welsh'
// ];
const docClasses = [
  'book'
];

const languages = [
  'english', 'french'
];

module.exports = class extends Generator {
  prompting() {
    let extensionName = require('lodash').kebabCase(this.appname);

    // Have Yeoman greet the user.
    this.log(yosay('Yo !'));

    let prompts = [{
      name: 'projectName',
      message: 'Project Name',
      default: extensionName,
      filter: function (input) {
        return input.replace(/^latex[-_]?/, '').replace(/[-_]?latex/, '');
      }
    },
    {
      name: 'projectDesc',
      message: 'Description',
      default: 'Magistère Banque Finance, Assas'
    },
    {
      name: 'version',
      message: 'Version du projet',
      default: '0.0.1',
      validate: function (input) {
        return /^[0-9]\.[0-9](\.[0-9])?$/.test(input);
      }
    },
    {
      name: 'projectUrl',
      message: 'URL',
      default: 'http://mbfassas.com/'
    },
    {
      name: 'license',
      message: 'License',
      default: 'MIT'
    },
    {
      name: 'authorName',
      message: 'Prenom de l\'Auteur',
      validate: function (input) {
        return Boolean(input);
      }
    },
    {
      name: 'authorSurName',
      message: 'Nom de l\'Auteur',
      validate: function (input) {
        return Boolean(input);
      }
    },
    {
      name: 'ProfName',
      message: 'Nom du  prof',
      validate: function (input) {
        return Boolean(input);
      }
    },
    {
      name: 'ProfSurName',
      message: 'Prénom du prof',
      validate: function (input) {
        return Boolean(input);
      }
    },
    {
      type: 'list',
      choices: docClasses,
      name: 'docClass',
      message: 'Choisir le type de document',
      default: docClasses[0]
    },
    {
      type: 'list',
      choices: languages,
      name: 'language',
      message: 'Choisir la langue',
      default: languages[0]
    },
    {
      type: 'confirm',
      name: 'bib',
      message: 'Besoin du biblio ?',
      default: false
    },
    {
      type: 'confirm',
      name: 'glossary',
      message: 'Besoin d\'un glossaire ?',
      default: false
    },
    {
      type: 'confirm',
      name: 'figs',
      message: 'Générer les figures .pdf  à partir de .svg automatiquement ?',
      default: false
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.projectNameSlug = require('lodash').kebabCase(props.projectName);
    }.bind(this));
  }

  configuring() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
  }

  writing() {
    mkdirp('dist/');

    this.fs.copyTpl(
      this.templatePath('Gruntfile.js'),
      this.destinationPath('Gruntfile.js'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('main.tex'),
      this.destinationPath('main.tex'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('title.tex'),
      this.destinationPath('title.tex'),
      this.props
    );
    this.fs.copy(
      this.templatePath('img/logo.png'),
      this.destinationPath('img/logo.png')
    );
    this.fs.copy(
      this.templatePath('img/logomarg.png'),
      this.destinationPath('img/logomarg.png')
    );
    this.fs.copy(
      this.templatePath('img/logomarg_op.png'),
      this.destinationPath('img/logomarg_op.png')
    );

    if (this.props.bib) {
      this.fs.copyTpl(
        this.templatePath('src/references.bib'),
        this.destinationPath('src/references.bib'),
        this.props
      );
    }
    if (this.props.glossary) {
      this.fs.copyTpl(
        this.templatePath('src/glossary.tex'),
        this.destinationPath('src/glossary.tex'),
        this.props
      );
    }
    if (this.props.figs) {
      this.fs.copy(
        this.templatePath('src/figure.svg'),
        this.destinationPath('src/assets/figure.svg')
      );
      this.fs.copy(
        this.templatePath('figs.js'),
        this.destinationPath('figs.js')
      );
    }
  }

  install() {
    this.installDependencies();
  }

  end() {
    this.composeWith(require.resolve('../chapter'), {
      chapterNum: '1',
      chapterName: 'First Chapter'
    });
  }
};
