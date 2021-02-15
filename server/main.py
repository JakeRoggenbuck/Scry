#!/usr/bin/env python3
from pymongo import MongoClient
from dataclasses import dataclass
from enum import Enum
import scrycommands


class Database:
    def __init__(self, host="localhost", port=27017):
        self.client = MongoClient(host, port)
        self.database = self.client["scry"]

        self.connections = self.database["connections"]
        self.ports = self.database["ports"]
        self.traffic = self.database["traffic"]


class Updater:
    def __init__(self):
        pass

    def check_ports(self):
        tcp_ports = scrycommands.netstat_listening_tcp()
        udp_ports = scrycommands.netstat_listening_udp()

        for port in tcp_ports + udp_ports:
            print(port)


if __name__ == "__main__":
    UPDATER = Updater()
    UPDATER.check_ports()
