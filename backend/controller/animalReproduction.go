package controller

import (
	"net/http"

	"github.com/Pleumzer/SE66-ME/entity"
	"github.com/gin-gonic/gin"
)

func ListReproductionType(c *gin.Context){
	var reproductiontypes []entity.ReproductionType
	if err := entity.DB().Raw("SELECT * FROM reproduction_types").Scan(&reproductiontypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reproductiontypes})
}

