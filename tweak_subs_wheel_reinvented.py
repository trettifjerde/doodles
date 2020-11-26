# Does the same as "tweak_subs.py",
# but without using datetime module:
# calculates HH:MM:SS shift mathematically

import sys
import re

tweak = 0
timing_pattern = re.compile('\d\d:\d\d:\d\d')
timing_format = "%H:%M:%S"

def main():
	fin, fout = assert_args(sys.argv)
	try:
		with open(fin, "r", encoding="utf-8-sig") as source, open(fout, "w", encoding="utf-8") as target:
			for line in source:
				target.write(process_line(line))
	except FileNotFoundError:
		sys.exit(f"No such file: {fin}")
	except PermissionError:
		sys.exit(f"Persission denied: {fin}")
	else:
		print(f"Success. Adjusted subtitles name: {fout}")

def assert_args(args):
	# assigns filenames + sets the tweak
	if len(args) != 3:
		sys.exit("Usage: tweak_subs.py source seconds_to_tweak")
	try:
		n = int(args[2])
	except ValueError:
		sys.exit("Seconds_to_tweak should be a number")

	global tweak
	tweak = n
	fin = args[1]
	dot = fin.rfind(".")
	fout = fin[:dot] + f"_{tweak}s" + fin[dot:]

	return fin, fout

def process_line(line):
	return re.sub(timing_pattern, shift, line)

def shift(matchobj):
	t = [int(n) for n in matchobj.group(0).split(":")[::-1]]
	adjust_time(t, tweak)
	t = ["{:0>2}".format(n) for n in t[::-1]]
	return ":".join(t)

def adjust_time(t, n, i=0):
	# t is a list of secs, mins, hours as ints
	# n is the needed tweak
	if i == len(t):
		return
	n, t[i] = divmod(t[i] + n, 60)
	adjust_time(t, n, i+1)

if __name__ == "__main__":
	main()