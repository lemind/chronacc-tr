# Chronacc-tr

Chronacc-tr is a time tracking system. It is a pet project, which helps me to try new tools and approaches.

Live version here - https://chronacc-tr.herokuapp.com/

### Plan first to do:

- [x] Add styles
- [ ] Check client structure
- [ ] Check server structure
- [ ] Add tags
- [ ] Solve code ToDos
- [ ] Add auth
- [ ] Add missing tests

## How to start it

#### What the software you should install before use

_docker docker-compose_


#### Mongo image
```
docker pull mongo
```

### Generate docker images

#### Server image
```
cd server
docker build -t webapp-server .
```

#### Client image
```
cd client
docker build -t webapp-client .
```

#### Start
```
docker-compose up
```

##### Open in browser
http://localhost:8090/

