// utils/cars.repository.js
pool = require(__dirname + "\\db.include.js"); // use same folder as the current file

module.exports = {
    getBlankEmployee(){ // defines the entity model
        return {
            "id_employee": 0,
            "name_employee": "XXXX",
            "age_employee": 0,
            "gender_employee": "XXXX",
            "post_employee": "XXXX",
            "salary_employee": 0,
            "id_bar": 0
        };
    },
    async getAllEmployee(){ // TODO? move to brands.repository.js
        try {
            let sql = "SELECT * FROM employee";
			// .execute() does: getConnection() + prepare() + query() + releaseConnection()
            const [rows, fields] = await pool.execute(sql); 
            console.log("Employees FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async getEmployeesByName(name){ 
        try {
            let sql = "SELECT * FROM employee WHERE upper(name) like upper(?)";
            const [rows, fields] = await pool.execute(sql, [ `%${name}%` ]);
            console.log("Employees FILTERED: "+rows.length);
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async getOneEmployee(employeeId){ 
        try {
            // sql = "SELECT * FROM agencies INNER JOIN brands ON agency_brand=brand_id WHERE agency_id = "+agencyId; 
            // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input (not very good) OR prepared statements (good) OR use orm (GOOD!)
            let sql = "SELECT * FROM employee WHERE id_employee = ?";
            const [rows, fields] = await pool.execute(sql, [ employeeId ]);
            console.log("SINGLE employee FETCHED: "+rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async delOneEmployee(employeeId){ 
        try {
            let sql = "DELETE FROM employee WHERE id_employee = ?";
            const [okPacket, fields] = await pool.execute(sql, [ employeeId ]); 
            console.log("DELETE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async addOneEmployee(barId){ 
        try {
            let sql = "INSERT INTO employee (id_employee, id_bar) VALUES (NULL, ?) ";
            const [okPacket, fields] = await pool.execute(sql, [ barId ]); 
            console.log("INSERT " + JSON.stringify(okPacket));
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    async editOneCar(id_employee, name_employee, age_employee, gender_employee, post_employee, salary_employee, id_bar){ 
        try {
            let sql = "UPDATE employee SET name_employee=?, age_employee=?, gender_employee=?, post_employee=?, salary_employee=?, id_bar=? WHERE id_employee=? "; // positional parameters
            const [okPacket, fields] = await pool.execute(sql, 
                  [name_employee, age_employee, gender_employee, post_employee, salary_employee, id_bar, id_employee]); // positional parameters
            console.log("UPDATE " + JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }
};