import EmployeeList from "../components/EmployeeList";

function ListEmployee() {
  return (
    <div className="container-employe-list">
      <h1 className="title-employe-list">Employee List</h1>
      <EmployeeList />
    </div>
  );
}

ListEmployee.propTypes = {};

export default ListEmployee;
