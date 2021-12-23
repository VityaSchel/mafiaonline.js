import requests
import socket
import json
import threading
from utils import md5hash


class Client:

    def __init__(self, deviceId: str = "1316eefdd6dc27a9"):
        self.account = None
        self.token = None
        self.id = None
        self.deviceId = deviceId
        self.md5hash = md5hash.Client()
        self.data = []
        self.address = "37.143.8.68"
        self.create_connection()

    def sign_in(self, email: str, password: str):
        """
        Sign in into account

        **Parametrs**
            - **email** : Email of the account
            - **password** : Password of the account

        **Returns**
            - **Success** : list
        """
        data = {
            "d": self.deviceId,
            "ty": "sin",
            "e": email,
            "pw": self.md5hash.md5Salt(password)
        }
        self.send_server(data)
        self.account = self.listen()["uu"]
        self.token = self.account["t"]
        self.id = self.account["o"]
        return self.account

    def sign_up(self, nickname, email, password, language: str = "RUS"):
        """
        Sign up new account

        **Parametrs**
            - **nickname** : Nickname of the account
            - **email** : Email of the acount
            - **password** : Password of the account
            - **language** : Language

        **Returns**
            - **Success** : list
        """
        data = {
            "email": email,
            "username": nickname,
            "password": self.md5hash.md5Salt(password),
            "deviceId": self.deviceId,
            "lang": language
        }
        res = requests.post(f"http://{self.address}:8008/user/sign_up",
                            data=data,
                            headers={
                                "Content-Type": "application/x-www-form-urlencoded"
                                }
                            ).json()
        return res

    def friend_list(self):
        self.send_server({"ty":  "acfl"})
        return self.listen()

    def get_messages(self, friend_id):
        self.send_server({"ty":  "acpc", "fp": friend_id})
        return self.listen()

    def join_global_chat(self):
        self.send_server({"ty": "acc"})

    def leave_global_chat(self):
        self.dashboard()

    def dashboard(self):
        self.send_server({"ty": "acd"})

    def send_message_friend(self, friend_id, content):
        self.send_server({"ty": "ac", "fp": friend_id})
        self.send_server({"ty": "pmc", "m": {"fp": friend_id, "tx": content}})
        return self.listen()

    def send_message_global(self, content: str, message_style: int = 0):
        """
        Send message to global chat

        **Parametrs**
            - **content** - Content of message
            - **message_style** - Style of message
        """
        data = {
            "ty": "cmc",
            "m": {
                "tx": content,
                "mstl": message_style,
            }
        }
        self.send_server(data)

    def get_user(self, user_id):
        self.send_server({"ty": "gup"})
        return self.listen()

    def create_connection(self):
        self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.client_socket.connect((self.address, 8090))
        self.listener = threading.Thread(target=self.__listener).start()

    def __listener(self):
        while True:
            buffer = bytes()
            while True:
                r = self.client_socket.recv(2084)
                read = len(r)
                if read != -1:
                    i = read - 1
                    if r[i] == 0:
                        buffer = buffer + r
                        d = buffer.decode()
                        buffer = bytes()
                        for str in d.strip().split("[\u0000]"):
                            str = str.strip()[0:-1]
                            if str != "p":
                                print("DEBUG>>"+str)
                                self.data.append(str)
                    else:
                        buffer = buffer + r
                else:
                    return

    def send_server(self, j: list):
        j["t"] = self.token
        j["uo"] = self.id
        self.client_socket.send((json.dumps(j)+"\n").encode())

    def listen(self):
        while len(self.data) <= 0:
            pass
        res = self.data[0]
        del self.data[0]
        return json.loads(res)
