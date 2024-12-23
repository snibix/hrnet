import { TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import employeeColumns from "../columns/employeeColumns";
import formatDate from "../utils/formatDate";

function EmployeeTable() {
  const employees = useSelector((state) => state.employee);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredEmployees = useMemo(
    () =>
      search.trim() === ""
        ? employees
        : employees.filter((employee) => {
            const firstName = employee.firstName
              ? employee.firstName.toLowerCase()
              : "";
            const lastName = employee.lastName
              ? employee.lastName.toLowerCase()
              : "";
            const department = employee.department
              ? employee.department.toLowerCase()
              : "";

            return (
              firstName.includes(search.toLowerCase()) ||
              lastName.includes(search.toLowerCase()) ||
              department.includes(search.toLowerCase())
            );
          }),
    [search, employees]
  );

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TextField
        type="search"
        variant="outlined"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
        sx={{
          height: "40px",
          padding: "10px 0",
          "& .MuiOutlinedInput-root": {
            height: "100%",
            padding: "0 10px",
          },
          "& .MuiInputLabel-root": {
            top: "-6px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: 3,
            borderColor: "#5f6f1f",
          },
        }}
      />
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {employeeColumns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    backgroundColor: "#5f6f1f",
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={employeeColumns.length} align="center">
                  Aucun employé trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{
                      backgroundColor: index % 2 ? "#f5f5f5" : "#ffffff",
                    }}
                  >
                    {employeeColumns.map(({ id, type }) => (
                      <TableCell key={id}>
                        {type === "date" ? formatDate(row[id]) : row[id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredEmployees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default function EmployeeList() {
  return <EmployeeTable />;
}
