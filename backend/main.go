package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())

	app.Get("/api/ping", func(c *fiber.Ctx) error {
		return c.SendString("Server is up")
	})

	app.Post("/api/symptoms", func(c *fiber.Ctx) error {
		body := new(struct {
			Symptoms string `json:"symptoms"`
		})
		if err := c.BodyParser(body); err != nil {
			return c.Status(400).SendString("Invalid input")
		}
		return c.JSON(fiber.Map{
			"risk": "Moderate",
			"message": "You might wanna get checked for hormonal issues.",
		})
	})

	app.Listen(":5000")
}