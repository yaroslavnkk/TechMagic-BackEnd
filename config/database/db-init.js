const mongoose = require('mongoose');
const Doctor = require('../../models/Doctor');

const doctors = [ {
    firstName: "Олександр",
    lastName: "Петренко",
    patronymic: "Іванович",
    specialty: "Терапевт",
    qualification: "Вища"
  },
  {
    firstName: "Марія",
    lastName: "Коваленко",
    patronymic: "Михайлівна",
    specialty: "Кардіолог",
    qualification: "Перша"
  },
  {
    firstName: "Ірина",
    lastName: "Василенко",
    patronymic: "Петрівна",
    specialty: "Невролог",
    qualification: "Вища"
  },
  {
    firstName: "Андрій",
    lastName: "Мельник",
    patronymic: "Олегович",
    specialty: "Ортопед",
    qualification: "Друга"
  },
  {
    firstName: "Наталія",
    lastName: "Шевченко",
    patronymic: "Василівна",
    specialty: "Офтальмолог",
    qualification: "Вища"
  }];

const initializeDB = async () => {
    try{
        await Doctor.deleteMany({});
        await Doctor.insertMany(doctors);
        console.log('Successfully initialized DB');
    }catch(err){
        console.log(err);
    }
};


module.exports = { initializeDB };