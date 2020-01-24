# Angular Demo Fe

This Angular Demo project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23 and
demonstrates several aspects of Angular and the surrounding technologies. It might be a good starting point for Angular
projects with a similar technology stack, or just can be used to write PoCs in order to test new technologies or
potential solutions for Angular related problems.

Actually the Angular Demo Frontend is the counter part to this
[String Boot Demo](https://github.com/nilsign/spring-boot-demo-be) backend project. So besides a locally running
Keycloak and Postgres instance, the Backend must have been started locally also.

### Major Tech-Stack
- Angular
- TypeScript
- SASS, SCSS
- Keycloak
- Docker
- Storybook
- Sonarqube

### Setup Backend

Please follow the setup instructions of the [String Boot Demo](https://github.com/nilsign/spring-boot-demo-be) backend
project.

### Setup Keycloak Docker Container

If you have chosen the pre-configured Keycloak Docker option during in the
[String Boot Demo](https://github.com/nilsign/spring-boot-demo-be) backend project setup, this part can be skipped. Just
start the Keycloak Docker container from the backend project and the Keycloak frontend requirements are there already.

In case you have chosen the manual option while setting up the Keycloak Docker container during the backend setup, the
following additional steps are required to make Keycloak usable for the frontend.

#### Manual Configuration of the Keycloak Docker Container

1. Ensure that the Docker container that has been created during the backend project setup is running.

    $ docker ps
    $ docker ps -a
    $ docker start demo-project-keycloak

2. Open to http://localhost:8100, login as `nilsign@gmail.com` with `root` as password (or whatever has been chosen as
Keycloak administrator) and navigate to the Administration Console.

3. Ensure that you are in the `DemoProjectRealm` realm

4. Add a new client to the realm named: `DemoProjectAngularFrontendClient`
   DemoProjectRealm->Configure->Clients->Create
    - Enter as "Valid Redirect URIs": `http://localhost:4200/*`
    - Enter as "Web Origins": `+`
    
5. Add the new client role 
    DemoProjectRealm->Configure->Clients->DemoProjectAngularFrontendClient->Roles
    - Enter as Role Name: `ROLE_CLIENT_ADMIN`
    - Repeat with the role names: `ROLE_CLIENT_SELLER`
    - Repeat with the role names: `ROLE_CLIENT_BUYER`

6. DemoProjectRealm>Configure->Manage->Users-> ...
- ... nilsign->Role Mappings->Client Roles->DemoProjectAngularFrontendClient
    - Select `ROLE_CLIENT_ADMIN` and press "Add selected"
- ... ada->Role Mappings->Client Roles->DemoProjectAngularFrontendClient
    - Select `ROLE_CLIENT_ADMIN` and press "Add selected"
- ... selma->Role Mappings->Client Roles->DemoProjectAngularFrontendClient
    - Select `ROLE_CLIENT_SELLER` and press "Add selected"
- ... bud->Role Mappings->Client Roles->DemoProjectAngularFrontendClient
    - Select `ROLE_CLIENT_BUYER` and press "Add selected"

7. (Optional) Commit the running Keycloak Docker container to a new Docker image.

        $ docker ps -a
        $ docker commit [CONTAINER ID] jboss/keycloak:demo-project-v3

8. (Requires: 7) To start the new jboss/keycloak:demo-project-v3 Docker image again when it was
shut down execute

        $ docker run -p 8100:8080 jboss/keycloak:demo-project-v3

9. To start a stopped container (e.g. after reboot, etc...) call start with the container name or container id.

        $ docker ps -a

        $ docker start demo-project-keycloak
        $ docker start [CONTAINER ID]

10. Open `the environment.ts` files (at least the DEV) and set the correct (your) Keycloak's "client-secret".

Note, the client secret can be found at
DemoProjectRealm->Configure->Clients->Account->Credentials

11. (Optional) Test the Keycloak instance with Postman

    POST REQUEST: http://localhost:8100/auth/realms/DemoProjectRealm/protocol/openid-connect/token

    BODY: x-www-form-urlencoded

    KEY: `client_id` => VALUE: `DemoProjectAngularFrontendClient`<br>
    KEY: `username` => VALUE: `nilsign@nilsign.com`<br>
    KEY: `password` => VALUE: `root`<br>
    KEY: `grant_type` => VALUE: `password`<br>
    KEY: `client_secret` => VALUE: `6a06b69f-8108-4d40-af64-ed1325385c5d` <br>

    Note, the correct client secret can be found at
    DemoProjectRealm->Configure->Clients->Account->Credentials

### Setup Sonarqube

1. Get [Sonarqube Docker Image](https://hub.docker.com/_/sonarqube/) and run it in a Docker container.

        $ docker pull sonarqube
        $ docker run -d --name sonarqube -p 9000:9000 sonarqube

2. Run test with code coverage (to update Sonarqubes coverage information).

        $ ng test --code-coverage

3. Execute Sonarqube's code analysis.

        $ ng run sonar

3. Navigate to the to http://localhost:9000 and enter the default credentials to inspect the results
- Username: `admin`
- Password: `admin`

To customize the Sonarqube setup configuration adapt the `sonar-project.properties`.

More detailed information can be found on the official [Sonarqube](https://sonarqube.org) pages.

### Development Server

Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Build Project

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Running Sonarqube

Run `ng run sonar` to analyse and measure the code quality. To see the results navigate to http://localhost:9000.

Note, that a locally running Sonarqube server instance is required. See [Setup Sonarqube](#Setup Sonarqube).
