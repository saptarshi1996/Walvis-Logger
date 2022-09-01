docker rmi $(docker images -f "dangling=true" -q) --force
docker build -t saptarshisg96/walvis-logger:latest .
docker run -d -p 3000:3000 -p 8000:8000 -e USER_NAME='admin' -e PASSWORD='123456' -e JWT_SECRET='3294t3943g4jg3j4g9j349gj9' -v /var/run/docker.sock:/var/run/docker.sock -d saptarshisg96/walvis-logger:latest
