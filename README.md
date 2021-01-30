# Chronacc-tr

[![Build Status](https://travis-ci.com/lemind/chronacc-tr.svg?branch=master)](https://travis-ci.com/lemind/chronacc-tr)

Chronacc-tr is a time tracking system. It is a pet project, which helps me to try new tools and approaches.

Live version here - https://chronacc-tr.herokuapp.com/

### Plan first to do:

- [x] Add auth
- [x] Extend main tests
- [ ] Add missing tests (in progress)
- [ ] POC GraphQL
- [ ] POC Try React Context like a state
- [x] Add styles
- [x] Check client structure
- [ ] Check server structure
- [ ] Add tags
- [ ] Arrange code ToDos

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

