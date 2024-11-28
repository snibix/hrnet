import { TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { columns } from "../constants/formData";

function EmployeeTable() {
  const employees = useSelector((state) => state.employee);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //TODO : a voir comment quand j'efface l'input que le tableau revient au debut
  const filteredEmployees =
    searchTerm.trim() === ""
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
            firstName.includes(searchTerm.toLowerCase()) ||
            lastName.includes(searchTerm.toLowerCase()) ||
            department.includes(searchTerm.toLowerCase())
          );
        });

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
    setPage(0);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  // Formatage des dates pour l'affichage
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TextField
        type="search"
        variant="outlined"
        placeholder="Search"
        value={searchTerm}
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
              {columns.map((column) => (
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
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Aucun employé trouvé
                </TableCell>
              </TableRow>
            ) : (
              employees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id || index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#f5f5f5",
                    }}
                  >
                    {columns.map((column) => {
                      let value = row[column.id];

                      if (
                        column.id === "dateOfBirth" ||
                        column.id === "startDate"
                      ) {
                        value = formatDate(value);
                      }
                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employees.length}
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
