#!/usr/bin/env python3
from pymongo import MongoClient
from dataclasses import dataclass
from enum import Enum

"""
Connections: {"type": "ssh, ftp, tcp", "port": 22, "status": "failed, active, inactive", "ip": "192.167.1.24"}
Ports: {"number": 22}
"""


class ConnectionType(Enum):
    SSH = 0
    FTP = 1
    TCP = 2


class ConnectionStatus(Enum):
    FAILED = 0
    ACTIVE = 1
    INACTIVE = 2


class Connection:
    def __init__(self, connection_type: ConnectionType, port: int, status: str, ip: str):
        self.connection_type = connection_type
        self.port = port
        self.status = status
        self.ip = ip

    def __repr__(self):
        return f"Connection(connection_type={self.connection_type}, \
                 port={self.port}, status={self.status}, ip={self.ip})"


class Database:
    def __init__(self, host="localhost", port=27017):
        self.client = MongoClient(host, port)
        self.database = self.client["scry"]

        self.connections = self.database["connections"]
        self.ports = self.database["ports"]
        self.traffic = self.database["traffic"]

    def add_or_modify_connection(self, connection: Connection):
        # TODO: Sudo code

        # Check if the ip address has been added to the connections collection
        if (exists := self.connections.find({"ip": connection.port})) :
            exists.modify("check the status and modify it")

        else:
            self.connections.insert_one({connection: Connection})


to_be_delt_with_connections = []


def connection_checker():
    # Get the connected ip's

    # Get the connection type and port

    # Get the status

    # Make Connection object and it to
    # the to_be_delt_with_connections list
    pass
