# Chronacc-tr

Chronacc is time tracking system. It is a pat project, which helps me to try new tools and approaches. 

### Plan first to do:

- [ ] Clean data transformation
- [ ] Check client structure
- [ ] Check server structure
- [ ] Add tags

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

