package main

import (
	"github.com/Pleumzer/SE66-ME/controller"
	"github.com/Pleumzer/SE66-ME/entity"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.ConnectDB()
	r := gin.Default()
	r.Use(CORSMiddleware())

	//
	r.GET("/animals",controller.GetAnimal)
	r.GET("/animals/:id",controller.GetAnimalByID)
	r.GET("/AnimalSex",controller.ListSexs)
	r.GET("/AnimalType",controller.ListTypes)
	r.GET("/AnimalReproduction",controller.ListReproductionType)
	r.POST("/animals",controller.CreateAnimal)
	r.PATCH("/animals",controller.UpdateAnimal)
	r.DELETE("/animals/:id",controller.DeleteAnimal)
	r.POST("/abnormalanimalreport",controller.CreateAbnormalReport)
	r.GET("/abnormalanimalreports",controller.GetAbnormal)
	r.DELETE("/abnormalanimalreports/:id",controller.DeleteAbnormal)
	//
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {
	
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")
	
	
	if c.Request.Method == "OPTIONS" {
	
	c.AbortWithStatus(204)
	
	return
	
	}
	
	
	c.Next()
	
	}
	
	}