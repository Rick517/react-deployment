from flask import Flask, jsonify, request

from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

tasks = [
    {
      'id': 1,
      'text': 'Wash dishes',
      'date': "Feb 15 at 12:00",
      'reminder': False,
    },
    {
      'id': 2,
      'text': 'Go for a walk',
      'date': "Feb 15 at 12:30",
      'reminder': False,
    },
    {
      'id': 3,
      'text': 'Complete homework',
      'date': "Feb 15 at 8:00",
      'reminder': False,
    }
]

@app.route('/')
def heartbeat():
    return jsonify({"message": "I'm alive!"}), 200

@app.route('/api', methods=['GET'])
def get_tasks():
    print('Got get request.')
    return jsonify(tasks), 200

@app.route('/api', methods=['POST'])
def add_task():
    data = request.get_json().get('task')
    tasks.append(data)
    return jsonify({'message': "OK"}), 201

@app.route('/api', methods=['PUT'])
def change_reminder():
    id, reminder = request.get_json().get('id'), request.get_json().get('reminder')
    task = next((task for task in tasks if task['id'] == id), None)
    if task:
        task['reminder'] = reminder
        return jsonify({'task': task}), 200
    else:
        return jsonify({"error": "Task not found"}), 404
    
@app.route('/api', methods=['DELETE'])
def delete_task():
    print('Got delete request.')
    id = request.get_json().get('id')
    
    for i in range(len(tasks)):
        if tasks[i]['id'] == id:
            del tasks[i]
            return jsonify({'message': 'Task deleted'}), 204
    return jsonify({"error": "Task not found"}), 404

@app.route('/api/task/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = next((task for task in tasks if task['id'] == task_id), None)
    if task:
        return jsonify(task), 200
    else:
        return jsonify({"error": "Task not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)


