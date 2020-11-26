import json

def restore_record():
	with open("record.txt", "w") as f:
		record = {"easy": 0, "normal": 0, "hard": 0}
		json.dump(record, f)
	return record