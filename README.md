# ANGULAR DEMO FRONTEND

This Angular Demo project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.x and
demonstrates several aspects of Angular and the surrounding technologies. It might be a good starting point for Angular
projects with a similar technology stack, or just can be used to test new technologies or potential solutions for
Angular related problems.

Actually the Angular Demo Frontend is the counter part of this
[String Boot Demo](https://github.com/nilsign/spring-boot-demo-be) backend project. So besides a locally running
Keycloak and Postgres instance, the Backend must have been started, also locally.

Note, once the BE and the FE has been started locally, navigate to http://localhost:4200 and  login as super admin user
in order to be able to access most of the implemented features, which are mainly user and role management related.

  Username: `nilsign`<br>
  Password: `root`

### Major Tech-Stack
- Angular
- TypeScript
- Keycloak
- RxJS
- Bootstrap & SCSS (& Responsive design)
- Jasmine tests (almost 100% code coverage)
- Docker
- Sonarqube

## BACKEND

An appropriate [Spring Boot Demo](https://github.com/nilsign/spring-boot-demo-be) backend is available within my GitHub
account.

## SETUP

### Setup Backend

Please follow the setup instructions of the [Spring Boot Demo](https://github.com/nilsign/spring-boot-demo-be) backend
project. Afterwards ensure that the backend itself and the required Docker images are running in Docker containers
locally.

### Setup Keycloak Docker Container

If you have chosen the pre-configured Keycloak Docker option during in the
[Spring Boot Demo](https://github.com/nilsign/spring-boot-demo-be) backend project setup, the part "Manual Configuration
of the Keycloak Docker Container" below can be skipped. Just start the Keycloak Docker container of the backend project
and the Keycloak frontend requirements are there out of the box.

In case you have chosen the manual option while setting up the Keycloak Docker container during the backend setup, the
following additional steps are required to make Keycloak usable for the frontend.

#### Manual Configuration of the Keycloak Docker Container

##### Start Keycloak and access the Keycloak Management Console

1. Ensure that the Docker container, that has been created during the backend project setup, is running.

        $ docker ps<br>
        $ docker ps -a<br>
        $ docker start demo-project-keycloak

        http://localhost:8100/auth/admin/master/console/#/realms/DemoProjectRealm

2. To access the Keycloak Administration Console navigate to http://localhost:8100 and enter the
following credentials

    Username: `nilsign@gmail.com`<br>
    Password: `root`

    Note, that the password for all other Keycloak Realm users is also `root`. This includes also new users that have
    been created via the UI of this frontend.

##### Create a Keycloak Realm Client (Frontend)

1. Switch the realm to `DemoProjectRealm`

2. Click to DemoProjectRealm->Configure->Clients->"Create"<br>

    Client ID: `DemoProjectAngularFrontendClient`

3. Click to DemoProjectRealm->Configure->Clients->"DemoProjectAngularFrontendClient"<br>

    Enabled: ON<br>
    Valid Redirect URIs: `http://localhost:4200/*`<br>
    Web Origins: `+`

##### Create and assign Keycloak DemoProjectRealm Client Roles

1. Click to DemoProjectRealm->Configure->Clients->DemoProjectAngularFrontendClient->Roles->"Add Role"<br>

    Role Name: `ROLE_REALM_CLIENT_ADMIN`

    Repeat 1. with Role Name: `ROLE_REALM_CLIENT_SELLER`<br>
    Repeat 1. with the Role Name: `ROLE_REALM_CLIENT_BUYER`<br>

2. Click to DemoProjectRealm->Manage->Users-> ...

   ... nilsign->Role Mappings->Client Roles->"DemoProjectAngularFrontendClient"

   Select role `ROLE_REALM_CLIENT_ADMIN` and press "Add selected"

   ... ada->Role Mappings->Client Roles->"DemoProjectAngularFrontendClient"

   Select role `ROLE_REALM_CLIENT_ADMIN` and press "Add selected"<br>
   Select role `ROLE_REALM_CLIENT_SELLER` and press "Add selected"

   ... selma->Role Mappings->Client Roles->"DemoProjectAngularFrontendClient"

   Select role `ROLE_REALM_CLIENT_SELLER` and press "Add selected"

   ... bud->Role Mappings->Client Roles->"DemoProjectAngularFrontendClient"

   Select role `ROLE_REALM_CLIENT_BUYER` and press "Add se

##### Update Keycloak's Client Authenticator Secret in the Code

Open the `'environment.ts` files (at least for DEV) and set the correct (your) Keycloak's "client-secret".

Note, that the (in case of a manual setup) correct client secret can be found at<br>

DemoProjectRealm->Configure->Clients->Account->"Credentials"

## DEV TOOLS

### Code Analysis

1. The backend's Sonarqube instance can be shared and will hold two projects, the backend and this frontend project,
once the frontend code analysis has been executed the first time.

2. Run test with code coverage (to update Sonarqubes coverage information).

        $ ng test --code-coverage

3. Execute Sonarqube's code analysis.

        $ npm run sonar

4. Navigate to the to http://localhost:9000 and enter the default credentials to inspect the results

    Username: `admin`<br>
    Password: `admin`

    More detailed information can be found on the official [Sonarqube](https://docs.sonarqube.org/latest/)
    and [Sonarqube Docker](https://hub.docker.com/_/sonarqube/) pages

    To customize the Sonarqube setup configuration adapt the `sonar-project.properties`.

### Development Server

Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change
any of the source files.

### Build Project

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag
for a production build.

### Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running End-to-End Tests (Not maintained)

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Running Sonarqube

Run `npm run sonar` to analyse and measure the code quality. To see the results navigate to http://localhost:9000.

Note, that the locally running Sonarqube server instance of the backend can be used here as well. To setup an instance
please have a look at the backend's readme.

## POTENTIAL ROAD MAP

+ Update to Angular 9.x
+ Error Handling
+ Buyer and seller content
+ Integration tests (Cypress and/or Protractor)
+ Redux (or a more lightweight solution)
+ Storybook
