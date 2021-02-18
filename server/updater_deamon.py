#!/usr/bin/env python3
from database import Database
import scrycommands
from time import sleep
import rt


class Updater:
    def __init__(self):
        self.db = Database()
        self.program_support = scrycommands.test_program_support()

    def get_device_info(self):
        info = scrycommands.device_info().__dict__
        self.db.database.drop_collection("device_info")
        self.db.device_info.insert_one(info)

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
        traffic_instances = [x.__dict__ for x in scrycommands.network_traffic()]
        self.db.network_traffic.insert_many(traffic_instances)

    def check_storage(self):
        storage = scrycommands.storage()
        for device in storage:
            found = self.db.storage.find_one(device.__dict__)
            if not found:
                self.db.storage.insert_one(device.__dict__)

    def check_usage(self):
        usage = scrycommands.get_cpu_usage()
        for percent in usage:
            found = self.db.usage.find_one(percent.__dict__)
            if not found:
                self.db.usage.insert_one(percent.__dict__)

    def get_uptime(self):
        uptime = scrycommands.get_uptime()
        for time in uptime:
            found = self.db.uptime.find_one(time.__dict__)
            if not found:
                self.db.uptime.insert_one(time.__dict__)

    def add_tracker(self):
        tracker = scrycommands.tracker()
        for ticket in tracker:
            found = self.db.tracker.find_one(ticket.__dict__)
            if not found:
                self.db.tracker.insert_one(ticket.__dict__)

    def update_loop(self):
        # On startup
        self.get_device_info()
        # Loops for seconds in 5 minutes
        for x in range(0, 60 * 5):
            # Every 30 seconds
            if x % 30 == 0:
                if self.program_support.has_who:
                    self.check_users()

                if self.program_support.has_netstat:
                    self.check_ports()

            if x % 60 == 0:
                self.check_ssh_login()

            if x % 300 == 0:
                if self.program_support.has_df:
                    self.check_storage()

            sleep(1)


if __name__ == "__main__":
    UPDATER = Updater()
    UPDATER.update_loop()
