package controller

import (
	"net/http"

	"fmt"

	"github.com/Pleumzer/SE66-ME/entity"
	"github.com/gin-gonic/gin"
)

func CreateAnimal(c *gin.Context) {
	var animal entity.Animal
	var animalsex entity.AnimalSex
	var animaltype entity.AnimalType
	var reproductiontype entity.ReproductionType

	if err := c.ShouldBindJSON(&animal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", animal.AnimalSexID).First(&animalsex); tx.RowsAffected == 0 {
		fmt.Println("No record found for AnimalSexID:", animal.AnimalSexID)
		c.JSON(http.StatusBadRequest, gin.H{"error": "animalsex not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", animal.AnimalTypeID).First(&animaltype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "animaltype not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", animal.ReproductionTypeID).First(&reproductiontype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reproductiontype not found"})
		return
	}

	u := entity.Animal{
		AnimalSex:            animalsex,
		AnimalType:           animaltype,
		ReproductionType:     reproductiontype,
		Animal_Name:          animal.Animal_Name,
		Animal_Profile:       animal.Animal_Profile,
		Animal_Biomial_Name:  animal.Animal_Biomial_Name,
		Animal_Abode:         animal.Animal_Abode,
		Animal_Register_Date: animal.Animal_Register_Date,
		Animal_Birthday_Date: animal.Animal_Birthday_Date,
	}

	// บันทึก
	if err := entity.DB().Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": u})

}

func GetAnimal(c *gin.Context) {
	var animals []entity.Animal
	if err := entity.DB().Preload("AnimalSex").Raw("SELECT * FROM animals").Find(&animals).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data":animals})
}


func GetAnimalByID(c *gin.Context) {
	var animals entity.Animal
	idAnimal := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM animals WHERE id = ?", idAnimal).Scan(&animals).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": animals})

}


func UpdateAnimal(c *gin.Context) {
	var animal entity.Animal
	var result entity.Animal

	if err := c.ShouldBindJSON(&animal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา animal ด้วย id
	if tx := entity.DB().Where("id = ?", animal.ID).First(&result); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "animal not found"})
		return
	}

	if err := entity.DB().Save(&animal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": animal})

}

func DeleteAnimal(c *gin.Context) {

	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM animals WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "animals not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}