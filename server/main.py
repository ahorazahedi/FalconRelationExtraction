import uuid
from flask import Flask
from flask import request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from jobs import Job, Jobs

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

jobs_instance = Jobs()

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('server_response', {'message': 'Connected to server'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on("extract-relation")
def handle_client_msg(msg):
    user_sid = request.sid
    abstract_text = msg['text']
    
    
    print(user_sid)
    print(abstract_text)
    
    new_job = Job(abstract_text   , user_sid )
    jobs_instance.add_job(new_job)

if __name__ == '__main__':
    socketio.run(app)
