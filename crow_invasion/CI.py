import sys
from time import sleep
from random import randint
import json

import pygame

from settings import Settings, GameStats
from cat import Cat, Crow, Bullet
from button import Button, Difficulty_Button
from scoreboard import Scoreboard, Score, Lives, Level, Record

class CrowInvasion():
	def __init__(self):
		pygame.init()
		self.settings = Settings()
		self.stats = GameStats(self)
		self.screen = pygame.display.set_mode((0, 0), pygame.FULLSCREEN)
		self.settings.screen_width = self.screen.get_rect().width
		self.settings.screen_height = self.screen.get_rect().height
		self.screen_rect = self.screen.get_rect()
		pygame.display.set_caption("Crow Invasion")

		self.cat = Cat(self)
		self.score = Score(self)
		self.lives = Lives(self)
		self.record = Record(self)
		self.level = Level(self)
		self.info = [self.score, self.lives, self.record, self.level]
		self.play_button = Button(self, "NEW GAME")
		self.pause_button = Button(self, "GAME PAUSED")
		self.difficulty_default = Difficulty_Button(self, "NORMAL")
		self.difficulty_easy = Difficulty_Button(self, "EASY")
		self.difficulty_hard = Difficulty_Button (self, "HARD")

	def run_game(self):
		while True:
			self._check_events()

			if self.stats.game_active and not self.stats.game_paused:
				self.cat.update(self)
				self._update_bullets()
				self._update_crows()

			self._update_screen()

	def _check_events(self):
		for event in pygame.event.get():
			if event.type == pygame.QUIT:
				sys.exit()
			elif event.type == pygame.KEYDOWN:
				self._check_keydown_events(event)
			elif event.type == pygame.KEYUP:
				self._check_keyup_events(event)
			elif event.type == pygame.MOUSEBUTTONDOWN:
				mouse_pos = pygame.mouse.get_pos()
				self._check_click(mouse_pos)

	def _check_keydown_events(self, event):
		if event.key == pygame.K_ESCAPE:
			sys.exit()
		if self.stats.game_active:
			if event.key == pygame.K_LSHIFT:
				self.cat.green_mode = True
			if event.key == pygame.K_SPACE and not self.cat.jumping:
				self.cat.jumping = True
			if event.key == pygame.K_RIGHT or event.key == pygame.K_d:
				self.cat.moving_right = True
			elif event.key == pygame.K_LEFT or event.key == pygame.K_a:
				self.cat.moving_left = True
			elif event.key == pygame.K_RETURN:
				self._fire_bullet()
			elif event.key == pygame.K_q:
				self._fire_side(-1)
			elif event.key == pygame.K_e:
				self._fire_side(1)
			elif event.key == pygame.K_p:
				self._pause_unpause()
		elif event.key == pygame.K_p:
				self._start_game()

	def _check_keyup_events(self, event):
		if event.key == pygame.K_LSHIFT:
			self.cat.green_mode = False
		if event.key == pygame.K_RIGHT or event.key == pygame.K_d:
			self.cat.moving_right = False
		elif event.key == pygame.K_LEFT or event.key == pygame.K_a:
			self.cat.moving_left = False
		elif event.key == pygame.K_q or event.key == pygame.K_e or event.key == pygame.K_RETURN:
			self.cat.firing = False

	def _check_click(self, mouse_pos):
		if self.difficulty_default.rect.collidepoint(mouse_pos) and not self.stats.game_active:
			self.settings._set_default()
			self._start_game()
		elif self.difficulty_easy.rect.collidepoint(mouse_pos) and not self.stats.game_active:
			self.settings._set_easy()
			self._start_game()
		elif self.difficulty_hard.rect.collidepoint(mouse_pos) and not self.stats.game_active:
			self.settings._set_hard()
			self._start_game()
		elif self.play_button.rect.collidepoint(mouse_pos) and not self.stats.game_active:
			self._start_game()

	def _start_game(self):
		self.stats.reset_stats()
		self._prep_scoreboard()
		self._prep_new_round()
		self.stats.game_active = True
		pygame.mouse.set_visible(False)

	def _prep_scoreboard(self):
		for board in self.info:
			board.adjust_score()
			board.set_rect()

	def _prep_new_round(self):
		self.bullets = pygame.sprite.Group()
		self.crows = pygame.sprite.Group()
		self._create_fleet()
		self.cat.center_cat()

	def _create_fleet(self):
		crow = Crow(self)
		number_crows_x = (self.settings.screen_width 
			- self.settings.crow_padding_x) // (crow.width 
			+ self.settings.crow_padding_x)
		number_crows_y = (self.settings.screen_height - self.cat.rect.height
			- 3 * self.settings.crow_padding_y 
			- 4 * crow.height) // (crow.height 
			+ self.settings.crow_padding_y)

		lives_xy = []
		for _ in range(self.settings.lives_number):
			life_xy = None
			while not life_xy or life_xy in lives_xy:
				life_xy = (randint(0, number_crows_x - 1), 
					randint(0, number_crows_y - 1))
			lives_xy.append(life_xy)

		for row_number in range(number_crows_y):
			for crow_number in range(number_crows_x):
				if (crow_number, row_number) in lives_xy:
					self._create_crow(True, row_number, crow_number)
				else:
					self._create_crow(False, row_number, crow_number)

	def _create_crow(self, islife, row_number, crow_number):
		crow = Crow(self)
		if islife:
			crow.image = pygame.image.load("images/life.bmp")
			crow.islife = True
		crow.x = crow_number * (crow.width 
			+ self.settings.crow_padding_x) + self.settings.crow_padding_x
		crow.y = row_number * (crow.height 
			+ self.settings.crow_padding_y) + crow.height + self.settings.crow_padding_y
		crow.rect.x, crow.rect.y = int(crow.x), int(crow.y)
		self.crows.add(crow)

	def _pause_unpause(self):
		p = False if self.stats.game_paused else True
		self.stats.game_paused = p

	def _fire_bullet(self):
		self.cat.firing = True
		if self.cat.green_mode:
			first_bullet = Bullet(self, True, isfirst=True)
			second_bullet = Bullet(self, True, isfirst=False)
		else:
			first_bullet = Bullet(self, False, isfirst=True)
			second_bullet = Bullet(self, False, isfirst=False)
		self.bullets.add(first_bullet)
		self.bullets.add(second_bullet)

	def _fire_side(self, direction):
		self.cat.firing = True
		if self.cat.green_mode:
			bullet = Bullet(self, True, x_direction=direction)
		else:
			bullet = Bullet(self, False, x_direction=direction)
		self.cat.dir_now = True if direction == 1 else False
		self.bullets.add(bullet)

	def _update_bullets(self):
		self.bullets.update()
		for bullet in self.bullets.copy():
			if bullet.rect.bottom <= 0:
				self.bullets.remove(bullet)
		self._check_bullet_crow_collisions()

	def _check_bullet_crow_collisions(self):
		collisions = pygame.sprite.groupcollide(self.bullets, 
			self.crows, False, False)
		if collisions:
			self._handle_bullet_crow_collisions(collisions)

		if not self.crows:
			self._level_up()

	def _handle_bullet_crow_collisions(self, collisions):
		hitcrow = None
		lifegotten = None
		for bullet in collisions.keys():
			for crow in collisions[bullet]:
				if bullet.isgreen and crow.islife: # life vs green light
					if not lifegotten: # remember this life
						lifegotten = crow 
					elif lifegotten == crow: # check if it's the second bullet hitting this life
						continue
					self._cat_gets_life(crow)
				elif not bullet.isgreen and not crow.islife: # crow vs red light
					if not hitcrow:
						hitcrow = crow
					elif hitcrow == crow:
						continue
					self.stats.score += 1
					self.crows.remove(crow)
					self.score.adjust_score()
					if self.stats.score > self.settings.record:
						self.settings.record = self.stats.score
						with open("record.txt", "r") as f:
							records = json.load(f)
						records[self.settings.difficulty] = self.settings.record
						with open("record.txt", "w") as f:
							json.dump(records, f)
						self.record.adjust_score()
				elif not bullet.isgreen and crow.islife: # red light vs life
					self.crows.remove(crow)
				self.bullets.remove(bullet)

	def _level_up(self):
		self.stats.level += 1
		self.level.adjust_score()
		self.bullets.empty()
		self.stats.increase_speed()
		self._create_fleet()
		self.cat.center_cat()

	def _cat_gets_life(self, crow):
		self.stats.lives += 1
		self.crows.remove(crow)
		self.lives.adjust_score()

	def _update_crows(self):
		self._check_fleet_edges()
		self.crows.update()

		crow = pygame.sprite.spritecollideany(self.cat, self.crows)
		if crow:
			if crow.islife:
				self._cat_gets_life(crow)
			else:
				self._cat_hit()

		self._check_crows_bottom()

	def _check_fleet_edges(self):
		for crow in self.crows:
			if crow.check_edges():
				self._change_fleet_direction()
				break

	def _change_fleet_direction(self):
		for crow in self.crows:
			crow.rect.y += int(self.settings.fleet_drop_speed)
		self.settings.fleet_direction *= -1

	def _check_crows_bottom(self):
		for crow in self.crows:
			if crow.rect.bottom >= self.screen_rect.bottom:
				if crow.islife:
					self.crows.remove(crow)
				else:
					self._cat_hit()
					break

	def _cat_hit(self):
		self.stats.lives -= 1
		sleep(0.5)
		if self.stats.lives > 0:
			self.lives.adjust_score()
			self._prep_new_round()
		else:
			self.stats.game_active = False
			pygame.mouse.set_visible(True)

	def _update_screen(self):
		self.screen.fill(self.settings.bg_color)
		self.cat.blitme()
		for board in self.info:
			board.show_score()
		if not self.stats.game_active:
			self._draw_buttons()
		else:
			self._show_changing_bits()
		if self.stats.game_paused:
			self.pause_button.draw_button()
		pygame.display.flip()

	def _draw_buttons(self):
		self.play_button.draw_button()
		self.difficulty_easy.draw_button()
		self.difficulty_default.draw_button()
		self.difficulty_hard.draw_button()

	def _show_changing_bits(self):
		for bullet in self.bullets.sprites():
			bullet.draw_bullet()
		self.crows.draw(self.screen)

if __name__ == "__main__":
	ci = CrowInvasion()
	ci.run_game()