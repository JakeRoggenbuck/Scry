import subprocess
from dataclasses import dataclass


LOG_FILE = open("error.log", "w")


@dataclass
class Who:
    user: str
    pts: str
    date: str
    time: str
    ip: str


@dataclass
class Netstat:
    proto: str
    recv: str
    send: str
    local: str
    foreign: str
    state: str


@dataclass
class LoginSSH:
    month: str
    day: int
    time: str
    device: str
    pid: str
    message: str
    user: str
    ip: str
    port: int
    name: str


def wrapper(command):
    try:
        output = subprocess.check_output(command, stderr=LOG_FILE, shell=True)
        return str(output, "UTF-8").rstrip("\n")
    except:
        return None


def seperate(wrapper_output: str):
    return [x.split() for x in wrapper_output.split("\n")]


def who():
    return [Who(*x) for x in seperate(wrapper("who"))]


def netstat_listening_tcp():
    return [Netstat(*x) for x in seperate(wrapper("netstat -lt"))[2:]]


def netstat_listening_udp():
    return [Netstat(*x) for x in seperate(wrapper("netstat -lu"))[2:]]


def failed_login():
    output = wrapper("grep 'Failed password' /var/log/auth.log")
    if output is not None:
        output = seperate(output)
        _all = []
        for x in output:
            new = x[0:6] + x[8:9] + x[10:11] + x[12:]
            _all.append(LoginSSH(*new))
        return _all


def accepted_login():
    output = wrapper("grep 'Accepted password' /var/log/auth.log")
    if output is not None:
        output = seperate(output)
        _all = []
        for x in output:
            new = x[0:6] + x[8:9] + x[10:11] + x[12:]
            _all.append(LoginSSH(*new))
        return _all
