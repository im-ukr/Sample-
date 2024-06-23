from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
import random

app = Flask(__name__)
CORS(app)  # Apply CORS to your Flask app

class Resident:
    def __init__(self, id):
        self.id = id
        self.trusts = set()
        self.trusted_by = set()

    def __str__(self):
        return f"Resident {self.id}"

class TownJudgeGame:
    def __init__(self, num_residents):
        self.residents = [Resident(i) for i in range(num_residents)]
        self.town_judge = random.choice(self.residents)
        self.generate_relationships()

    def generate_relationships(self):
        for resident in self.residents:
            if resident != self.town_judge:
                resident.trusts.add(self.town_judge)
                self.town_judge.trusted_by.add(resident)

    def check_town_judge(self, resident_id):
        return self.residents[resident_id] == self.town_judge

    def get_residents_and_trusts(self):
        residents_info = []
        for resident in self.residents:
            residents_info.append({
                'id': resident.id,
                'trusts': [str(trusted_resident) for trusted_resident in resident.trusts]
            })
        return residents_info

game = TownJudgeGame(5)  # Initialize game with 5 residents

@app.route('/check_town_judge', methods=['POST'])
def check_town_judge():
    data = request.json
    resident_id = int(data['resident_id'])
    is_town_judge = game.check_town_judge(resident_id)
    return jsonify({'is_town_judge': is_town_judge})

@app.route('/residents', methods=['GET'])
def get_residents():
    residents_info = game.get_residents_and_trusts()
    return jsonify(residents_info)

if __name__ == '__main__':
    app.run(debug=True)
