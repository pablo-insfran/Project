const Students = require("../models/students.models")

module.exports.createStudents = (req, res) => {
    Students.create(req.body)
        .then(newStudents => res.json({ result: newStudents }))
        .catch(error => res.status(400).json({ message: "Algo salió mal => CreateStudents <=", error: error }))
};

module.exports.updateStudents = (req, res) => {
    Students.updateOne({ _id: req.params.id }, { $push: { subject: (req.body) } })
        .then(update => res.json({ result: update }))
        .catch(error => res.status(400).json({ message: "Algo salió mal => Update Subject <=", error: error }))
};

module.exports.updateStudentsOne = (req, res) => {
    Students.updateOne({ _id: req.params.id }, req.body )
        .then(update => res.json({ result: update }))
        .catch(error => res.status(400).json({ message: "Algo salió mal => Update Subject <=", error: error }))
};

module.exports.allStudents = (req, res) => {
    Students.aggregate([{ "$unwind": "$subject" },
    { "$group": { "_id": "$_id", "nameStudent": { "$last": "$name" }, "promedio": { "$avg": "$subject.note" }, "profile": { "$last": "$profile" } } },
    { "$project": { "_id": "$_id", "Student": "$nameStudent", "Avg": { "$round": ["$promedio", 1] }, "Profi" : "$profile" } }
    ])
        .then(allMovies => res.json({ result: allMovies }))
        .catch(error => res.status(400).json({ message: "Algo salió mal => AllMovies <=", error: error }))
};

// module.exports.Movies = (req, res) => {
//     Students.find()
//         .then(movies => res.json({ result: movies }))
//         .catch(error => res.status(400).json({ message: "Algo salió mal => MoviesAll <=", error: error }))
// };

module.exports.oneStudents = (req, res) => {
    Students.findById(req.params.id)
        .then(movies => res.json({ result: movies }))
        .catch(error => res.status(400).json({ message: "Algo salió mal => OneStudents <=", error: error }))
};

module.exports.deleteStudents = (req, res) => {
    Students.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(error => res.status(400).json({ message: "Algo salió mal => DeleteStudents <=", error: error }))
};


// module.exports.deleteReview = (req, res) => {
//     Students.update({ "toUname" : "Eamorr" }, { $pull : { "moviesrevie" : { "id" : "1lfw70h789u13a1e67pv" }}});
// };