import pygame
from pygame.sprite import Sprite

class Cat():
	def __init__(self, game):
		self.screen = game.screen
		self.settings = game.settings
		self.screen_rect = game.screen_rect

		self.images = {
			"right": pygame.image.load("images/cat_r.bmp"),
			"left": pygame.image.load("images/cat_l.bmp"),
			"r_firing_red": pygame.image.load("images/cat_r_firing_red.bmp"),
			"l_firing_red":pygame.image.load("images/cat_l_firing_red.bmp"),
			"r_firing_green": pygame.image.load("images/cat_r_firing_green.bmp"),
			"l_firing_green": pygame.image.load("images/cat_l_firing_green.bmp"),
		}
		self.now_img = self.images["right"]
		self.rect = self.now_img.get_rect()
		self.rect.midbottom = self.screen_rect.midbottom
		self.x = float(self.rect.x)
		self.bottom = float(self.rect.bottom)

		self.moving_right = False
		self.moving_left = False
		self.jumping = False
		self.y_direction = -1 # UP: -1, DOWN: 1

		self.dir_now = True #True - right, #False - left
		self.firing = False
		self.green_mode = False

	def update(self, game):
		if self.moving_right and self.rect.right < self.screen_rect.right:
			if self.dir_now == False:
				self.dir_now = True
			self.x += self.settings.cat_speed
		elif self.moving_left and self.rect.left > self.screen_rect.left:
			if self.dir_now == True:
				self.dir_now = False
			self.x -= self.settings.cat_speed

		if self.jumping:
			self.bottom += self.settings.cat_jump_speed * self.y_direction
			self.rect.bottom = int(self.bottom)
			
			if self.rect.bottom <= self.screen_rect.bottom - self.settings.cat_jump_height or self.rect.bottom >= self.screen_rect.bottom:
				self.y_direction *= -1

			if self.rect.bottom == self.screen_rect.bottom:
				self.jumping = False

		if self.firing:
			if self.green_mode:
				image_key = "r_firing_green" if self.dir_now else "l_firing_green"
			else:
				image_key = "r_firing_red" if self.dir_now else "l_firing_red"
		else:
			image_key = "right" if self.dir_now else "left"

		if self.now_img != self.images[image_key]:
			self.now_img = self.images[image_key]
		self.rect.x = int(self.x)

	def center_cat(self):
		self.rect.midbottom = self.screen_rect.midbottom
		self.x = float(self.rect.x)
	
	def blitme(self):
		self.screen.blit(self.now_img, self.rect)

class Bullet(Sprite):
	def __init__(self, game, isgreen, x_direction=0, **args):
		super().__init__()
		self.screen = game.screen
		self.settings = game.settings
		self.stats = game.stats
		self.x_direction = x_direction
		self.isgreen = isgreen
		self.color = self.settings.bullet_green if self.isgreen else self.settings.bullet_red

		if self.x_direction == 0:
			self.rect = pygame.Rect(0,0, self.settings.bullet_width, self.settings.bullet_height)
			self.rect.top = game.cat.rect.top
			
			bullet_num = self.settings.bullet_first if args["isfirst"] else self.settings.bullet_second
			if game.cat.dir_now:
				self.rect.right = (game.cat.rect.right - bullet_num)
			else:
				self.rect.left = (game.cat.rect.left + bullet_num)

		else: 
			self.rect = pygame.Rect(0,0, self.settings.bullet_height, self.settings.bullet_width)
			self.rect.top = game.cat.rect.top + self.settings.bullet_vert_padding

			if game.cat.dir_now:
				self.rect.right = game.cat.rect.right
			else:
				self.rect.left = game.cat.rect.left

		self.x = float(self.rect.x)
		self.y = float(self.rect.y)

	def update(self):
		if self.x_direction == 0:
			self.y -= self.stats.bullet_speed
			self.rect.y = int(self.y)

		else:
			self.x += self.stats.bullet_speed * self.x_direction
			self.rect.x = int(self.x)

	def draw_bullet(self):
		pygame.draw.rect(self.screen, self.color, self.rect)

class Crow(Sprite):
	def __init__(self, game):
		super().__init__()
		self.screen = game.screen
		self.settings = game.settings
		self.screen_rect = game.screen_rect
		self.speed = game.stats.crow_speed

		self.image = pygame.image.load("images/crow_flying.bmp")
		self.rect = self.image.get_rect()
		self.rect.x = self.settings.crow_padding_x
		self.rect.y = self.settings.crow_padding_y

		self.width = self.rect.width
		self.height = self.rect.height

		self.x = float(self.rect.x)
		self.y = float(self.rect.y)

		self.islife = False

	def update(self):
		self.x += (self.speed * self.settings.fleet_direction)
		self.rect.x = int(self.x)

	def check_edges(self):
		if self.rect.right >= self.screen_rect.right or self.rect.left <= self.screen_rect.left:
			return True

