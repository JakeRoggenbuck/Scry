import subprocess
from dataclasses import dataclass


LOG_FILE = open("error.log", "w")


@dataclass
class Who:
    user: str
    pts: str
    date: str
    time: str
    ip: str = "localhost"


@dataclass
class Netstat:
    proto: str
    recv: str
    send: str
    local: str = None
    foreign: str = None
    state: str = None
    _file: str = None


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
    invalid_user: bool = False


@dataclass
class TrafficInstance:
    name: str
    rx_pkts: int
    tx_pkts: int

    rx_rate: int
    tx_rate: int

    rx_pkts_drop: int
    tx_pkts_drop: int

    rx_over: int
    tx_coll: int


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
    return [Netstat(*x) for x in seperate(wrapper("netstat -lt"))[2:] if len(x) < 9]


def netstat_listening_udp():
    return [Netstat(*x) for x in seperate(wrapper("netstat -lu"))[2:] if len(x) < 9]


def failed_login():
    output = wrapper("grep 'Failed password' /var/log/auth.log")
    # Checks of the command return correctly
    if output is not None:
        output = seperate(output)
        _all = []
        for line in output:
            # Check for a length 14 variant of the returned output
            if len(line) == 14:
                # Gets the parts of the line needed to fill the dataclass apart
                # from the last parameters which has a default to false because
                # it checks if the login was by a different user and in this
                # case it will be only length 14, so it defaults to false
                new = line[0:6] + line[8:9] + line[10:11] + line[12:]

            # Check if the command returned the length 16 variant because it
            # has the extra (Wrong user) data in the line
            elif len(line) == 16:
                # Gets the actual pieces of the returned split list, these
                # things are the parameters needed for the dataclass

                new = line[0:6] + line[10:11] + line[12:13] + line[14:] + [True]

            _all.append(LoginSSH(*new))
        return _all


def accepted_login():
    output = wrapper("grep 'Accepted password' /var/log/auth.log")
    if output is not None:
        output = seperate(output)
        _all = []
        for x in output:
            # Adds the needed pieces of the return log file together to input
            # as parameters to the LoginSSH dataclass
            new = x[0:6] + x[8:9] + x[10:11] + x[12:]
            _all.append(LoginSSH(*new))
        return _all


def network_traffic():
    """
    #kernel
    Interface        RX Pkts/Rate    TX Pkts/Rate    RX Data/Rate    TX Data/Rate
                     RX Errs/Drop    TX Errs/Drop    RX Over/Rate    TX Coll/Rate
    lo               590 0           590 0           239618 0        239618 0
                     0 0             0 0             0 0             0 0
    enp0s31f6        18938 0         6951 0          26403K 0        755268 0
                     0 0             0 0             0 0             0 0
    """
    output = wrapper("ifstat")
    if output is not None:
        _all = []
        # Gets the actual data output without the headers
        output = seperate(output)[3:]
        index = 0
        # This will repeat for each pair of two lines for each interface
        while index < len(output):
            # Gets the main data line (Normal traffic)
            main = output[index]
            # Gets the name of the interface from the main line
            name = main[0]

            # Casts each value into an int if it is the first number in the
            # line, if you take a look at the output, the second number for
            # each is a is zero so we don't need that, so it checks the mod of
            # the num (Index) for each value and only adds it to the list if
            # it's the first item and not the zero
            traffic = []
            for num, x in enumerate(main[1:]):
                if (num - 1) % 2 == 1:
                    if x[-1] == "K":
                        x = int(x[0:-1]) * 1000
                    traffic.append(int(x))

            dropped = []
            for num, x in enumerate(output[index + 1]):
                if (num - 1) % 2 == 1:
                    if x[-1] == "K":
                        x = int(x[0:-1]) * 1000
                    dropped.append(int(x))

            _all.append(TrafficInstance(name, *traffic, *dropped))
            # Jumps two, to the next interface because each interface has two
            # lines of output
            index += 2

        return _all
