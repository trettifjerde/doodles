LARGE, SMALL = "large", "small"
PLUS, MINUS = "+", "-"
SIZE, SIGN = 0, 1
COLORS = ("red", "green", "blue")

FORMULAS = (
	((LARGE, PLUS), (LARGE, PLUS), (LARGE, PLUS)),
	((LARGE, MINUS), (SMALL, MINUS), (SMALL, PLUS)),
	((SMALL, PLUS), (SMALL, MINUS), (LARGE, PLUS)),
	((LARGE, MINUS), (LARGE, MINUS), (LARGE, MINUS)),
	((SMALL, MINUS), (LARGE, PLUS), (SMALL, PLUS)),
	((LARGE, PLUS), (SMALL, PLUS), (SMALL, MINUS)),
	((SMALL, MINUS), (SMALL, PLUS), (LARGE, MINUS)),
	((SMALL, PLUS), (LARGE, MINUS), (SMALL, MINUS)),
)
INGREDIENT_NAMES = {"sprout", "feather", "root", "mushroom", "scorpion", "claws", "flower", "toad"}
POTIONS = {"".join((c, s)) for c in COLORS for s in [PLUS, MINUS]}.union({"neutral"})

class Ingredient():
	def __init__(self, name):
		self.name = name
		self.formula = None
		self.options = set(FORMULAS)

	def __repr__(self):
		if self.formula:
			formula = ""
			for i in range(3):
				formula += f"{COLORS[i]} {''.join(info for info in self.formula[i])} "
			return f"{self.name.upper()}: {formula}"

		else:
			return f"{self.name}: {len(self.options)} options"

	def __eq__(self, other):
		return isinstance(other, Ingredient) and self.name == other.name

	def __hash__(self):
		return hash((hash("ingredient"), hash(self.name)))

	def assign_formula(self):
		if len(self.options) == 1:
			self.formula = self.options.pop()

class Game():
	def __init__(self):
		self.ingredients = {Ingredient(name) for name in INGREDIENT_NAMES}
		self.connections = {potion: set() for potion in POTIONS}
		self.formulas = set(FORMULAS)

	def print(self):
		for ing in self.ingredients:
			print(ing)

	def get_ing(self, name):
		for ing in self.ingredients:
			if ing.name == name:
				return ing


	def get_input(self):
		s = input("What you've learnt: ")

		if s == "q":
			return s

		info = tuple(e.lower() for e in s.split())

		if len(info) != 3:
			raise ValueError
		if info[0] not in INGREDIENT_NAMES or info[1] not in INGREDIENT_NAMES:
			raise ValueError
		if info[2] not in POTIONS:
			raise ValueError

		return info

	def solved(self):
		return not self.formulas

	def register_potion(self, info):
		name1, name2, potion = info
		ing1 = self.get_ing(name1)
		ing2 = self.get_ing(name2)

		ing1.con

if __name__ == "__main__":
	g = Game()
	while not g.solved():
		try:
			info = g.get_input()
			if info == "q":
				break
			g.register_potion(info)
		except:
			print("wrong format")

