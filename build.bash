docker rmi $(docker images -f "dangling=true" -q) --force
docker build -t saptarshisg96/walvis-logger:latest .
docker run -p 8000:8000 -e END_POINT='/logger' -v /var/run/docker.sock:/var/run/docker.sock -d saptarshisg96/walvis-logger:latest
