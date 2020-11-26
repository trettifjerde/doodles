'''
Purpose:
	- adjusts subtitles timing by any number of seconds

Usage:
	- needs to be run from terminal
	- accepts 2 sys args: 1) source filepath 2) timing adjustment in seconds

Return value:
	- returns nothing
	- creates a copy of the source file with adjusted timing
		- new file is created in the source file directory
'''
import sys
import re
from datetime import datetime, timedelta

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
	except:
		sys.exit(f"Unexpected error: {sys.exc_info()}")
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
	tweak = timedelta(seconds=n)

	fin = args[1]
	dot = fin.rfind(".")
	fout = fin[:dot] + f"_{n}s" + fin[dot:]

	return fin, fout

def process_line(line):
	return re.sub(timing_pattern, shift, line)

def shift(matchobj):
	dt = datetime.strptime(matchobj.group(0), timing_format) + tweak
	return dt.strftime(timing_format)

if __name__ == "__main__":
	main()