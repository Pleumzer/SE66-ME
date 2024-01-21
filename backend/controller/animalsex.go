package controller

import (
	"net/http"

	"github.com/Pleumzer/SE66-ME/entity"
	"github.com/gin-gonic/gin"
)

func ListSexs(c *gin.Context){
	var sexs []entity.AnimalSex
	if err := entity.DB().Raw("SELECT * FROM animal_sexes").Scan(&sexs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": sexs})
}

