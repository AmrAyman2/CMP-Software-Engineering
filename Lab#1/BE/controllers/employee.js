const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = employee.findIndex(emp => emp.id==id);
    employee.splice(index, 1);
    res.status(200).json();
  } catch (error) {
    res.status(500).json();
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  try
  {
    const empExists = employee.find(emp=> emp.id==req.body.id);
    if(empExists){
      return res.status(400).json();
    }
    const newemployee = {id: req.body.id, name: req.body.name};
    employee.push(newemployee);
    res.status(201).json();
  }
  catch (error)
  {
    res.status(500).json();
  }
};