#!/usr/bin/env python3
from pymongo import MongoClient
from dataclasses import dataclass
from enum import Enum
import scrycommands
from time import sleep


class Database:
    def __init__(self, host="localhost", port=27017):
        self.client = MongoClient(host, port)
        self.database = self.client["scry"]

        self.ports = self.database["ports"]
        self.ssh_logins = self.database["ssh_logins"]
        self.user_connections = self.database["user_connections"]
        self.network_traffic = self.database["network_traffic"]


class Updater:
    def __init__(self):
        self.db = Database()

    def check_ports(self):
        tcp_ports = scrycommands.netstat_listening_tcp()
        udp_ports = scrycommands.netstat_listening_udp()

        for port in tcp_ports + udp_ports:
            found = self.db.ports.find_one(port.__dict__)
            if not found:
                self.db.ports.insert_one(port.__dict__)

    def check_users(self):
        users = scrycommands.who()
        for user in users:
            found = self.db.user_connections.find_one(user.__dict__)
            if not found:
                self.db.user_connections.insert_one(user.__dict__)

    def check_ssh_login(self):
        failed = scrycommands.failed_login()
        accepted = scrycommands.accepted_login()

        if accepted is not None and failed is not None:

            for login in failed + accepted:
                found = self.db.ssh_logins.find_one(login.__dict__)
                if not found:
                    self.db.ssh_logins.insert_one(login.__dict__)

    def add_network_traffic(self):
        traffic_instances = scrycommands.network_traffic()
        for traffic in traffic_instances:
            self.db.network_traffic.insert_one(traffic.__dict__)

    def update_loop(self):
        # Loops for seconds in 5 minutes
        for x in range(0, 60 * 5):
            # Every Second
            if x % 1 == 0:
                # Network traffic disabled for now
                # self.add_network_traffic()
                pass


            # Every 30 seconds
            if x % 30 == 0:
                self.check_users()
                self.check_ports()

            if x % 60 == 0:
                self.check_ssh_login()

            sleep(1)


if __name__ == "__main__":
    UPDATER = Updater()
    UPDATER.update_loop()
