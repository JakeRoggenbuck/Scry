#!/usr/bin/env python3
from pymongo import MongoClient


class Database:
    def __init__(self, host="localhost", port=27017):
        self.client = MongoClient(host, port)
        self.database = self.client["scry"]

        self.ports = self.database["ports"]
        self.ssh_logins = self.database["ssh_logins"]
        self.user_connections = self.database["user_connections"]
        self.network_traffic = self.database["network_traffic"]
        self.storage = self.database["storage"]
