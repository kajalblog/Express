var express = require("express");
const students = require("./student");
var app = express();
app.use(express.json());
app.listen(4500, () => {
  console.log("API is runnimg");
});
app.get("/", (req, res) => {
  // res.send("hello express");
  res.json({ msg: "Api is working" });
});
app.get("/students/all", (req, res) => {
  res.json(students);
});
app.post("/students", (req, res) => {
  // console.log(req.body);
  if (!req.body.mobile_no) {
    res.status(400);
    return res.json({ error: "Mobile no is required..." });
  }
  const user = {
    id: students.length + 1,
    student_name: req.body.student_name,
    age: req.body.age,
    mobile_no: req.body.mobile_no,
    accStatus: req.body.accStatus,
    standard: req.body.standard,
    division: req.body.division,
  };
  students.push(user);
  res.json(user);
  // res.send("Post request");
});
app.put("/students/:id", (req, res) => {
  let id = req.params.id;
  let student_name = req.body.student_name;
  let age = req.body.age;
  let mobile_no = req.body.mobile_no;
  let accStatus = req.body.accStatus;
  let standard = req.body.standard;
  let division = req.body.division;
  console.log(id);
  let index = students.findIndex((student) => {
    return student.id == Number.parseInt(id);
  });
  if (index >= 0) {
    let s = students[index];
    if (typeof student_name == "undefined") student_name = s.student_name;

    if (typeof age == "undefined") age = s.age;

    if (typeof mobile_no == "undefined") mobile_no = s.mobile_no;

    if (typeof accStatus == "undefined") accStatus = s.accStatus;

    if (typeof standard == "undefined") standard = s.standard;

    if (typeof division == "undefined") division = s.division;

    students[index] = {
      id: id,
      student_name:
        typeof student_name == "undefined" ? s.student_name : student_name,
      age: typeof age == "undefined" ? s.age : age,
      mobile_no: typeof mobile_no == "undefined" ? s.mobile_no : mobile_no,
      accStatus: typeof accStatus == "undefined" ? s.accStatus : accStatus,
      standard: typeof standard == "undefined" ? s.standard : standard,
      division: typeof division == "undefined" ? s.division : division,
    };
    res.json(students[index]);
  } else {
    res.status(404);
  }
});
app.delete("/students/delete/:id", (req, res) => {
  let id = req.params.id;
  let age = req.body.age;
  let mobile_no = req.body.mobile_no;
  let accStatus = req.body.accStatus;
  let standard = req.body.standard;
  let division = req.body.division;
  console.log(id);
  const index = students.findIndex((student) => {
    return student.id == Number.parseInt(id);
  });
  if (index >= 0) {
    const std = students[index];

    students.splice(index, 1);
    res.json(std);
  } else {
    res.status(404);
  }
});

// app.delete()
