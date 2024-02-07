## Environment variables

The following environment variables must be present at `/backend/.envrc` to run the webapp locally:

```bash
export AUTH_USERNAME=<username_to_login_to_webapp>
export AUTH_PASSWORD=<password_of_username>
export API_URL=<url of backend> # only relevant for prod deployments
```

## Development

To run the webapp locally for development:

```bash
cd frontend
npm run dev
```

## Docker

### Build

```bash
docker build . --tag catdict_webapp:<version number>
# Or use Makefile
make build
```

### Run

```bash
docker run -d --rm -p 80:80 --env AUTH_USERNAME=eduardo --env AUTH_PASSWORD=<password> --env API_URL="http://0.0.0.0" catdict_webapp
# Or use Makefile
make run
```

Docker container is now reachable at [http://0.0.0.0](http://0.0.0.0).
