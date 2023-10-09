# CompassioNet

CompassioNet is a web application that encourages users to share their acts of kindness with the world. Users can post, view, edit and delete acts of kindness to promote positivity and inspire others.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

CompassioNet is divided into two main components: the frontend and the backend. The frontend is built using React, while the backend is built using Flask.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.x installed on your machine
- Node.js and npm installed on your machine

## Installation

### Backend (Flask)

Install dependencies using pipenv:

```shell
pipenv intall
```

### Frontend (React)

1. Navigate to the client directory:

```shell
cd client
```

2. Install dependencies using npm:

```shell
npm install
```

## Usage

### Backend (Flask)

1. Activate the virtual environment:

```shell
pipenv shell
```

2. Start the Flask development server:

```shell
python server/app.py
```

The backend will run on `http://localhost:5555`.

### Frontend (React)

Start the development server in the client directory:

```shell
npm start
```

The frontend will run on `http://localhost:3000`.

### Features

- **User Registration and Authentication**: Users can create accounts, log in, and log out securely.

- **Create Kindness Posts**: Users can share their acts of kindness by creating posts with titles, descriptions, dates, and categories.

- **View Kindness Feed**: Users can browse a feed of acts of kindness shared by others.

- **Edit and Delete Posts**: Users can edit and delete their own kindness posts.

## Contributing

We welcome contributions from the community! To contribute to CompassioNet, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature.

3. Make your changes and commit them with meaningful messages.

4. Push your changes to your forked repository.

5. Submit a pull request to the main repository, explaining the changes and why they should be merged.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/mohamedmhussein/compassionet/blob/main/LICENSE.md) file for details.
