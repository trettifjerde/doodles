with open('squad_dates.txt') as f:
    info = []
    for line in f.readlines():
        tag, date, stamp = line.strip().split(' ')
        info.append([tag[0: -1], date, stamp])
    
sorted_info = sorted(info, key= lambda info: info[2])

with open('squads.txt', mode='w') as txt:
    for line in sorted_info:
        txt.write('\t\t\t\t\t\t'.join(line) + '\n')
