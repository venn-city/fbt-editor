# fbt-editor.md
In cooperation with [Venn City](https://venn.city/), [Sigma Software](https://sigma.software/) implemented FBT internalization framework extension, providing seamless usage of translated text for applications while keeping it intuitive and easy and at the same grammatically correct.
The tool is a web-based editor that helps to maintain and manage FBT files.

The main features are:
* Managing files in S3 bucket, detecting translation inputs in the folder;
* Parsing source string files and displaying strings available for translation;
* Managing projects in S3 bucket;
* Adding new languages for translations;
* Searching for strings inside the file;
* Filtering and saving recently opened files for easy navigation.

<h1 align="center">
	<a href="https://facebook.github.io/fbt/docs/translating/">
  <img src="https://facebook.github.io/fbt/img/fbt.png" height="150" width="150" alt="FBT"/>
  	<a href="https://sigma.software/">
    <img src="https://sigma.software/sites/all/themes/sigmaukraine/images/logo.svg" height="150" width="150" alt="sigma"/>
</h1>

## Requirements
* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)

## Using fbt-editor
1. Setup settings in ../backend/appSettings.json (you can copy the structure from appSettings.example.json)
2. Install packages: 
	npm install
	npm run-script install-frontend
	npm run-script install-backend
3. Run application: npm start

## Example
You can find examples of files in ./translations
