# D4-homework-Backend
期中作業

## Getting Started

### Redis server required

With Docker:
```
sudo docker run --rm -d -p 6379:6379 redis

sudo docker run --name mongo4 -v $(pwd)/data:/data/db -d -p 27017:27017 --rm mongo:4.1
```
### Usage

```
git clone 
cd /
npm i 
npm start
```

Now, visit [http://localhost:3000/api/draw/random](http://localhost:3000/api/draw/random).

I use curl for checking response headers. `curl -v http://localhost:3000/api/draw/random`
