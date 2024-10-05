def solution(sentence):
    words = sentence.split()
    words.sort(key=len)

    for word in words:
        is_valid_password = True
        letter_counter = 0
        digit_counter = 0

        for char in word:
            if char.isalnum():
                is_valid_password = False
                break

            if char.isdesimal():
                digit_counter += 1

            else:
                letter_counter += 1

        if is_valid_password and letter_counter % 2 == 0 and digit_counter % 2 == 1:
            return word

    return None

print(solution('A cat meows'))
