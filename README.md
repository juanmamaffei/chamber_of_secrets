# README: Chamber of Secrets

Chamber of Secrets (CoS) is a simple, collaborative and safe password manager. You can use it free in [chamberofsecrets.xyz](http://chamberofsecrets.xyz) or deploy it in your own server.

- [Documentation of API.](/docs/api_docs.md)
- [JSON Collection (for import in Postman).](/docs/Chamber%20of%20secrets.postman_collection.json)
- [Initial idea.](/docs/Initial%20idea.pdf)
- [Video tutorial]()

## How can I deeploy it?

1) Install Ruby 3.0.0p0.
2) Install NodeJS v15.5 or higher.
3) Install Nginx.
4) Install Postgres.
5) Clone repository.
6) `bundle install`
7) Create database (`rails db:create`) and run migrations (`rails db:migrate`).
   - If you don't have permissions for creating DBs: first, run `sudo -u postgres psql` and `ALTER USER yourdeployuser CREATEDB;`
   - This is only for development and testing environments.
8) Create DB and configure environment variables. Some tips...
   1) For PG configuration:
      1) `sudo -u postgres psql`
      2) `CREATE USER chamber_of_secrets WITH PASSWORD 'yourpass';`
      3) `ALTER USER chamber_of_secrets SUPERUSER;`
      4) `CREATE DATABASE chamber_of_secrets_production;`
      5) `GRANT ALL PRIVILEGES ON DATABASE chamber_of_secrets_production TO chamber_of_secrets;`
      6) `\q`
   2) Environment variables
      1) `export CHAMBER_OF_SECRETS_DATABASE_PASSWORD=yourpass`
9) Configure your HTTP server.
   1) In `/etc/nginx/nginx.conf`:
   PENDING
   1) In `/etc/nginx/sites-enabled/cos.conf`
   PENDING
10) Install Passenger.
    1) [Guide for Debian 9](https://www.phusionpassenger.com/library/install/nginx/install/oss/stretch/).
    2) _Alternative_: install Passenger gem (`gem install passenger`) and then  `passenger-install-nginx-module`.
11) Precompile assets (`rails precompile:assets RAILS_ENV=production`).
12) Enjoy it.

server {
            listen 80;
            listen [::]:80 ipv6only=on;

            server_name transmediacademy.com;
            passenger_enabled on;
            rails_env    production;
            root         /home/deploy/transmediAcademy/public;

            # redirect server error pages to the static page /50x.html
            error_page   500 502 503 504  /50x.html;
            location = /50x.html {
                root   html;
            }
  }


In NGINX.CONF
        include /etc/nginx/passenger.conf;

