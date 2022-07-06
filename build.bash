docker rmi $(sudo docker images -f "dangling=true" -q) --force
docker build -t saptarshi/walvis-logger .
docker run -p 8000:8000 -v /var/run/docker.sock:/var/run/docker.sock -d saptarshi/walvis-logger
