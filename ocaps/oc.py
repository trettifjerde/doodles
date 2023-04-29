import os
import json
import re
from datetime import datetime

filenames = filter(lambda a: a.endswith('json'), os.listdir())
tag_exp = r'\[(\w+)\]'

tag_dates = dict()

for filename in filenames:
    with open(filename, encoding='utf-8') as file:
        mission_date = datetime.strptime((filename[0:10]), '%Y_%m_%d')
        mission_date_str = mission_date.strftime('%d/%m/%Y')
        timestamp = int(mission_date.timestamp())

        ocap = json.load(file)
        units = [ent for ent in ocap['entities'] if ent['type'] == 'unit']
        names = set()
        for unit in units:
            positions = unit['positions']
            for position in positions:
                if position[5] == 1 and position[2] == 1:
                    names.add(position[4])

        for name in names:
            tag_match = re.match(tag_exp, name)
            tag = ''
            if tag_match:
                tag = tag_match.group(1)
                if (not tag in tag_dates):
                    tag_dates[tag] = [mission_date_str, timestamp]
                elif tag_dates[tag][1] > timestamp:
                    tag_dates[tag] = [mission_date_str, timestamp]

sorted_tags_info = sorted([[key, info[0], info[1]] for key, info in tag_dates.items()], key= lambda info: info[2])

with open('squads_info.txt', mode='w') as txt:
    for tag, date, timestamp in sorted_tags_info:
        txt.write(f'{tag}: {date} {timestamp}\n')
