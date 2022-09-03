const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const PORT = 5000
const dbEmp = require("./employee")

app.use(express.json())


app.post('/add', dbEmp.createEmployee)
app.get('/all', dbEmp.getEmployees)
app.get("/:id", dbEmp.getEmployeeById)
app.put("/:id", dbEmp.updateEmployee)
app.delete("/:id", dbEmp.deleteEmployee)


app.listen(PORT, () => console.log(`Server is running on ${PORT}`))


