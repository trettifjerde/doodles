import pygame.font
import json

class Scoreboard():
	def __init__(self, game):
		self.screen = game.screen
		self.screen_rect = game.screen_rect
		self.settings = game.settings
		self.stats = game.stats
		self.score = "0"

		self.text_color = (30, 30, 30)
		self.font = pygame.font.SysFont(None, 48)

	def set_rect(self):
		self.score_img = self.font.render(self.score, True,
			self.text_color, self.settings.bg_color)
		self.score_rect = self.score_img.get_rect()
		self.score_rect.top = 20
		self.make_rect_tweak()

	def make_rect_tweak(self):
		pass

	def show_score(self):
		self.score_img = self.font.render(self.score, True,
			self.text_color, self.settings.bg_color)
		self.screen.blit(self.score_img, self.score_rect)

class Lives(Scoreboard):
	def __init__(self, game):
		super().__init__(game)
		self.score = "LIVES"
		self.set_rect()

	def make_rect_tweak(self):
		self.score_rect.left = self.screen_rect.left + 20

	def adjust_score(self):
		self.score = str(self.stats.lives)

class Record(Scoreboard):
	def __init__(self, game):
		super().__init__(game)
		self.score = "HIGH SCORE"
		self.set_rect()

	def make_rect_tweak(self):
		self.score_rect.centerx = self.screen_rect.centerx

	def adjust_score(self):
		self.score = str(self.settings.record)

class Score(Scoreboard):
	def __init__(self, game):
		super().__init__(game)
		self.score = "SCORE"
		self.set_rect()

	def make_rect_tweak(self):
		self.score_rect.right = self.screen_rect.right - 20

	def adjust_score(self):
		self.score = str(self.stats.score)
		self.set_rect()

class Level(Scoreboard):
	def __init__(self, game):
		super().__init__(game)
		self.score = "LEVEL"
		self.set_rect()

	def make_rect_tweak(self):
		self.score_rect.top += self.score_rect.height
		self.score_rect.right = self.screen_rect.right - 20

	def adjust_score(self):
		self.score = str(self.stats.level)
		self.set_rect()