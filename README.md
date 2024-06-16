## Environment variables

The following environment variables must be present at `/backend/.envrc` to run the webapp locally:

```bash
export AUTH_USERNAME=<username_to_login_to_webapp>
export AUTH_PASSWORD=<password_of_username>
export API_URL=<url_of_backend> # only relevant for prod deployments
# http://0.0.0.0 handles prod deployment.

# AWS --------------
export TF_VAR_name=<name_of_EC2_instance>
export TF_VAR_ami_id=<AMI_for_EC2>
export TF_VAR_instance_type=<EC2_size>
export TF_VAR_auth_username=${AUTH_USERNAME}
export TF_VAR_auth_password=${AUTH_PASSWORD}
export TF_VAR_api_url=${API_URL}
export TF_VAR_domain="test.example.com" # Domain will point to EC2.

# DO ---------------
export TF_VAR_do_token=<do_API_token>
export TF_VAR_docker_repo=<Docker_repository_with_image> # example/image:latest
export TF_VAR_droplet_name=<droplet_name>
export TF_VAR_droplet_image=<droplet_image>
export TF_VAR_droplet_region=<droplet_region>
export TF_VAR_droplet_size=<droplet_size>
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

## Deployment

### DO

```bash
cd terraform/webapp/do
terraform init -upgrade
# Check that you have setup all required env. variables!
terraform apply
```

⚠️ if `https` has not been configured, you have to establish a connection by explicitly using `http` in your browser.

_Related to the AWS deployment_:

⚠️ it might take some time after your deployment finishes, for you to be able to connect to the EC2 instance that hosts your webapp and receive a successful response. The instance might be quite _small_ and it will therefore require more time to setup Docker and host the webapp.
