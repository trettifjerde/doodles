import json
import helpers

class Settings():
	def __init__(self):
		self.screen_width = 800
		self.screen_height = 600
		self.bg_color = (220, 220, 220)

		self.cat_jump_speed = 4.5
		self.cat_jump_height = 70

		self.bullet_speed = 9.0
		self.bullets_allowed = 100
		self.bullet_width = 2
		self.bullet_height = 15
		self.bullet_first = 4
		self.bullet_second = 15
		self.bullet_vert_padding = 17
		self.bullet_red = (200, 30, 30)
		self.bullet_green = (30, 200, 30)

		self.crow_padding_x = 50
		self.crow_padding_y = 10

		self.fleet_direction = 1

		self._set_default()

	def _set_easy(self):
		self.difficulty = "easy"
		self.record = self.get_record()
		self.cat_speed = 7.0
		self.cat_limit = 3
		self.crow_speed = 0.8
		self.speedup_scale = 1.2
		self.fleet_drop_speed = 10
		self.lives_number = 5

	def _set_hard(self):
		self.difficulty = "hard"
		self.record = self.get_record()
		self.cat_speed = 5.0
		self.cat_limit = 1
		self.crow_speed = 1.3
		self.speedup_scale = 1.5
		self.fleet_drop_speed = 25
		self.lives_number = 1

	def _set_default(self):
		self.difficulty = "normal"
		self.record = self.get_record()
		self.cat_speed = 5.0
		self.cat_limit = 1
		self.crow_speed = 1.0
		self.speedup_scale = 1.3
		self.fleet_drop_speed = 20
		self.lives_number = 3

	def get_record(self):
		try:
			with open("record.txt", "r") as f:
				records = json.load(f)
		except:
			records = helpers.restore_record()
		return int(records[self.difficulty])

class GameStats():
	def __init__(self, game):
		self.settings = game.settings
		self.reset_stats()
		self.game_active = False
		self.game_paused = False

	def reset_stats(self):
		self.cat_speed = self.settings.cat_speed
		self.lives = self.settings.cat_limit
		self.score = 0
		self.level = 1
		self.crow_speed = self.settings.crow_speed
		self.bullet_speed = self.settings.bullet_speed

	def increase_speed(self):
		self.crow_speed *= self.settings.speedup_scale
		self.bullet_speed *= self.settings.speedup_scale