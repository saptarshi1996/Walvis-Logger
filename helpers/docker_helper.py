import docker


def get_client():

    """
        Get the client by socket
    """

    return docker.DockerClient(base_url="unix://var/run/docker.sock")


def list_containers():

    """
        List all containers by name and id
    """

    containers = get_client().containers.list()
    container_list = []
    for container in containers:
        container_list.append({
            "id": container.id,
            "name": container.name
        })

    return container_list
