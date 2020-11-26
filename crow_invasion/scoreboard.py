import pygame.font
import json

class Scoreboard():
	def __init__(self, game):
		self.screen = game.screen
		self.screen_rect = game.screen_rect
		self.settings = game.settings
		self.stats = game.stats

		self.text_color = (30, 30, 30)
		self.font = pygame.font.SysFont(None, 48)

	def reg_rect_code(self):
		self.score_img = self.font.render(self.score_str, True,
			self.text_color, self.settings.bg_color)
		self.score_rect = self.score_img.get_rect()
		self.score_rect.top = 20

	def prep_score(self):
		self.score_str = str(self.stats.crows_killed)
		self.reg_rect_code()
		self.score_rect.right = self.screen_rect.right - 20

	def prep_lives(self):
		self.score_str = str(self.stats.cats_left)
		self.reg_rect_code()
		self.score_rect.left = self.screen_rect.left + 20

	def prep_record(self):
		self.score_str = str(self.settings.record)
		self.reg_rect_code()
		self.score_rect.centerx = self.screen_rect.centerx

	def prep_level(self):
		self.score_str = str(self.stats.level)
		self.reg_rect_code()
		self.score_rect.top += self.score_rect.height
		self.score_rect.right = self.screen_rect.right - 20

	def show_score(self):
		self.screen.blit(self.score_img, self.score_rect)