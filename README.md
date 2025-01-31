# Weather App

This project is a weather application built using Vite, Tailwind CSS, and the OpenWeather API.

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js
- npm (Node Package Manager) or Yarn

### Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/olutunde22/weather-app.git
  ```
2. Navigate to the project directory:
  ```sh
  cd weather-app
  ```
3. Install the dependencies using npm:
  ```sh
  npm install
  ```
  or using Yarn:
  ```sh
  yarn install
  ```

### Environment Variables

Before running the application, make sure you have the following environment variables set in a `.env` file at the root of the project:

```
VITE_WEATHER_BASE_URL="https://api.openweathermap.org/"
VITE_WEATHER_API_KEY="your_api_key_here"
```

> **Note:** The API key used should have the One Call subscription.

### Running the Application

To start the development server, run:
```sh
npm run dev
```
or using Yarn:
```sh
yarn dev
```

This will start the application and you can view it in your browser at `http://localhost:5173`.

### Building for Production

To build the application for production, run:
```sh
npm run build
```
or using Yarn:
```sh
yarn build
```

This will create a `dist` directory with the production build of your application.

## Technologies Used

- **Vite**: A fast build tool and development server.
- **Tailwind CSS**: A utility-first CSS framework.
- **OpenWeather API**: An API to get weather data.

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenWeather API](https://openweathermap.org/api)

