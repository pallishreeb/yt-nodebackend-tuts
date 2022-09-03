const Pool = require("pg").Pool;

const pool = new Pool({
  user: "username",
  host: "localhost",
  database: "postgres-api",
  password: "password",
  port: 5432,
});

const createEmployee = (req, res) => {
  const { name, email } = req.body;

  pool.query(
    "INSERT INTO employees (name,email) VALUES ($1,$2) RETURNING * ",
    [name, email],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }

      res.status(200).json({
        msg: "data created succeffully",
        data: result.rows[0],
      });
    }
  );
};


const getEmployees = (req,res) => {
    pool.query('SELECT * FROM employees', (err,result) =>{
        if(err){
            throw err
        }

        res.json({
            data : result.rows
        })
    })
}


const getEmployeeById = (req,res) => {

    let id = parseInt(req.params.id)

    pool.query('SELECT * FROM employees WHERE id=$1',[id], (err,result) =>{
        if(err){
            throw err
        }

        res.json({
            data : result.rows
        })
    })
}


const updateEmployee = (req,res) => {
    
    let id = parseInt(req.params.id)
    const { name, email}  = req.body

    pool.query('UPDATE employees  SET name =$1 ,email = $2 WHERE id=$3', [name,email,id], (err,result) => {
        if(err){
            throw err
        }
        res.json({
            data : "Updated successfully"
        })
    })


}


const deleteEmployee = (req,res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM employees WHERE id=$1',[id], (err,result) => {
        if(err){
            throw err
        }

        res.json({
            msg: `Employee with ${id} Deleted successfuly`
        })
    })
}

module.exports = {
    createEmployee, getEmployees,getEmployeeById,updateEmployee,updateEmployee, deleteEmployee
}
