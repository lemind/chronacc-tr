# Chronacc-tr

Chronacc is time a tracking system. It is a pet project, which helps me to try new tools and approaches.

Live version here - https://chronacc-tr.herokuapp.com/

### Plan first to do:

- [ ] Check client structure
- [ ] Check server structure
- [ ] Add tags
- [ ] Add styles

## How to start it

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

