// controllers/carsapi.route.js
const express = require('express');
const router = express.Router();
const employeeRepo = require('../utils/employees.repository');

router.get('/list', employeeListAction);
router.get('/show/:employeeId', employeeShowAction);
router.get('/del/:employeeId', employeeDelAction);
router.post('/update/:employeeId', employeeUpdateAction);

// http://localhost:9000/carsapi/list
async function employeeListAction(request, response) {
    var employees = await employeeRepo.getAllemployee();
    response.send(JSON.stringify(employees));
}
// http://localhost:9000/carsapi/show/42
async function employeeShowAction(request, response) {
    var oneEmployee = await employeeRepo.getOneCar(request.params.employeeId);
    response.send(JSON.stringify(oneEmployee));
}
async function employeeDelAction(request, response) {
    // TODO: first remove extras for car, unless the car cannot be removed!!!
    var numRows = await employeeRepo.delOneEmployee(request.params.employeeId);
    let result = { rowsDeleted: numRows };
    response.send(JSON.stringify(result));
}
async function employeeUpdateAction(request, response) {
    // var json = JSON.stringify(request.body); // bodyParser can process json in body + regular POST form input too
    // console.log(json);
    // TODO: !!! INPUT VALIDATION !!!
    var employeeId = request.params.employeeId;
    if (employeeId==="0") employeeId = await carRepo.addOneCar(request.body.id_employee);
    var numRows = await employeeRepo.editOneEmployee(carId, 
        request.body.name_employee, 
        request.body.age_employee, 
        request.body.gender_employee, 
        request.body.post_employee, 
        request.body.salary_employee,
        request.body.id_bar);
    let result = { rowsUpdated: numRows };
    response.send(JSON.stringify(result));
}

module.exports = router;