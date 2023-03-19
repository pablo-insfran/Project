const StudentsControllers = require("../controllers/students.controllers")
const { authenticate } = require("../config/jwt.config")

module.exports = app => {
    // Nuevo Producto OK 
    app.post("/api/students/new", StudentsControllers.createStudents);

    // //Modificar un Movies OK
    app.post("/api/students/:id/subject", StudentsControllers.updateStudents);

    //Modificar un Movies OK
    app.put("/api/students/:id/student", StudentsControllers.updateStudentsOne);

    //Mostrar Movies y sus respectivos promedios
    app.get("/api/students", StudentsControllers.allStudents);

    // //Mostrar Todos los Movies
    // app.get("/api/movies/all", StudentsControllers.Movies);

    // //Mostrar solo un Movies OK
    app.get("/api/students/:id", StudentsControllers.oneStudents);

    //Eliminar un Movies  Ok
    app.delete("/api/delete/:id", StudentsControllers.deleteStudents);

    // app.delete("/api/delete/:id/:subject", StudentsControllers.deleteReview);
}

