[![codecov](https://codecov.io/gh/yiwei72/ECE651/branch/main/graph/badge.svg?token=1AZGLUY11I)](https://codecov.io/gh/yiwei72/ECE651)
[![backend_format](https://github.com/yiwei72/ECE651/actions/workflows/backend_format.yml/badge.svg?branch=main)](https://github.com/yiwei72/ECE651/actions/workflows/backend_format.yml)
[![backend_test](https://github.com/yiwei72/ECE651/actions/workflows/backend_test.yml/badge.svg?branch=main)](https://github.com/yiwei72/ECE651/actions/workflows/backend_test.yml)
[![frontend_test_format](https://github.com/yiwei72/ECE651/actions/workflows/frontend_test_format.yml/badge.svg?branch=main)](https://github.com/yiwei72/ECE651/actions/workflows/frontend_test_format.yml)
# Setups:
1. clone the repo to your local directory
2. **Windows/Mac:** install Docker Desktop
3. **Linux:** 
```
    sudo apt-get update
    sudo apt-get install docker.io # install docker
    sudo curl -SL https://github.com/docker/compose/releases/download/v2.15.1/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo usermod -aG docker $USER
```
<br/><br/>

# How to work on the project:
## Switch to a new branch. Do not work on the "main" branch.

### Windows/Mac/Linux:
1. use `cd` command to go into the project code directory (Windows: powershell, Mac/Linux: terminal).
2. run `docker-compose up`. The docker containers will keep running in the terminal. It does not stop.
3. Open "127.0.0.1" on your browser and do your test/checking. Modify your code. Then run `docker-compose build`.
5. After you are done, use "ctrl + c" to terminate the docker containers.
<br/><br/>

# How to run tests and get test coverage reports locally:
## Frontend:
1. `cd frontent` to change directory into the frontend
2. run `npm install`, `npm run build` and `npm test` in that order for the first time. Only run `npm run build` and `npm test` afterwards, unless there is a package version change.
3. open `frontend/coverage/lcov-report/index.html` to view the coverage report.

## Backend:
1. `cd backend`
2. run `mvn clean test jacoco:report`
3. open `backend/target/site/jacoco-ut/index.html` to view the coverage report.


<br/><br/>
# AWS Database login:
- Endpoint: database-1.cbifqpta8wxq.us-east-2.rds.amazonaws.com
- Port: 3306
- Username: admin
- Password: ECE651123
