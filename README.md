<br />
<p align="center">
  <h3 align="center">Rule Book</h3>

  <p align="center">
    Rule Book App
    <br />
    <a href="https://rule-book.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/jimmytran411/card-game-rule/issues">Report Bug</a>
    ·
    <a href="https://github.com/jimmytran411/card-game-rule/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

The project is a rule book for Magic: The Gathering card games.
Main Features:

- Table of contents with link to corresponding chapter. Table of contents display as a sidebar that can be open or close.
- Rule list with pagination.
- Search box for filtering the rules displayed on the page, so that you can, for instance, type “commander” and find all rules that mention the word “commander”.
- A text box to get rule book from url. Currently, only file with the same format works.
- Hyperlinks automatically between rules. A rule that contain a word that link to another rule can be clicked to navigate to that rule.

### Built With

- [Create React App TypeScript](https://create-react-app.dev/docs/adding-typescript/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jimmytran411/card-game-rule.git
   ```
2. Install dependencies
   After cloning the repo, you need to install dependencies in both frontend and backend.
   To install the frontend:

   ```sh
   cd frontend
   yarn install or npm install
   ```

   From there, to install backend:

   ```sh
   cd .../backend
   yarn install or npm install
   ```

3. Add environment variable:
   After installing all the dependencies, for development, you need to set environment variables to enable certain features.
   In the frontend folder, create new ".env" file. Add:

```sh
REACT_APP_DEFAULT_RULE_BOOK_URL
```

and set it equal to the rule file url

4. Run the App at localhost:
   After that, make sure you are at backend folder. You can start the project with the following command:
   ```sh
   yarn run dev or npm run dev
   ```

<!-- CONTACT -->

## Contact

An Tran - [LinkedIn](https://www.linkedin.com/in/an-tran-204/) - email: jimmytran411@gmail.com

Project Link: [https://github.com/jimmytran411/card-game-rule/](https://github.com/jimmytran411/card-game-rule/)
