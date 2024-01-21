package unit

import (
	"testing"
	"time"

	"github.com/Pleumzer/SE66-ME/entity"
	"github.com/asaskevich/govalidator"
	."github.com/onsi/gomega"
	
)
func TestAnimalCorrectData(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run("Animalname is required",func(t *testing.T){
		var animalSexID uint = 1
		var animalTypeID uint = 2
		var reproductionTypeID uint = 1

		animal := entity.Animal{
			Animal_Profile:				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",       		
			Animal_Biomial_Name: 		"Spheniscidae" ,		
			Animal_Name:				"ดุ๋ย",         		
			Animal_Abode:				"ขั้วโลกเหนือ",         		
			Animal_Register_Date: 		time.Now().UTC(),
			Animal_Birthday_Date:  		time.Now().UTC(),

			AnimalSexID:				&animalSexID,
			AnimalTypeID:				&animalTypeID,
			ReproductionTypeID:			&reproductionTypeID,
		}

		ok, err := govalidator.ValidateStruct(animal)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
	})
	t.Run("Animalname is required",func(t *testing.T){
		var animalSexID uint = 1
		var animalTypeID uint = 2
		var reproductionTypeID uint = 1

		animal := entity.Animal{
			Animal_Profile:				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",       		
			Animal_Biomial_Name: 		"Spheniscidae" ,		
			Animal_Name:				"", //>NULL          		
			Animal_Abode:				"ขั้วโลกเหนือ",         		
			Animal_Register_Date: 		time.Now().UTC(),
			Animal_Birthday_Date:  		time.Now().UTC(),

			AnimalSexID:				&animalSexID,
			AnimalTypeID:				&animalTypeID,
			ReproductionTypeID:			&reproductionTypeID,
		}

		ok, err := govalidator.ValidateStruct(animal)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อสัตว์!"))
	})

	t.Run("Animal_Biomial_Name  pattern is not true",func(t *testing.T){
		var animalSexID uint = 1
		var animalTypeID uint = 2
		var reproductionTypeID uint = 1

		animal := entity.Animal{
			Animal_Profile:				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",       		
			Animal_Biomial_Name: 		"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" ,		
			Animal_Name:				"ดุ๋ย", //>NULL          		
			Animal_Abode:				"ขั้วโลกเหนือ",         		
			Animal_Register_Date: 		time.Now().UTC(),
			Animal_Birthday_Date:  		time.Now().UTC(),

			AnimalSexID:				&animalSexID,
			AnimalTypeID:				&animalTypeID,
			ReproductionTypeID:			&reproductionTypeID,
		}

		ok, err := govalidator.ValidateStruct(animal)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("อนุญาตให้กรอกชื่อทวินามได้ไม่เกิน 50 ตัวอักษร!"))
	})

	t.Run("Animalname pattern is not true",func(t *testing.T){
		var animalSexID uint = 1
		var animalTypeID uint = 2
		var reproductionTypeID uint = 1

		animal := entity.Animal{
			Animal_Profile:				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",       		
			Animal_Biomial_Name: 		"Spheniscidae" ,		
			Animal_Name:				"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", //>NULL          		
			Animal_Abode:				"ขั้วโลกเหนือ",         		
			Animal_Register_Date: 		time.Now().UTC(),
			Animal_Birthday_Date:  		time.Now().UTC(),

			AnimalSexID:				&animalSexID,
			AnimalTypeID:				&animalTypeID,
			ReproductionTypeID:			&reproductionTypeID,
		}

		ok, err := govalidator.ValidateStruct(animal)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("อนุญาตให้กรอกชื่อสัตว์ได้ไม่เกิน 50 ตัวอักษร!"))
	})

	t.Run("Animalname pattern is not true",func(t *testing.T){
		var animalSexID uint = 1
		var animalTypeID uint = 2
		var reproductionTypeID uint = 1

		animal := entity.Animal{
			Animal_Profile:				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",       		
			Animal_Biomial_Name: 		"Spheniscidae" ,		
			Animal_Name:				"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", //>NULL          		
			Animal_Abode:				"ขั้วโลกเหนือ",         		
			Animal_Register_Date: 		time.Now().UTC(),
			Animal_Birthday_Date:  		time.Now().UTC(),

			AnimalSexID:				&animalSexID,
			AnimalTypeID:				&animalTypeID,
			ReproductionTypeID:			&reproductionTypeID,
		}

		ok, err := govalidator.ValidateStruct(animal)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("อนุญาตให้กรอกชื่อสัตว์ได้ไม่เกิน 50 ตัวอักษร!"))
	})
}
// func TestInCorrectAnimalData(t *testing.T){
// 	g := NewGomegaWithT(t)





