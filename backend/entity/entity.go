package entity

import (
	"time"

	"gorm.io/gorm"

	
)

type Animal struct {
	gorm.Model
	Animal_Profile       string		
	Animal_Biomial_Name  string		`valid:"required~Animal_Biomial_Name is required~กรุณากรอกชื่อทวินามของสัตว์ !,maxstringlength(50)~ชื่อทวินามของสัตว์ต้องยาวไม่เกิน 50 อักษร"`
	Animal_Name          string		`valid:"required~Animal_Name is required~กรุณากรอกชื่อของสัตว์ !,maxstringlength(50)~ชื่อของสัตว์ต้องยาวไม่เกิน 50 อักษร"`
	Animal_Abode         string		`valid:"required~Animal_Abode is required~กรุณากรอกถิ่นฐานของสัตว์ !,maxstringlength(50)~ถิ่นฐานต้องยาวไม่เกิน 50 อักษร"`
	Animal_Register_Date time.Time
	Animal_Birthday_Date time.Time

	AnimalSexID *uint
	AnimalSex   AnimalSex `gorm:"foreignKey:AnimalSexID"`

	AnimalTypeID *uint
	AnimalType   AnimalType `gorm:"foreignKey:AnimalTypeID"`

	ReproductionTypeID *uint
	ReproductionType   ReproductionType `gorm:"foreignKey:ReproductionTypeID"`

	// AbnormalAnimalReports AbnormalAnimalReport `gorm:"foreignKey:AnimalID"`
}

type AnimalSex struct {
	gorm.Model
	Animal_Sex string `gorm:"uniqueIndex"`

	// Animals Animal `gorm:"foreignKey:AnimalSexID"`
}

type AnimalType struct {
	gorm.Model
	Animal_Type string `gorm:"uniqueIndex"`

	// Animals Animal `gorm:"foreignKey:AnimalTypeID"`
}

type ReproductionType struct {
	gorm.Model
	Reproductiontype string `gorm:"uniqueIndex"`

	// Animals Animal `gorm:"foreignKey:ReproductionTypeID"`
}

type AbnormalAnimalReport struct {
	gorm.Model
	AbnormalDetail    string
	AbnormalAnimalPic string

	AnimalID *uint
	Animal   Animal `gorm:"foreignKey:AnimalID"`
}
