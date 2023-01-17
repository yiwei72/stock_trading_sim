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

### Windows/Mac:
1. Open **Docker Desktop**
2. Select **Dev Environments** on the left panel
3. Click **Create a new environment** in the middle
4. Click **Get Started**
5. Under **Choose source**, select **Local directory** and put in where you cloned the repo.
6. Continue to the end & **wait** for the environment to finish preparation.
7. Open "127.0.0.1" on your browser and do your test/checking.
8. Under "Dev Environments", **Stop** the running env. **DO NOT DELETE**.
9. Modify your code.
10. After the code is modified, **Start** the running env.
11. back to step 7.

### Linux:
1. use `cd` command to go into the repo directory.
2. run `docker-compile up`. The docker containers will keep running in the terminal. It does not stop.
3. Open "127.0.0.1" on your browser and do your test/checking. Modify your code.
4. In the running terminal from step 2, use **ctrl+c** to end the docker container process.
5. back to step 2

<br/><br/>
# AWS Database login:
- Endpoint: database-1.cbifqpta8wxq.us-east-2.rds.amazonaws.com
- Port: 3306
- Username: admin
- Password: ECE651123