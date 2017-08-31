'use strict';
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const yosay = require('yosay');
const inquirer = require('inquirer');

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
	'book', 'letter', 'report'
];

const languages = [
	'frenchb', 'english'
];

module.exports = class extends Generator {
	prompting() {
		let extensionName = require('lodash').kebabCase(this.appname);

		// // Have Yeoman greet the user.
		this.log(yosay('Yo Man !'));

		var DocType = [
			{
				type: 'list',
				choices: docClasses,
				name: 'docClass',
				message: 'Choisir le type de document',
				default: docClasses[0]
			}
		];

		var BookPrompts = [
			{
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
				message: 'Prénom de l\'Auteur',
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
				name: 'ProfSurName',
				message: 'Prénom du prof',
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
				type: 'list',
				choices: languages,
				name: 'language',
				message: 'Choisir la langue',
				default: languages[0]
			},
			{
				type: 'confirm',
				name: 'copyrights',
				message: 'Ajouter les droits d\'auteur',
				default: true
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
			}
		];

		var LetterPrompts = [
			{
				name: 'projectName',
				message: 'Objet',
				default: extensionName,
				filter: function (input) {
					return input.replace(/^latex[-_]?/, '').replace(/[-_]?latex/, '');
				}
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
				name: 'name',
				message: 'Prénom de l\'Expéditeur',
				validate: function (input) {
					return Boolean(input);
				}
			},
			{
				name: 'surname',
				message: 'Nom de l\'Expéditeur',
				validate: function (input) {
					return Boolean(input);
				}
			},
			{
				name: 'adress',
				message: 'Adresse (XX Rue de la Paix)',
				validate: function (input) {
					return Boolean(input);
				}
			},
			{
				name: 'zipncity',
				message: 'Code postale & ville (95700, Paris)',
				validate: function (input) {
					return Boolean(input);
				}
			},
			{
				name: 'mobile',
				message: 'Portable',
				default: '-',
				validate: function (input) {
					return Boolean(input);
				}
			},
			{
				name: 'phone',
				message: 'Fixe',
				default: '-',
				validate: function (input) {
					return Boolean(input);
				}
			},
			{
				name: 'email',
				message: 'Email',
				default: '-',
				validate: function (input) {
					return Boolean(input);
				}
			},
			{
				type: 'confirm',
				name: 'images',
				message: 'Ajouter les images de fonds',
				default: true
			},
			{
				type: 'list',
				choices: languages,
				name: 'language',
				message: 'Choisir la langue',
				default: languages[0]
			}
		];

		return inquirer.prompt(DocType).then(function (answers) {

			if (answers.docClass === 'book' || answers.docClass === 'report') {
				return inquirer.prompt(BookPrompts).then(function (props) {
					this.props = props;
					this.props.docClass = answers.docClass;

					this.props.projectNameSlug = require('lodash').kebabCase(props.projectName);
				}.bind(this));
			}

			if (answers.docClass === 'letter') {
				return inquirer.prompt(LetterPrompts).then(function (props) {
					this.props = props;
					this.props.docClass = answers.docClass;
					this.props.projectNameSlug = require('lodash').kebabCase(props.projectName);
					this.props.projectDesc = "A MBF Letter !";
				}.bind(this));
			}
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
		this.log()
		if (this.props.docClass === 'book' || this.props.docClass === 'report') {
			this.fs.copyTpl(
				this.templatePath('Gruntfile.js'),
				this.destinationPath('Gruntfile.js'),
				this.props
			);
			this.fs.copyTpl(
				this.templatePath('main_book.tex'),
				this.destinationPath('main.tex'),
				this.props
			);
			this.fs.copyTpl(
				this.templatePath('title.tex'),
				this.destinationPath('title.tex'),
				this.props
			);
			this.fs.copy(
				this.templatePath('img/logo_big.png'),
				this.destinationPath('img/logo_big.png')
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

		if (this.props.docClass === 'letter') {

			this.fs.copyTpl(
				this.templatePath('main_letter.tex'),
				this.destinationPath('main.tex'),
				this.props
			);

			this.fs.copyTpl(
				this.templatePath('letter_recipient.tex'),
				this.destinationPath('recipient.tex'),
				this.props
			);

			this.fs.copyTpl(
				this.templatePath('letter_body.tex'),
				this.destinationPath('body.tex'),
				this.props
			);
			this.fs.copy(
				this.templatePath('img/logomarg_op.png'),
				this.destinationPath('img/logomarg_op.png')
			);
			this.fs.copy(
				this.templatePath('img/logo_big.png'),
				this.destinationPath('img/logo_big.png')
			);
		}
	}

	install() {
		this.installDependencies();
	}

	end() {
		if (this.props.docClass === 'book' || this.props.docClass === 'report') {
			this.composeWith(require.resolve('../chapter'), {
				chapterNum: '1',
				chapterName: 'First Chapter'
			});
		}
	}
};
