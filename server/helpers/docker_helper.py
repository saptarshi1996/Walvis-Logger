from posixpath import split
import docker


def get_client() -> docker.DockerClient:

    """
    Get the client by socket
    """

    return docker.DockerClient(base_url="unix://var/run/docker.sock")


def list_containers() -> list:

    """
    List all containers by name and id
    """

    try:
        containers = get_client().containers.list()
        container_list = []
        for container in containers:
            container_list.append(
                {"id": container.id, "name": container.name, "status": container.status}
            )

        return container_list

    except (ValueError, KeyError):
        return []


def split_by_date(log) -> dict:

    """[summary]
    Split time and messge of docker container by date.

    Returns:
        [type]: [description]
    """

    time, *message_list = log.split(" ")
    message = " ".join(message_list)
    if message:

        date, time = time.split("T")
        date_time = date + " " + time[0:8]

        return {
            "timestamp": date_time,
            "message": message,
        }


def download_logs(id) -> dict:

    """[summary]
    Download docker logs and convert them to json or list

    [args]
    [int] id of container

    Returns:
        [type]: [description]
    """

    logs = get_client().containers.get(id).logs(timestamps=True)
    log_list = logs.decode("utf-8").split("\n")
    log_array = list(map(split_by_date, log_list))

    if len(log_array) == 0:
        return {"logs": []}

    log_array = filter(lambda x: x, log_array)
    return {"logs": list(log_array)}
