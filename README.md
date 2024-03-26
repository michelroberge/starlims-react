# STARLIMS Frontend

Welcome to the STARLIMS frontend repository! This project is built with React and Vite, providing a modern and efficient development environment for interfacing with STARLIMS through its REST API.

This project depends on https://github.com/michelroberge/starlims-node-proxy

## Getting Started

To get started with development, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using your package manager of choice. For example, with npm:

```npm install```

3. Set up your environment variables by creating a `.env` file at the root of the project. You can use the following template:

```
VITE_APP_TITLE="STARLIMS on React on port 3037 - .env"
VITE_APP_PORT=3037
VITE_APP_STARLIMS_PRIVATE_KEY=<your private key from STARLIMS REST API>
VITE_APP_STARLIMS_AUTH_KEY=<your authentication key from STARLIMS REST API>
VITE_APP_STARLIMS_ENDPOINT=http://localhost:3000/proxy
VITE_APP_DEBUG_API=N
```

Make sure to replace `<your private key>` and `<your authentication key>` with the appropriate keys obtained from the STARLIMS REST API.

4. Start the development server:

```npm run dev```


## Environment Variables

- `VITE_APP_TITLE`: The title of the application.
- `VITE_APP_PORT`: The port on which the application will run.
- `VITE_APP_STARLIMS_PRIVATE_KEY`: Your private key obtained from the STARLIMS REST API.
- `VITE_APP_STARLIMS_AUTH_KEY`: Your authentication key obtained from the STARLIMS REST API.
- `VITE_APP_STARLIMS_ENDPOINT`: The endpoint for the STARLIMS REST API.
- `VITE_APP_DEBUG_API`: Set to `Y` to enable debug mode for the API.

## Docker

This project can also be containerized using Docker. To build and run the Docker container, follow these steps:

1. Build the Docker image:

```docker build -t starlims-frontend ```

2. Run the Docker container:
```docker run -p <host_port>:<container_port> starlims-frontend```


Replace `<host_port>` with the desired port on your host machine and `<container_port>` with the port specified in the `.env` file (`VITE_APP_PORT`).

## Contributing

We welcome contributions from the community! If you'd like to contribute to this project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
