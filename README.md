## Environment variables

The following environment variables must be present at `/backend/.envrc` to run the webapp locally:

```bash
export AUTH_USERNAME=<username_to_login_to_webapp>
export AUTH_PASSWORD=<password_of_username>
export API_URL=<url of backend> # only relevant for prod deployments
export TF_VAR_name="ero_cat_dict"
export TF_VAR_ami_id="ami-006fb64513923c5ce" # ami for eu-north-1
export TF_VAR_instance_type="t4g.micro"
export TF_VAR_user_data_file_name="user_data.sh"
export TF_VAR_auth_username=${AUTH_USERNAME}
export TF_VAR_auth_password="pass"
export TF_VAR_api_url=${API_URL}
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
