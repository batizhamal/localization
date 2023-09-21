# localization

## Demo:
![Localization Demo](https://github.com/batizhamal/localization/assets/52880286/6017a123-0021-4b39-90a1-582623f8a37b)

## Description:
An application to simplify the localization process of the current working project. It has specifically developed method to parse through complex nested objects. The project is integrated with Google Cloud Translate API to provide the translation hints to the users.

This project was generated with [Vue CLI](https://github.com/vuejs/vue-cli)

## Functionality:

- Function to upload .json dictionary files in any order (data is not lost when the page is refreshed, it is written to localStorage when downloading files).
- Parsing of nested objects (takes the primary file and pulls out the keys).
- Finding the delta between the primary file and the rest.
- Function to edit the fields and the text data.
- Function to download the resulting .json files after successful translation.
- Translation hints from Google Translator.

## Development server
Run `yarn serve` for a dev server. Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

## Further help

Do not hesitate to contact if you have any further questions: batizhamal@gmail.com. 

