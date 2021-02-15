import subprocess


LOG_FILE = open("error.log", "w")


def wrapper(func):
    def inner():
        command = func()
        output = subprocess.check_output(command, stderr=LOG_FILE, shell=True)
        return str(output.strip(), "UTF-8")

    return inner


@wrapper
def who():
    return "who"


@wrapper
def netstat_listening_tcp():
    return "netstat -lt"


@wrapper
def netstat_listening_udp():
    return "netstat -lu"


@wrapper
def failed_login():
    return "grep 'Failed password' /var/log/auth.log"


@wrapper
def accepted_login():
    return "grep 'Accepted password' /var/log/auth.log"
