package controller

import (
	"net/http"

	"github.com/Pleumzer/SE66-ME/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

func CreateAbnormalReport(c *gin.Context) {
	var abnormal entity.AbnormalAnimalReport

	if err := c.ShouldBindJSON(&abnormal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(abnormal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&abnormal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "Report successfully"})

}

func GetAbnormal(c *gin.Context) {
	var abnormals []entity.AbnormalAnimalReport
	if err := entity.DB().Preload("Animal").Raw("SELECT * FROM abnormal_animal_reports").Find(&abnormals).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": abnormals})
}

func DeleteAbnormal(c *gin.Context) {

	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM abnormal_animal_reports WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "report not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}
