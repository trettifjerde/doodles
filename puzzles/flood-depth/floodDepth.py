def solution(landscape):
    def get_highest_point(start, end):
        info = {'height': 0, 'index': -1}

        for index in range(start, end):
            if (height := landscape[index]) > info['height']:
                info['height'] = height
                info['index'] = index

        return info if info['height'] > 0 else None
    
    def get_max_depth(p1, p2):
        max_depth = 0

        lower_height = min(p1['height'], p2['height'])

        for i in range(p1['index'], p2['index']):

            if (depth := (lower_height - landscape[i])) > max_depth:
                max_depth = depth

        return max_depth
    
    absolute_max_depth = 0
    landscape_length = len(landscape)
    highest_point = get_highest_point(0, len(landscape))

    if highest_point is not None:
        left_height = get_highest_point(0, highest_point['index'])
        right_height = get_highest_point(highest_point['index'] + 1, landscape_length)

        if left_height is not None:
            left_depth = get_max_depth(left_height, highest_point)
            outer_left_depth = solution(landscape[0:left_height['index']])
            absolute_max_depth = max(absolute_max_depth, left_depth, outer_left_depth)

        if right_height is not None:
            right_depth = get_max_depth(highest_point, right_height)
            outer_right_depth = solution(landscape[right_height['index']:])
            absolute_max_depth = max(absolute_max_depth, right_depth, outer_right_depth)

    return absolute_max_depth

print(solution([1, 3, 2, 1, 2, 1, 6, 3, 3, 4, 2, 10]))