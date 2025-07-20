# Password Suggestion Tool

## Description
The Password Suggestion Tool is a web-based application that generates secure, easy-to-remember passwords by combining random words, numbers, and symbols. It allows users to customize the number of words, digits, and word length constraints to create unique passphrases tailored to their preferences.

## Features
- **Customizable Passwords**: Users can specify the number of words, number of digits, and minimum/maximum word lengths for generated passwords.
- **Randomized Output**: Generates passwords with randomized case (alternating uppercase/lowercase words), numbers, and symbols for enhanced security.
- **Interactive UI**: Built with HTML, CSS, and JavaScript, featuring a user-friendly interface with real-time password generation on button click.
- **Responsive Design**: Styled with custom CSS to ensure a clean, centered layout with a card-based interface.
- **Error Handling**: Gracefully handles network errors from the random word API and displays user-friendly messages.

## How to Use
1. **Open the Application**: Load `index.html` in a web browser.
2. **Set Preferences**:
   - Enter the desired number of words in the password.
   - Specify the number of digits to include at the start and end.
   - Define the minimum and maximum word lengths.
3. **Generate Passwords**: Click the "Get Passwords!" button to generate a list of 10 unique passwords.
4. **View Results**: Passwords will be displayed in a list below the input fields, with a loading message shown during generation.

## Technologies
- **HTML**: Structure of the web page.
- **CSS**: Custom styling for a responsive, visually appealing interface.
- **JavaScript**: Core logic for password generation, utilizing jQuery for DOM manipulation and the Random Word API for word fetching.
- **External API**: [Random Word API](https://random-word-api.herokuapp.com/) for generating random words.
- **Dependencies**:
  - jQuery (loaded via CDN).
  - Chance.js (excluded from repomix output but assumed available as `js/chance.min.js`).

## Setup
1. Clone the repository or download the files.
2. Ensure an internet connection for API calls and CDN-loaded dependencies.
3. Open `index.html` in a web browser to use the tool.
4. (Optional) Host the files on a web server for broader access.

## File Structure
- `.gitattributes`: Configures Git to normalize text files with LF line endings.
- `.gitignore`: Excludes `repomix*` files from version control.
- `css/custom_styles.css`: Custom CSS for styling the application.
- `index.html`: Main HTML file containing the UI structure.
- `js/app.js`: JavaScript logic for password generation and DOM manipulation.
- `js/chance.min.js`: External library for random number generation (not included in repomix output).
- `README.md`: This documentation file.

## Notes
- The tool relies on the Random Word API, so an active internet connection is required.
- Binary files (e.g., `js/chance.min.js`) are excluded from the repomix output but must be present in the `js/` directory.
- Files are sorted by Git change count in the repomix output, with frequently changed files appearing last.

## License
MIT License

Copyright (c) 2022 Jeff Balagosa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
