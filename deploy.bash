if [ "$1" == "on" ]; then

    echo "Deploying app with docker"
    docker-compose up --build -d

    # Remove dangling container
    # shellcheck disable=SC2046
    docker rmi $(docker images -f "dangling=true" -q)

elif [ "$1" == "off" ]; then

    echo "Stopping docker deployment"
    docker-compose down

fi
