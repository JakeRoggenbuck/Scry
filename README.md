# Scry
Scry is a web application that allows users to quickly check open ports, logins, and critical system information about their server from any web browser, anywhere. 

Scry consists of both a local server and a client. The server is responsible for gathering data about the system it's monitoring, then making it accessible to the client. The clients job is to present the data from the server, in an easy to use graphical interface in the browser.

<img src="https://github.com/JakeRoggenbuck/Scry/blob/main/images/main_page.png?raw=true"
     alt="Main Page" width="403" height="302" />

# Server
The server includes two main parts, the updater_deamon and the Scry Fastapi. First, the updater_deamon will run commands in the background to gather crucial information about the system and update it in the local database. The Scry Fastapi will allow the client to pull data using an internal web API to present the data in the browser.

### Requirements
#### Python
- The server code is located in `./server/`, go to this directory before the next step<br>
- Install using `pip3 install -r requirements.txt`
#### Non-Python
We use netstat and who for getting system information and Mongodb for our database<br>
Most systems come pre-installed with who, and possibly netstat but they may have to be installed separately

### Running
- Run `./start.sh` to run the updater_deamon.py in the background then it will run the scry.py Fastapi app

# Client
The client is a Node.js React app the pulls data from the local Scry web API and displays it.

### Requirements
- Install the requirements using `npm install` in the `./client/scry` directory.

### Running
- Then run it using `npm start`.

## Screenshots
![Main Page](https://github.com/JakeRoggenbuck/Scry/blob/main/images/main_page.png?raw=true)
![Ports](https://github.com/JakeRoggenbuck/Scry/blob/main/images/ports.png?raw=true)
![Users](https://github.com/JakeRoggenbuck/Scry/blob/main/images/users.png?raw=true)
![Main Page With Command Line](https://github.com/JakeRoggenbuck/Scry/blob/main/images/main_page_with_command_line.png?raw=true)

## Design process artifacts
### Original ideas
![First structure idea](https://github.com/JakeRoggenbuck/Scry/blob/main/images/original_system_design.png?raw=true)
### Original current designs
![Mongodb connection](https://github.com/JakeRoggenbuck/Scry/blob/main/images/using_mongodb_to_connect_the_two_apps.png?raw=true)
![Current system design](https://github.com/JakeRoggenbuck/Scry/blob/main/images/current_design.png?raw=true)
