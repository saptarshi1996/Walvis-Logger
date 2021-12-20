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

    try:
        containers = get_client().containers.list()
        container_list = []
        for container in containers:
            container_list.append({
                "id": container.id,
                "name": container.name,
                "status": container.status
            })

        return container_list

    except Exception as e:

        print(e)
        return []



def close_container_by_id(id):

    """
        Close any container by the container id.
    """

    try:
        get_client().containers.get(id).stop()
    except Exception as e:
        raise e
