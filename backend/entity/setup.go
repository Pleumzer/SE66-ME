package entity

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectDB()(*gorm.DB,error) {
	var err error
	var database *gorm.DB
	database, err = gorm.Open(sqlite.Open("AnimalSE.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	database.AutoMigrate(
		&Animal{},
		&AnimalSex{},
		&AnimalType{},
		&ReproductionType{},
		&AbnormalAnimalReport{},
	)

	db = database

	// Gender Data
	male := AnimalSex{
		Animal_Sex: "เพศผู้",
	}
	db.Model(&AnimalSex{}).Create(&male)

	female := AnimalSex{
		Animal_Sex: "เพศเมีย",
	}
	db.Model(&AnimalSex{}).Create(&female)

	//Types of Animals Data
	mammals := AnimalType{
		Animal_Type: "สัตว์เลี้ยงลูกด้วยนม",
	}
	db.Model(&AnimalType{}).Create(&mammals)

	birds := AnimalType{
		Animal_Type: "สัตว์ปีก",
	}
	db.Model(&AnimalType{}).Create(&birds)

	reptiles := AnimalType{
		Animal_Type: "สัตว์เลื้อยคลาน",
	}
	db.Model(&AnimalType{}).Create(&reptiles)

	amphibains := AnimalType{
		Animal_Type: "สัตว์ครึ่งบกครึ่งน้ำ",
	}
	db.Model(&AnimalType{}).Create(&amphibains)

	fishes := AnimalType{
		Animal_Type: "สัตว์จำพวกปลา",
	}
	db.Model(&AnimalType{}).Create(&fishes)

	insects := AnimalType{
		Animal_Type: "สัตว์จำพวกแมลง",
	}
	db.Model(&AnimalType{}).Create(&insects)

	crustacean := AnimalType{
		Animal_Type: "สัตว์จำพวกกุ้งกั้งปู",
	}
	db.Model(&AnimalType{}).Create(&crustacean)

	arachnid := AnimalType{
		Animal_Type: "สัตว์จำพวกแมง",
	}
	db.Model(&AnimalType{}).Create(&arachnid)

	echinoderms := AnimalType{
		Animal_Type: "สัตว์จำพวกเอไคโนเดอร์มาตา",
	}
	db.Model(&AnimalType{}).Create(&echinoderms)

	worms := AnimalType{
		Animal_Type: "สัตว์จำพวกหนอน",
	}
	db.Model(&AnimalType{}).Create(&worms)

	mollusks := AnimalType{
		Animal_Type: "สัตว์จำพวกมอลลัสกา",
	}
	db.Model(&AnimalType{}).Create(&mollusks)

	sponges := AnimalType{
		Animal_Type: "สัตว์จำพวกฟองน้ำ",
	}
	db.Model(&AnimalType{}).Create(&sponges)

	//Animal BornType data
	asexualreproduction := ReproductionType{
		Reproductiontype: "สืบพันธุ์แบบไม่อาศัยเพศ",
	}
	db.Model(&ReproductionType{}).Create(&asexualreproduction)

	sexualreproduction := ReproductionType{
		Reproductiontype: "สืบพันธุ์แบบอาศัยเพศ",
	}
	db.Model(&ReproductionType{}).Create(&sexualreproduction)

	return database,nil
}
