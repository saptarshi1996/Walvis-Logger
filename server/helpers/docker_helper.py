from posixpath import split
import docker
import re


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


def split_by_date(log):
    time, *message_list = log.split(" ")
    message = " ".join(message_list)
    if message:
        return {
            "time": time,
            "message": message,
        }


def download_json_logs(id, since, until):
    logs = get_client().containers.get(id).logs(timestamps=True)
    log_list = logs.decode("utf-8").split("\n")
    log_array = list(map(split_by_date, log_list))
    log_array = filter(lambda x : x, log_array)
    return list(log_array)


def download_excel_logs():
    pass
