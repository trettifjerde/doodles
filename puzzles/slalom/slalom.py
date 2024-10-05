def solution(points):
    memo = {}
    ski_call = ski_calc = memo_call = 0

    def get_next_point_is(start_i, turns_left):

        next_point_indexes = []

        if turns_left >= 0: 
            going_left = turns_left % 2 == 0
            start_pos = -1 if start_i < 0 else points[start_i]
            is_valid_next_point = (lambda pos1, pos2: pos2 > pos1) if going_left else (lambda pos1, pos2: pos1 > pos2)

            for i in range(start_i + 1, len(points)):
                next_pos = points[i]
                if is_valid_next_point(start_pos, next_pos):
                    next_point_indexes.append(i)
            
        return next_point_indexes
    
    def ski(turns_left, start_i = -1):

        nonlocal ski_call, ski_calc, memo_call

        ski_call += 1

        if (start_i >= len(points)):
            return {'path': [], 'score': 0}
        
        key = f'${start_i}-${turns_left}'

        if key in memo:
            memo_call += 1
            return memo[key]

        ski_calc += 1

        best_route = {'path': [], 'score': 0}

        for turn_opt in [turns_left, turns_left - 1]:
            next_point_indexes = get_next_point_is(start_i, turn_opt)

            for next_point_i in next_point_indexes:

                if (len(points) - next_point_i) <= best_route['score']:
                    break

                result = ski(turn_opt, next_point_i)

                if result['score'] > best_route['score']:
                    best_route = result

        if start_i >= 0:
            best_route = {
                'path': [start_i, *best_route['path']],
                'score': 1 + best_route['score']
            }
            memo[key] = best_route

        return best_route
    
    result = ski(2)
    print('memo len', len(memo))
    print('ski call', ski_call, 'ski calc', ski_calc, 'memo call', memo_call)
    return result

arr = [15, 13, 5, 7, 4, 10, 12, 8, 2, 11, 6, 9, 3]
# arr = [1, 5]

print(solution(arr))