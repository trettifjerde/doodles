import pygame

class Button():
	def __init__(self, game, msg):
		self.screen = game.screen
		self.screen_rect = game.screen_rect

		self.font = pygame.font.SysFont(None, 48)
		self.button_color = (85, 85, 85)
		self.text_color = (255, 255, 255)
		self.prep_msg(msg)

		self.width = 10 + self.msg_image_rect.width
		self.height = 20 + self.msg_image_rect.height

		self.rect = pygame.Rect(0, 0, self.width, self.height)
		self.rect.center = self.screen_rect.center
		self.msg_image_rect.center = self.rect.center 

	def prep_msg(self, msg):
		self.msg_image = self.font.render(msg, True, 
			self.text_color, self.button_color)
		self.msg_image_rect = self.msg_image.get_rect()

	def draw_button(self):
		self.screen.fill(self.button_color, self.rect)
		self.screen.blit(self.msg_image, self.msg_image_rect)

class Difficulty_Button(Button):
	def __init__(self, game, msg):
		super().__init__(game, msg)
		self.padding = 10
		self.rect.top += self.height + self.padding

		if msg == "EASY":
			self.rect.right = game.difficulty_default.rect.left - self.padding
		elif msg == "HARD":
			self.rect.left = game.difficulty_default.rect.right + self.padding
		else:
			self.rect.left = self.screen_rect.centerx - int(self.width / 2)

		self.msg_image_rect.center = self.rect.center


