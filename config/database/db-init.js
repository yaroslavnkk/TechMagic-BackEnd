const mongoose = require('mongoose');
const Doctor = require('../../models/Doctor');

const doctors = [ {
    firstName: "Олександр",
    lastName: "Петренко",
    patronymic: "Іванович",
    specialty: "Терапевт",
    category: "Вища"
  },
  {
    firstName: "Марія",
    lastName: "Коваленко",
    patronymic: "Михайлівна",
    specialty: "Кардіолог",
    category: "Перша"
  },
  {
    firstName: "Ірина",
    lastName: "Василенко",
    patronymic: "Петрівна",
    specialty: "Невролог",
    category: "Вища"
  },
  {
    firstName: "Андрій",
    lastName: "Мельник",
    patronymic: "Олегович",
    specialty: "Ортопед",
    category: "Друга"
  },
  {
    firstName: "Наталія",
    lastName: "Шевченко",
    patronymic: "Василівна",
    specialty: "Офтальмолог",
    category: "Вища"
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