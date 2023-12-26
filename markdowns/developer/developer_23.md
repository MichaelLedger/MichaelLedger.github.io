# Running Node.js Apps via Rancher Desktop build-in dockerd(moby) while Docker charges

## Express/Node introduction

Node (or more formally Node.js) is an open-source, cross-platform runtime environment that allows developers to create all kinds of server-side tools and applications in JavaScript. The runtime is intended for use outside of a browser context (i.e. running directly on a computer or server OS). As such, the environment omits browser-specific JavaScript APIs and adds support for more traditional OS APIs including HTTP and file system libraries.

From a web server development perspective Node has a number of benefits:

Great performance! Node was designed to optimize throughput and scalability in web applications and is a good solution for many common web-development problems (e.g. real-time web applications).
Code is written in "plain old JavaScript", which means that less time is spent dealing with "context shift" between languages when you're writing both client-side and server-side code.
JavaScript is a relatively new programming language and benefits from improvements in language design when compared to other traditional web-server languages (e.g. Python, PHP, etc.) Many other new and popular languages compile/convert into JavaScript so you can also use TypeScript, CoffeeScript, ClojureScript, Scala, LiveScript, etc.
The **node package manager (npm)** provides access to hundreds of thousands of reusable packages. It also has best-in-class dependency resolution and can also be used to automate most of the build toolchain.
Node.js is portable. It is available on Microsoft Windows, macOS, Linux, Solaris, FreeBSD, OpenBSD, WebOS, and NonStop OS. Furthermore, it is well-supported by many web hosting providers, that often provide specific infrastructure and documentation for hosting Node sites.
It has a very active third party ecosystem and developer community, with lots of people who are willing to help.
You can use Node.js to create a simple web server using the Node HTTP package.

### Hello Node.js

The following example creates a web server that listens for any kind of HTTP request on the URL http://127.0.0.1:8000/ — when a request is received, the script will respond with the string: "Hello World". If you have already installed node, you can follow these steps to try out the example:

- Open Terminal (on Windows, open the command line utility)

- Create the folder where you want to save the program, for example, `test-node` and then enter it by entering the following command into your terminal:
`cd test-node`

- Using your favorite text editor, create a file called hello.js and paste the following code into it:

```
// Load HTTP module
const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

// Create HTTP server
const server = http.createServer(function (req, res) {
  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Send the response body "Hello World"
  res.end("Hello World\n");
});

// Prints a log once the server starts listening
server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});

```

- Save the file in the folder you created above.

- Go back to the terminal and type the following command:
`node hello.js`

Finally, navigate to `http://localhost:8000` in your web browser; you should see the text "Hello World" in the upper left of an otherwise empty web page.

### Introducing Express

[Express](https://expressjs.com/) is the most popular Node web framework, and is the underlying library for a number of other popular Node web frameworks. It provides mechanisms to:

Write handlers for requests with different HTTP verbs at different URL paths (routes).
Integrate with "view" rendering engines in order to generate responses by inserting data into templates.
Set common web application settings like the port to use for connecting, and the location of templates that are used for rendering the response.
Add additional request processing "middleware" at any point within the request handling pipeline.

> What does Express code look like?

In a traditional data-driven website, a web application waits for HTTP requests from the web browser (or other client). When a request is received the application works out what action is needed based on the URL pattern and possibly associated information contained in POST data or GET data. Depending on what is required it may then read or write information from a database or perform other tasks required to satisfy the request. The application will then return a response to the web browser, often dynamically creating an HTML page for the browser to display by inserting the retrieved data into placeholders in an HTML template.

Express provides methods to specify what function is called for a particular HTTP verb (GET, POST, SET, etc.) and URL pattern ("Route"), and methods to specify what template ("view") engine is used, where template files are located, and what template to use to render a response. You can use Express middleware to add support for cookies, sessions, and users, getting POST/GET parameters, etc. You can use any database mechanism supported by Node (Express does not define any database-related behavior).

## [Install Rancher Desktop](https://docs.rancherdesktop.io/getting-started/installation)

[Container Management and Kubernetes on the Desktop](https://rancherdesktop.io)

## Configurations

Rancher Desktop -> Preferences -> Containter Engine -> dockerd(moby): Docker API; use with Docker CLI and k3d.

## Rancher Desktop - Hello World Example

**Example#1 - Build Image & Run Container**

```
mkdir hello-world
cd hello-world
vi Dockerfile
```

Populate the Dockerfile with the command below
```
FROM alpine  
CMD ["echo", "Hello World!!"]
```

Build and run the image for verification purposes
```
docker build --tag helloworld:v1.0 .
docker images | grep helloworld
docker run --rm helloworld:v1.0
# Remove the image
docker rmi helloworld:v1.0 
```

**Example#2 - Build Image & Deploy Container to Kubernetes**

Create a folder and add a sample index.html file as follows
```
mkdir nginx
cd nginx
echo "<h1>Hello World from NGINX!!</h1>" > index.html
vi Dockerfile
```

Populate the Dockerfile with the command below

```
FROM nginx:alpine
COPY . /usr/share/nginx/html
```

Build image from code locally

⚠️ Note: Please note that you need to pass the flag --namespace k8s.io to the nerdctl build command, so that nerdctl builds the image and then makes it available in the k8s.io namespace.

```
docker build --tag nginx-helloworld:latest .
docker images | grep nginx-helloworld
```

Deploy to Kubernetes

⚠️ Note: Please note that you need to pass the flag --image-pull-policy=Never to use a local image with :latest tag, as :latest tag will always try to pull the images from a remote repository.

```
kubectl run hello-world --image=nginx-helloworld:latest --image-pull-policy=Never --port=80
kubectl port-forward pods/hello-world 8080:80
```

**Delete the pod and the image**
```
kubectl delete pod hello-world 
# Remove the image
docker rmi nginx-helloworld:latest
```

## Containerizing a Node.js Application for Development With Docker Compose

**Defining Services with Docker Compose**

With your code refactored, you are ready to write the `docker-compose.yml` file with your service definitions. A service in Compose is a running container, and service definitions — which you will include in your docker-compose.yml file — contain information about how each container image will run. The Compose tool allows you to define multiple services to build multi-container applications.

Before defining your services, you will add a tool to your project called `wait-for` to ensure that your application only attempts to connect to your database once the database startup tasks are complete. This wrapper script uses netcat to poll whether a specific host and port are accepting TCP connections. Using it allows you to control your application’s attempts to connect to your database by testing whether the database is ready to accept connections.

Open a file called `wait-for.sh`:
`nano wait-for.sh`

Enter the following code into the file to create the polling function:
```
#!/bin/sh

# original script: https://github.com/eficode/wait-for/blob/master/wait-for

TIMEOUT=15
QUIET=0

echoerr() {
  if [ "$QUIET" -ne 1 ]; then printf "%s\n" "$*" 1>&2; fi
}

usage() {
  exitcode="$1"
  cat << USAGE >&2
Usage:
  $cmdname host:port [-t timeout] [-- command args]
  -q | --quiet                        Do not output any status messages
  -t TIMEOUT | --timeout=timeout      Timeout in seconds, zero for no timeout
  -- COMMAND ARGS                     Execute command with args after the test finishes
USAGE
  exit "$exitcode"
}

wait_for() {
  for i in `seq $TIMEOUT` ; do
    nc -z "$HOST" "$PORT" > /dev/null 2>&1
    
    result=$?
    if [ $result -eq 0 ] ; then
      if [ $# -gt 0 ] ; then
        exec "$@"
      fi
      exit 0
    fi
    sleep 1
  done
  echo "Operation timed out" >&2
  exit 1
}

while [ $# -gt 0 ]
do
  case "$1" in
    *:* )
    HOST=$(printf "%s\n" "$1"| cut -d : -f 1)
    PORT=$(printf "%s\n" "$1"| cut -d : -f 2)
    shift 1
    ;;
    -q | --quiet)
    QUIET=1
    shift 1
    ;;
    -t)
    TIMEOUT="$2"
    if [ "$TIMEOUT" = "" ]; then break; fi
    shift 2
    ;;
    --timeout=*)
    TIMEOUT="${1#*=}"
    shift 1
    ;;
    --)
    shift
    break
    ;;
    --help)
    usage 0
    ;;
    *)
    echoerr "Unknown argument: $1"
    usage 1
    ;;
  esac
done

if [ "$HOST" = "" -o "$PORT" = "" ]; then
  echoerr "Error: you need to provide a host and port to test."
  usage 2
fi

wait_for "$@"
```

Save and close the file when you are finished adding the code.

**Make the script executable**:

```
chmod +x wait-for.sh
```

Next, open the `docker-compose.yml` file:
```
nano docker-compose.yml
```

First, define the `nodejs` application service by adding the following code to the file:
```
version: '3'

services:
  nodejs:
    build:
      context: .
      dockerfile: Dockerfile
    image: nodejs
    container_name: nodejs
    restart: unless-stopped
    env_file: .env
    environment:
      - MONGO_USERNAME=$MONGO_USERNAME
      - MONGO_PASSWORD=$MONGO_PASSWORD
      - MONGO_HOSTNAME=db
      - MONGO_PORT=$MONGO_PORT
      - MONGO_DB=$MONGO_DB 
    ports:
      - "80:8080"
    volumes:
      - .:/home/node/app
      - node_modules:/home/node/app/node_modules
    networks:
      - app-network
    command: ./wait-for.sh db:27017 -- /home/node/app/node_modules/.bin/nodemon app.js
```

##  Testing the Application
With your docker-compose.yml file in place, you can create your services with the [docker-compose up](https://docs.docker.com/engine/reference/commandline/compose_up/) command. You can also test that your data will persist by stopping and removing your containers with docker-compose down.

First, build the container images and create the services by running docker-compose up with the `-d` flag, which will then run the nodejs and db containers in the background:

```
docker-compose up -d
```

You can also get more detailed information about the startup processes by displaying the log output from the services:
```
docker-compose logs
```

You can also check the status of your containers with [docker-compose ps](https://docs.docker.com/compose/reference/ps/):
```
docker-compose ps
```

With your services running, you can visit http://your_server_ip in the browser

## Build a Node.JS multi-stage Dockerfile to minify your production container size

What are multi-stage builds?
Multi-stage docker builds allows us to tag different stages of a build as standalone snapshots and use them progressively to build the final image. Docker also provides ways to copy files from one stage to another. This helps us minimize our final build by avoiding heavy OS and node development dependencies unnecessary for the final runtime.

For example, in order to run a custom Node.JS application, we first need to install any dependency modules before we can run it. And sometimes dependencies (like MongoDB) require native tools to build for your platform. Not only that; sometimes, we have a whole separate build tool for our client-side bundles like Webpack, Babel, linting, etc. So we can create a stage that pulls all of the necessary tools in to get the final result we want and then just simply copy the runtime files over to a new, empty final stage. Below, I’ll show a Dockerfile I use and explain it all step by step.

**Full Dockerfile**
Here’s the full file without comments.
```
FROM node:14-alpine AS base
RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node && chmod -R 770 /home/node
WORKDIR /home/node/app

FROM base AS builder-server
WORKDIR /home/node/app
RUN apk add --no-cache --virtual .build-deps git make python g++
COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./package-lock.json ./package-lock.json
USER node
RUN npm install --loglevel warn --production

FROM builder-server AS builder-client
WORKDIR /home/node/app
COPY --chown=node:node . ./
USER node
RUN npm install --loglevel warn && npm run build
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS production
WORKDIR /home/node/app
USER node
COPY --chown=node:node --from=builder-client /home/node/app/dist ./dist/
COPY --chown=node:node --from=builder-server /home/node/app/node_modules ./node_modules
COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./package-lock.json ./package-lock.json
COPY --chown=node:node ./assets ./assets
COPY --chown=node:node ./bin ./bin
COPY --chown=node:node ./src ./src
EXPOSE 3000
CMD ["npm", "start"]
```

## Running Node.js Apps with PM2

[PM2](https://pm2.keymetrics.io/) is a renowned open-source process manager tailored for Node.js applications. It acts as a guardian, streamlining deployment, overseeing logs, monitoring resources, and ensuring minimal downtime for every application it manages.

Random Dad Jokes

Learn the most commonly used features of PM2, and how to use it to deploy, manage, and scale your Node.js applications in production.

**Tutorial**: [How to Deploy, Manage and Scale Node.js Applications with PM2](https://betterstack.com/community/guides/scaling-nodejs/pm2-guide/).

🟢 Prerequisites

You must have Node.js and `npm` installed on your machine. This project was built against the following versions:

- Node.js v16.14.0.
- npm v8.3.1.

📦 Getting started

- Clone this repo to your machine:

```shell
git clone https://github.com/betterstack-community/dadjokes
```

- `cd` into the project folder and run `npm install` to download dependencies.
- Execute the command below to start the development server:

```
node server.js
```

- Visit `http://localhost:3000` in your browser.

⚖ License

The code used in this project and in the linked tutorial are licensed under the [Apache License, Version 2.0](LICENSE).

## Mine Exercise

Step1 - Run Rancher Desktop and set container engine as dockerd

Step2 - Cd your Node.js project root directory

Step3 - create your services with the `docker-compose up`

```
➜  UCD git:(master) ✗ docker-compose down
[+] Running 2/2
 ✔ Container ucd        Removed                                                                                                                      10.3s 
 ✔ Network ucd_default  Removed      
                                                                                                                  0.1s 
➜  UCD git:(master) ✗ docker-compose up -d
[+] Building 0.0s (0/0)                                                                                                             docker:rancher-desktop
[+] Running 2/2
 ✔ Network ucd_default  Created                                                                                                                       0.0s 
 ✔ Container ucd        Started                                                                                                                       0.0s 

➜  UCD git:(master) ✗ docker-compose logs 
ucd  | 
ucd  | up to date, audited 314 packages in 3s
ucd  | 
ucd  | 23 packages are looking for funding
ucd  |   run `npm fund` for details
ucd  | 
ucd  | 7 vulnerabilities (4 moderate, 2 high, 1 critical)
ucd  | 
ucd  | To address issues that do not require attention, run:
ucd  |   npm audit fix
ucd  | 
ucd  | To address all issues (including breaking changes), run:
ucd  |   npm audit fix --force
ucd  | 
ucd  | Run `npm audit` for details.
ucd  | 
ucd  |                         -------------
ucd  | 
ucd  | __/\\\\\\\\\\\\\____/\\\\____________/\\\\____/\\\\\\\\\_____
ucd  |  _\/\\\/////////\\\_\/\\\\\\________/\\\\\\__/\\\///////\\\___
ucd  |   _\/\\\_______\/\\\_\/\\\//\\\____/\\\//\\\_\///______\//\\\__
ucd  |    _\/\\\\\\\\\\\\\/__\/\\\\///\\\/\\\/_\/\\\___________/\\\/___
ucd  |     _\/\\\/////////____\/\\\__\///\\\/___\/\\\________/\\\//_____
ucd  |      _\/\\\_____________\/\\\____\///_____\/\\\_____/\\\//________
ucd  |       _\/\\\_____________\/\\\_____________\/\\\___/\\\/___________
ucd  |        _\/\\\_____________\/\\\_____________\/\\\__/\\\\\\\\\\\\\\\_
ucd  |         _\///______________\///______________\///__\///////////////__
ucd  | 
ucd  | 
ucd  |                           Runtime Edition
ucd  | 
ucd  |         PM2 is a Production Process Manager for Node.js applications
ucd  |                      with a built-in Load Balancer.
ucd  | 
ucd  |                 Start and Daemonize any application:
ucd  |                 $ pm2 start app.js
ucd  | 
ucd  |                 Load Balance 4 instances of api.js:
ucd  |                 $ pm2 start api.js -i 4
ucd  | 
ucd  |                 Monitor in production:
ucd  |                 $ pm2 monitor
ucd  | 
ucd  |                 Make pm2 auto-boot at server restart:
ucd  |                 $ pm2 startup
ucd  | 
ucd  |                 To go further checkout:
ucd  |                 http://pm2.io/
ucd  | 
ucd  | 
ucd  |                         -------------
ucd  | 
ucd  | [PM2] Spawning PM2 daemon with pm2_home=/root/.pm2
```

Step4 - Running Node.js Apps with `PM2`

```
pm2 start app.js --name my-api
pm2 logs
pm2 start ecosystem.config.js --only my-api --env dev
```

`pm2 start app.js -i 3`
*(3 – is the number of clusters you wish to have for your application)*

```
➜  UCD git:(master) pm2 monitor
[PM2 I/O] Please follow the popup or go to this URL : 
      https://id.keymetrics.io/api/oauth/authorize?client_id=138558311&response_mode=query&response_type=token&scope=all
[PM2 I/O] Successfully authenticated
[PM2 I/O] Successfully validated
[PM2 I/O] By default we allow you to trial PM2 Plus for 14 days without any credit card.
[PM2 I/O] Successfully created the bucket
[PM2 I/O] Using: Public key: s2gud6kpk8r7zhp | Private key: ndyax33ncwcpsy6 | Machine name: Gavins-MacBook-Pro-M1.local-a7d3
[+] PM2+ activated!
[PM2 I/O] Successfully connected to bucket PM2 Plus Monitoring
[PM2 I/O] You can use the web interface over there: https://app.pm2.io/#/bucket/6588ef954456a32cb45879bc
```

```
➜  UCD git:(master) ✗ pm2 list
⇆ PM2+ activated | Instance Name: Gavins-MacBook-Pro-M1.local-a7d3 | Dash: https://app.pm2.io/#/r/s2gud6kpk8r7zhp
┌────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ my-api    │ default     │ N/A     │ fork    │ 69672    │ 75s    │ 0    │ online    │ 0%       │ 51.5mb   │ gav… │ disabled │
└────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
➜  UCD git:(master) ✗ pm2 stop my-api
[PM2] Applying action stopProcessId on app [my-api](ids: [ 0 ])
[PM2] [my-api](0) ✓
⇆ PM2+ activated | Instance Name: Gavins-MacBook-Pro-M1.local-a7d3 | Dash: https://app.pm2.io/#/r/s2gud6kpk8r7zhp
┌────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ my-api    │ default     │ N/A     │ fork    │ 0        │ 0      │ 0    │ stopped   │ 0%       │ 0b       │ gav… │ disabled │
└────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
➜  UCD git:(master) ✗ pm2 delete my-api
[PM2] Applying action deleteProcessId on app [my-api](ids: [ 0 ])
[PM2] [my-api](0) ✓
⇆ PM2+ activated | Instance Name: Gavins-MacBook-Pro-M1.local-a7d3 | Dash: https://app.pm2.io/#/r/s2gud6kpk8r7zhp
┌────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
└────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```



In case you don't want to kill a particular process but pm2 itself using the command below:

```
➜  UCD git:(master) ✗ pm2 kill
[PM2] Applying action deleteProcessId on app [all](ids: [ 0 ])
[PM2] [my-api](0) ✓
[PM2] [v] All Applications Stopped
[PM2] [v] Agent Stopped
[PM2] [v] PM2 Daemon Stopped
```

## Issues - pm2 starts node app correctly , but I am not able to access the app in browser

I have installed pm2 using `npm install -g pm2` on my windows 10 x64.

I have a node app which I run using command `npm start`.

I wanted to profile that app , so I ran `pm2 start app.js`.

I can see in the console that pm2 starts process correctly. Now When I open the browser and type address as `http://localhost:3000` , my node app is not found.

I have checked & app runs fine when I run my app using `npm start`.

any inputs?

**Resolution**

Check logs of your app in `/.pm2/logs/` and pm2 log in `~/.pm2/pm2.log`

To run npm start with pm2:

`$ pm2 start npm -- start`

## Issues - macOS Big Sur: Something always takes my port 80. Going to `http://localhost/` gives "It works!"

This fails when I `docker-compose up -d` because it says that port 80 is already taken.

After restarting my mac indeed this mysterious thing is up and running but I have no idea what is it. Docker itself is off. Vagrant is off.

PS. When I map different port:
```
ports:
  - 81:80
```
Then `http://localhost:81` shows my stuff with no issues whatsoever.

**Resolution**

**The safe resolution is specify a port number in `docker-compose.yml` for pm2.**

Dockerfile
```
EXPOSE 80
```

docker-compose.yml

```
version: "3"

services:
  ucd:
    build: ./
    image: planetart_ucd:1.1
    container_name: ucd
    command: sh -c 'cd /var/www/UCD && npm i && pm2 start ecosystem.config.js && node watch.js'
    ports:
      - 8081:80
    volumes: 
      - ./:/var/www/UCD
```

**`ports:- 8081:80` means specify port number '8081' instead of '80'**

your root service location is: `http://localhost:8081`

your specific subpath url looks like: `http://localhost:8081/test/cw-collage.html`

You can use an environment variable. For example:

`NODE_PORT=3002 pm2 start -i 0 app.js`

Here is how to read the value in app:

`console.log(process.env.NODE_PORT);`

Or, if you are building an Express app:

`PORT=3002 pm2 start -i 0 ./bin/www`

Express loads `PORT` automatically when the application starts.


An easy way of telling your server application on which port to run is through PM2's ecosystem configuration files.

Inside ecosystem.config.js you specify one entry object for each server instance you want to launch through PM2.

The point is that you can also specify environment vars for the different processes and that way you can setup $PORT for all the processes. The following is an example config for three different processes.

```
module.exports = {
  apps : [
  {
    name      : "Main API server",
    script    : "./backend/dist/main.js",
    instances : "2",
    exec_mode : "cluster",
    env: {
      NODE_ENV: "production",
      PORT: 4300    
    }
  },
  {
    name      : "Worker server 1",
    script    : "./backend-worker/dist/main.js",
    instances : "1",
    exec_mode : "fork",
    env: {
      NODE_ENV: "production",
      PORT: 4000,
    },
    
  },
  {
    name      : "Worker server 2",
    script    : "./backend-worker/dist/main.js",
    instances : "1",
    exec_mode : "fork",
    env: {
      NODE_ENV: "production",
      PORT: 4001,
    }
  },
  ]
}
```

One note: This configuration uses PM2 as a loadbalancer for the first process that runs as cluster on two cores. The other (worker-)processes are run each on is on process on the specified port.

An example snippet of server startup code using the environment $PORT var for a NodeJS server is following:

```
// ...
const port = (process.env.PORT) ? process.env.PORT : 4300

console.log('$PORT: ', port)
const server = await app.listen(port, '0.0.0.0')
// ...
```

When you have all in place you simply call following to startup your servers:

`pm2 start ecosystem.config.js`

--------

OK, I've found information that Big Sur is shipped with Apache preinstalled.

macOS 11.0 Big Sur comes with Apache 2.4 pre-installed.
Stop it with: `sudo apachectl stop`

Prevent auto start with: `sudo launchctl unload -w /System/Library/LaunchDaemons/org.apache.httpd.plist 2>/dev/null`

EDIT:

I've added -w - this will prevent the job from being loaded after macOS restarts.

You need to run these commands as root to show other users' processes, for example:
```
sudo lsof -i ':80'
➜  UCD git:(master) ✗ sudo lsof -i ':80'
Password:
COMMAND  PID       USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
DingTalk 705 gavin   66u  IPv4 0x83a4fe24cfbd158d      0t0  TCP 10.x.x.xx:51825->203.107.1.35:http (CLOSE_WAIT)
DingTalk 705 gavin  220u  IPv4 0x83a4fe24cfbc0545      0t0  TCP 10.x.x.xx:50677->203.107.1.33:http (CLOSE_WAIT)
```
Mac OS X includes an Apache web server that can be controlled using apachectl as root. It's usually started via launchd, the corresponding configuration file is /System/Library/LaunchAgents/org.apache.httpd.plist. If it's not this Apache running on port 80, it is probably launchd, Apple's implementation of a daemon manager.

## PM2 - CheatSheet

Here are some commands that are worth knowing. Just try them with a sample application or with your current web application on your development machine:

```
# Fork mode
pm2 start app.js --name my-api # Name process

# Cluster mode
pm2 start app.js -i 0        # Will start maximum processes with LB depending on available CPUs
pm2 start app.js -i max      # Same as above, but deprecated.
pm2 scale app +3             # Scales `app` up by 3 workers
pm2 scale app 2              # Scales `app` up or down to 2 workers total

# Listing

pm2 list               # Display all processes status
pm2 jlist              # Print process list in raw JSON
pm2 prettylist         # Print process list in beautified JSON

pm2 describe 0         # Display all information about a specific process

pm2 monit              # Monitor all processes

# Logs

pm2 logs [--raw]       # Display all processes logs in streaming
pm2 flush              # Empty all log files
pm2 reloadLogs         # Reload all logs

# Actions

pm2 stop all           # Stop all processes
pm2 restart all        # Restart all processes

pm2 reload all         # Will 0s downtime reload (for NETWORKED apps)

pm2 stop 0             # Stop specific process id
pm2 restart 0          # Restart specific process id

pm2 delete 0           # Will remove process from pm2 list
pm2 delete all         # Will remove all processes from pm2 list

# Misc

pm2 reset <process>    # Reset meta data (restarted time...)
pm2 updatePM2          # Update in memory pm2
pm2 ping               # Ensure pm2 daemon has been launched
pm2 sendSignal SIGUSR2 my-app # Send system signal to script
pm2 start app.js --no-daemon
pm2 start app.js --no-vizion
pm2 start app.js --no-autorestart
```

**How to update PM2**
Install the latest pm2 version:
`npm install pm2@latest -g`

Then update the in-memory PM2 :
`pm2 update`

## Extensions

[PhpStorm - The Lightning-Smart PHP IDE](https://www.jetbrains.com/phpstorm/)

## Git或者ReadME中的URL包含@等特殊符号导致无法解析

正常使用git clone 的方式

`git clone https：//remote`

使用带用户名密码的方式（可以避免后续每次都要输入用户名密码）

`git clone https://[username]:[password]@/remote`

但有时会出现用户名或密码中含有像@这样的特殊符号，而不能被正常解析

我们需要通过下面方式 `urlencode` 进行重新编码
```
String c = URLEncoder.encode("@","utf-8");
System.out.println(c);

console -> %40
```
所有这样就可以知道 `@` 在 url 中需要写成 `%40` 的形式

[在线URLEncode编码工具](https://uutool.cn/urlencode/)

## Reference
[Express/Node introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)
[Rancher Desktop - Hello World Example](https://docs.rancherdesktop.io/how-to-guides/hello-world-example/)
[Containerizing a Node.js Application for Development With Docker Compose](https://www.digitalocean.com/community/tutorials/containerizing-a-node-js-application-for-development-with-docker-compose)
[docker compose up](https://docs.docker.com/engine/reference/commandline/compose_up/)
[Build a Node.JS multi-stage Dockerfile to minify your production container size](https://iws.io/2020/multi-stage-node-buid-with-react-client)
[Running Node.js Apps with PM2 (Complete Guide)](https://betterstack.com/community/guides/scaling-nodejs/pm2-guide/)
[dadjokes](https://github.com/betterstack-community/dadjokes)
[How to kill the pm2 --no-daemon process](https://stackoverflow.com/questions/45204172/how-to-kill-the-pm2-no-daemon-process)
[macOS Big Sur: Something always takes my port 80](https://stackoverflow.com/questions/65764662/macos-big-sur-something-always-takes-my-port-80-going-to-http-localhost-giv)
[No idea what is listening on port 80 in OS X](https://superuser.com/questions/597398/no-idea-what-is-listening-on-port-80-in-os-x)
[pm2 starts node app correctly , but I am not able to access the app in browser](https://github.com/Unitech/pm2/issues/2555)
[How to specify a port number for pm2](https://stackoverflow.com/questions/31502351/how-to-specify-a-port-number-for-pm2)
[Use PM2 To Start and Manage Your Node Apps](https://medium.com/%40mackenzie.sampson/use-pm2-to-manage-your-node-apps-and-keep-them-online-24-7-1a2e43feb2d6)
[PM2 Process Management Quick Start](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)
[git clone 带用户名密码的形式但包含@等特殊符号无法正常解析](https://www.cnblogs.com/cxsy/p/7793704.html)
