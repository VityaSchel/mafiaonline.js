import requests, socket, json
from utils import tags
from utils import md5hash

class Client:

	def __init__(self, email, password):
		self.account = None
		self.token = None
		self.id = None
		self.md5hash = md5hash.Client()
		self.tags = tags.Client()
		self.create_connection()
		self.signin("1316eefdd6dc27a9", email, self.md5hash.md5Salt(password))
		
	def signin(self, d, e, pw):
		self.send_server(self.tags.auth_by_email(d, e, pw))
		self.account = self.listen()["uu"]
		self.token   = self.account["t"]
		self.id      = self.account["o"]
		return self.account

	def friend_list(self):
		self.send_server(self.tags.acfl(self.token, self.id))
		return self.listen()

	def get_messages(self, friend_id):
		self.send_server(self.tags.acpc(self.token, self.id, friend_id))
		return self.listen()

	def join_global_chat(self):
		self.send_server(self.tags.acc(self.token, self.id))

	def send_message_friend(self, friend_id, content):
		self.send_server(self.tags.ac(friend_id))
		self.send_server(self.tags.pmc(friend_id, content))
		return self.listen()

	def send_message_global(self, content):
		self.send_server(self.tags.cmc(content))

	def get_user(self, user_id):
		self.send_server(self.tags.gup(user_id))
		return self.listen()

	def create_connection(self):
		self.client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		self.client_socket.connect(('46.175.171.134', 8090))

	def send_server(self, msg):
		msg += "\n"
		self.client_socket.send(msg.encode())

	def listen(self):
		result = self.client_socket.recv(1024).decode().replace("\n", "")

		result = json.loads(result[0:-1])

		return result
