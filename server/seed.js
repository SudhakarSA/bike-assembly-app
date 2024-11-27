const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const Employee = mongoose.model('Employee', EmployeeSchema);

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/bikeAssembly', {useUnifiedTopology: true});

  const employees = [
    { name: 'Employee1', password: 'password1' },
    { name: 'Employee2', password: 'password2' },
    { name: 'Employee3', password: 'password3' },
    { name: 'Employee4', password: 'password4' },
    { name: 'Employee5', password: 'password5' },
  ];

  for (const employee of employees) {
    const hashedPassword = await bcrypt.hash(employee.password, 10);
    await Employee.create({ name: employee.name, password: hashedPassword });
  }

  console.log('Seeding complete');
  mongoose.connection.close();
}

seed();
