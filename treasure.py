from flask import Flask, jsonify, request

app = Flask(__name__)

# 模拟玩家信息
player_info = {
    "name": "Player1",
    "level": 1,
    "totalScore": 0
}

# 模拟得分历史
score_history = []

@app.route('/get_player_info', methods=['GET'])
def get_player_info():
    return jsonify(player_info)

@app.route('/update_score', methods=['POST'])
def update_score():
    data = request.json
    score = data.get('score')
    if score is not None:
        player_info['totalScore'] += score
        score_history.append(score)
        return jsonify({"message": "Score updated successfully"})
    else:
        return jsonify({"error": "Invalid score data"}), 400

if __name__ == '__main__':
    app.run(debug=True)
