package controller

import (
	"net/http"

	"github.com/Pleumzer/SE66-ME/entity"
	"github.com/gin-gonic/gin"
)

func ListTypes(c *gin.Context) {
	var types []entity.AnimalType
	if err := entity.DB().Raw("SELECT * FROM animal_types").Scan(&types).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": types})
}