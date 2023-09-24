import sys

LARGE, SMALL = "large", "small"
PLUS, MINUS = "+", "-"
SIZE, SIGN = 0, 1
FORMULAS = dict(
	e1 = ((LARGE, PLUS), (LARGE, PLUS), (LARGE, PLUS)),
	e2 = ((LARGE, MINUS), (SMALL, MINUS), (SMALL, PLUS)),
	e3 = ((SMALL, PLUS), (SMALL, MINUS), (LARGE, PLUS)),
	e4 = ((LARGE, MINUS), (LARGE, MINUS), (LARGE, MINUS)),
	e5 = ((SMALL, MINUS), (LARGE, PLUS), (SMALL, PLUS)),
	e6 = ((LARGE, PLUS), (SMALL, PLUS), (SMALL, MINUS)),
	e7 = ((SMALL, MINUS), (SMALL, PLUS), (LARGE, MINUS)),
	e8 = ((SMALL, PLUS), (LARGE, MINUS), (SMALL, MINUS)),
)
COLORS = ["red", "green", "blue"]
INGREDIENT_NAMES = {"sprout", "feather", "root", "mushroom", "scorpion", "claws", "flower", "toad"}
POTIONS = {"".join((c, s)) for c in COLORS for s in ["+", "-"]}.union({"neutral", "-", "+"})

def color_name(c):
	return COLORS[c]

def color_index(color):
	return COLORS.index(color)

def opposite(info):
	if info in [SMALL, LARGE]:
		return LARGE if info == SMALL else SMALL
	else:
		return PLUS if info == MINUS else MINUS

class Molecule:
	def __init__(self, red=(None, None), green=(None, None), blue=(None, None)):
		self.formula = [[*red], [*green], [*blue]]

	def __repr__(self):
		s = ""
		for i in range(3):
			atom = ""
			for trait in self.formula[i]:
				if trait:
					atom += f"{trait}"
			if atom:
				s += f"{color_name(i)} {atom} "
		return s

	def __eq__(self, other):
		return isinstance(other, Molecule) and self.formula == other.formula

	def __hash__(self):
		return hash(("molecule", hash(tuple(tuple(atom) for atom in self.formula))))

	def is_neutral(self, other):
		count = 0
		for color in range(3):
			if (self.formula[color][SIZE] == other.formula[color][SIZE] and 
				self.formula[color][SIGN] != other.formula[color][SIGN]):
				count += 1
		return count == 3

	def contradicts(self, other):
		for c in range(3):
			for s in range(2):
				if self.formula[c][s] and self.formula[c][s] != other.formula[c][s]:
					return True
		return False

class Ingredient:
	def __init__(self, name):
		self.name = name
		self.molecule = Molecule()
		self.options = set(Molecule(*FORMULAS[f]) for f in FORMULAS)

	def __repr__(self):
		if self.complete():
			s = f"{self.name.upper()}: {self.molecule}"
		else:
			s = f"{self.name}: {self.molecule}. options: {len(self.options)}"
		return s

	def complete(self):
		return len(self.options) == 0

	def eliminate_options(self, c, s, info):
		self.molecule.formula[c][s] = info
		for option in self.options.copy():
			if option.formula[c][s] != info:
				self.options.remove(option)

	def eliminate_molecule(self, mol):
		if mol in self.options.copy():
			self.options.remove(mol)

	def get_neutral_mol(self):
		print(self.molecule)
		for f in FORMULAS:
			mol = Molecule(*FORMULAS[f])
			print(mol)
			if self.molecule.is_neutral(mol):
				return mol

	def find_neutral_pairs(self, other):
		possible_pairs = []
		for mol1 in self.options:
			for mol2 in other.options:
				if mol1 == mol2:
					continue
				if mol1.is_neutral(mol2):
					possible_pairs.append({self: mol1, other: mol2})
		if len(possible_pairs) == 1:
			return (possible_pairs[0][self], possible_pairs[0][other])
		else:
			return None, None

	def examine_options(self):
		updated = False
		for c in range(3):
			for s in range(2):
				if self.molecule.formula[c][s]:
					continue
				values = [option.formula[c][s] for option in self.options]
				# if atom config is the same in all the possible formulas
				if values.count(values[0]) == len(values):
					self.molecule.formula[c][s] = values[0]
					updated = True
		return updated

	def assign_opposites(self, other, c, s):
		s1, s2 = (ing.molecule.formula[c][s] for ing in [self, other])
		# no info can be extracted
		if ((s1 and s2) or (not s1 and not s2)):
			return False
		# assign opposite to the other ingredient
		ing = other if s1 else self
		info = opposite((s1 or s2))
		ing.eliminate_options(c, s, info)
		return True

class Game:
	def __init__(self):
		self.ingredients = {Ingredient(name) for name in INGREDIENT_NAMES}
		self.molecules = set(Molecule(*FORMULAS[f]) for f in FORMULAS)
		self.connections = {potion: set() for potion in POTIONS}

	def __repr__(self):
		for i in self.ingredients:
			return "\n".join((str(v) for v in self.ingredients))

	def get_input(self):
		s = input("Write what you learnt: ")
		if s == "q":
			return s
		info = tuple(e.lower().strip() for e in s.split())
		if len(info) != 3:
			raise ValueError
		if info[0] not in INGREDIENT_NAMES or info[1] not in INGREDIENT_NAMES or info[2] not in POTIONS:
			raise ValueError
		if info[0] == info[1]:
			raise ValueError
		return info

	def get_ing(self, name):
		for i in self.ingredients:
			if i.name == name:
				return i

	def add_knowledge(self, info):
		name1, name2, potion = info
		ing1, ing2 = self.get_ing(name1), self.get_ing(name2)
		if potion == "neutral":
			self.register_neutral_potion(ing1, ing2)
		elif potion in ["+", "-"]:
			raise NotImplementedError
		else:
			self.register_color_potion(ing1, ing2, potion)

	def register_color_potion(self, ing1, ing2, potion):
		c = color_index(potion[:-1])
		sign = potion[-1]
		for ing in [ing1, ing2]:
			if ing.molecule.formula[c][SIGN] and ing.molecule.formula[c][SIGN] != sign:
				print(f"{ing}: contradictory info")
				return
		for ing in [ing1, ing2]:
			ing.eliminate_options(c, SIGN, sign)
		self.connections[potion].add((ing1, ing2))

	def register_neutral_potion(self, ing1, ing2):
		for ing in [ing1, ing2]:
			for pair in self.connections["neutral"]:
				if ing in pair:
					print(f"New info contradicts the knowledge")
					return
		self.connections["neutral"].add((ing1, ing2))

	def assign_molecule(self, ing, mol):
		if ing.molecule.contradicts(mol):
			return
		ing.molecule = mol
		ing.options = set()
		self.molecules.remove(mol)
		for i in self.ingredients:
			i.eliminate_molecule(mol)

	def examine_neutrals(self):
		updated = False
		for ing1, ing2 in self.connections["neutral"]:
			for c in range(3):
				updated = updated or ing1.assign_opposites(ing2, c, SIGN)
		return updated

	def try_to_find_neutral_mols(self):
		updated = False
		for ing1, ing2 in self.connections["neutral"]:
			if ing1.complete() and ing2.complete():
				continue
			if ing1.complete(): 
				print(f"{ing1} is complete")
				self.assign_molecule(ing2, ing1.get_neutral_mol())
				updated = True
			elif ing2.complete():
				print(f"{ing2} is complete")
				self.assign_molecule(ing1, ing2.get_neutral_mol())
				updated = True
			else:
				mol1, mol2 = ing1.find_neutral_pairs(ing2)
				if mol1:
					if not ing1.complete():
						self.assign_molecule(ing1, mol1)
					if not ing2.complete():
						self.assign_molecule(ing2, mol2)
					updated = True
		return updated

	def examine_colors(self):
		'''

		'''
		updated = False
		for connection in self.connections.keys() - {"neutral", "+", "-"}:
			c = color_index(connection[:-1])
			for ing1, ing2 in self.connections[connection]:
				updated = updated or ing1.assign_opposites(ing2, c, SIZE)
		return updated

	def examine_options(self):
		''' 
		Loops through ingredients, looping through its eventual formulas.
		Checks whether there's an atom trait that every potential formula has in common.
		If so, puts this trait into the actual formula.
		'''
		updated = 0
		for ing in self.ingredients:
			if not ing.complete() and len(ing.options) > 1:
				updated += ing.examine_options()
		return updated

	def check_if_ing_last_option(self, ing):
		if len(ing.options) == 1:
			self.assign_molecule(ing, ing.options.pop())
			return True
		return False

	def check_if_mol_last_option(self):
		updated = False
		for mol in self.molecules:
			ings = [ing for ing in self.ingredients if mol in ing.options]
			if len(ings) == 1:
				self.assign_molecule(ings[0], mol)
				updated = True
				break
		return updated

	def make_inference(self):
		# examine options to find common traits
		# examine colored potions to identify sized
		# examine neutrals to identify exact formulas
		counter = 0
		while True:
			updated = False + self.examine_colors() 
			updated += self.examine_neutrals()
			updated += self.examine_options() 
			updated += self.try_to_find_neutral_mols()
			for ing in self.ingredients:
				updated += self.check_if_ing_last_option(ing)
			#print("checking last mol options")
			updated += self.check_if_mol_last_option()
			counter += 1
			if not updated:
				break
		print(counter)

	def solved(self):
		return all(i.complete() for i in self.ingredients) 

def main():
	g = Game()
	while not g.solved():
		try:
			info = g.get_input()
			if info == "q":
				break
			g.add_knowledge(info)
			g.make_inference()
			print(g, end="\n\n")
		except ValueError:
			print("wrong format")

main()