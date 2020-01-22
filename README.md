# Angular Demo Fe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Running Sonarqube

Run `ng run sonar` to analyse and measure the code quality. To see the results navigate to http://localhost:9000.

Note, that a locally running Sonarqube server instance is required. See 'Setup Sonarqube'.

### Setup Sonarqube

1. Get Sonarqube Docker image and run it in a Docker container.

        $ docker pull sonarqube
        $ docker run -d --name sonarqube -p 9000:9000 sonarqube

2. Run test with code coverage (to update Sonarqubes coverage information).

        $ ng test --code-coverage

3. Execute Sonarqube's code analysis.

        $ ng run sonar

3. Navigate to the to http://localhost:9000 and enter the default credentials to inspect the results
- Username: admin
- Password: admin

To customize the Sonarqube setup configuration adapt the `sonar-project.properties`.

More detailed information can be found on the official Sonarqube pages.
- https://docs.sonarqube.org/latest/
- https://hub.docker.com/_/sonarqube/
