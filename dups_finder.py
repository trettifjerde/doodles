'''
Purpose 
	to search for duplicates of a given extension
Usage
	needs to be run from terminal
	accepts 2 sys arguments: 1) root directory 2) file extension 
	e.g.: python dups_finder.py C:\\Users\\User .png
Scope
	starts from a given root directory
	searches through all its subdirectories
Return value
	returns nothing, instead:

	1) prints the following statistics in the terminal:
		- runtime
		- total number of encountered files
		- number of files of the given extension
		- number of errors 
		- number of duplicates

	2) offers to print N entries from the error log:
		- prompts user for N
		- prints N entries info:
			a) path to the file that caused error 
			b) error message
		- offers to store the error log into a txt file

	3) does the same for the duplicates log
'''
import os
import sys
from time import gmtime, strftime, perf_counter as pc

def main():

	assert_args(sys.argv)

	rootdir, extension = sys.argv[1], sys.argv[2]

	stats = {
		"rootdir": rootdir, # e.g. "c:\absolute\path", STR
		"extension": extension, # STR 
		"hashes": {}, # {md5 hash: [filepath, filepath]}, DICT {STR: LIST[STR]}
		"errors": [], # [(filepath, error message)], LIST[TUPLE(STR, STR)]
		"duplicates": [], # [[path, path], [path, path, path]], LIST[LIST[STR]]
		"total_files": 0, 
	}

	for root, _, files in os.walk(rootdir):
		for file in files:
			stats["total_files"] += 1
			if file.endswith(extension):
				path = os.path.join(root, file)
				res = hashfile(path)
				if len(res) == 3:
					key = res[1]
					stats["hashes"].setdefault(key, []).append(path)
				else:
					message = " ".join(res)
					stats["errors"].append((path, message))

	stats["duplicates"] = [dups for dups in stats["hashes"].values() if len(dups) > 1]

	print_stats(stats)

def assert_args(args):
	# 2 sys args are given
	if len(args) != 3:
		sys.exit("Usage: dups_finder.py directory extension")
	# rootdir exists
	if not os.access(args[1], os.F_OK):
		sys.exit("Directory is not found")
	# rootdir is readable
	if not os.access(args[1], os.R_OK):
		sys.exit("Access denied")

def hashfile(path):
	# returns either a file's hash or error message
	cmd = f'@certutil -hashfile "{path}" MD5'
	res = os.popen(cmd).readlines()
	return res

def print_stats(stats):
	# prints total statistics
	# prints both logs
	# offers to export the logs as txt
	output_info = make_ouput_info(stats)
	print(output_info, end="")
	
	for logname in ["duplicates", "errors"]:
		print_log(stats[logname], logname)
		export_log(stats, logname, output_info)

def make_ouput_info(stats):
	ouput = f'''RESULTS FOR {stats["rootdir"].upper()}

Time running: {strftime("%H:%M:%S", gmtime(pc()))}
Files in total: {stats["total_files"]}
{stats["extension"]} files: {len(stats["hashes"])}
Duplicates found: {len(stats["duplicates"])}
Errors occurred: {len(stats["errors"])}\n'''
	return ouput

def print_log(log, logname):
	if len(log) == 0:
		return

	q = assert_valid_int(log, f"\nHow many {logname} print out? ")

	for entry in assemble_entries(log, q):
		print(entry)

def assert_valid_int(log, input_str):
	while True:
		try:
			q = int(input(input_str))
			if q < 0:
				print("Please, enter a positive number")
				continue
			elif q > len(log):
				q = len(log)
			break
		except ValueError:
			print("Please, insert a number.")
	return q

def assemble_entries(log, q=""):
	if q == "":
		q = len(log)

	entries = []
	for n, entry in enumerate((log[i] for i in range(q)), 1):
		info = f"\t{n}\n"
		for line in entry:
			info += "\t" + line + "\n"
		entries.append(info)
	return entries

def export_log(stats, logname, output_info):
	log = stats[logname]

	if len(log) == 0:
		return

	while True:
		q = input(f"\nExport the {logname} log as txt? [y/n] ")

		if q.lower() in ["n", "no"]:
			break

		elif q.lower() in ["y", "yes"]:
			try: 
				out_name = f"{logname}_log.txt"

				with open(out_name, "a") as f:
					f.write(output_info)
					for entry in assemble_entries(stats[logname]):
						f.write(f"{entry}\n")

				print(f"\nSuccess. The log is saved at {os.getcwd()}\\{out_name}")
			except:
				print("Oops. Something went wrong while writing the file.")
			break
		else:
			print('Please, enter "y" or "n"')

if __name__ == "__main__":
	main()