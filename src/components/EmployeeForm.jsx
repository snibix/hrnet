import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { departments, initialFormState, usStates } from "../constants/formData";
import { addEmployee } from "../redux/slice/employeeSlice";
import theme from "../styles/theme";

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({
    startDate: "",
    dateOfBirth: "",
    state: "",
    department: "",
  });

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (fieldName, value) => {
    const newErrors = {};

    if (!value) {
      newErrors[fieldName] = fieldName + "is required";
    }
    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = {};

    // Verification des champs requis
    // if (!formData.dateOfBirth) {
    //   newErrors.dateOfBirth = "Date Of Birth is required";
    // }
    // if (!formData.startDate) {
    //   newErrors.startDate = "Start date is required";
    // }
    // if (!formData.state) {
    //   newErrors.state = "State is required";
    // }
    // if (!formData.department) {
    //   newErrors.department = "Department is required";
    // }
    const departmentErrors = validate("department", formData.department);

    // Si des erreurs existent, les enregistrer et stopper la soumission
    Object.assign(error, departmentErrors);
    if (Object.keys(error).length > 0) {
      return setError(error);
    } else {
      setError({});
      console.log("Ajout employé");
    }

    const dateOfBirthObj = formData.dateOfBirth
      ? formData.dateOfBirth.toISOString()
      : null;

    const startDateObj = formData.startDate
      ? formData.startDate.toISOString()
      : null;

    const newEmployee = {
      ...formData,
      dateOfBirth: dateOfBirthObj,
      startDate: startDateObj,
    };
    dispatch(addEmployee(newEmployee));
    console.log("Employé ajouté:", newEmployee);
    handleReset();
  };

  const handleReset = () => {
    setFormData(initialFormState);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ maxWidth: "800px", margin: "0 auto", p: 3 }}>
          <Paper sx={{ p: 4 }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                mb: 4,
                color: "#5f6f1f",
                fontWeight: "bold",
              }}
            >
              Create an Employee
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                  <DatePicker
                    label="Date of birth"
                    value={formData.dateOfBirth}
                    onChange={(newValue) => {
                      setFormData((prev) => ({
                        ...prev,
                        dateOfBirth: newValue,
                      }));
                      setError(!newValue);
                    }}
                    slotProps={{
                      textField: {
                        error: !!error.dateOfBirth,
                        helperText: error.dateOfBirth || "",
                      },
                    }}
                    sx={{ width: "100%" }}
                  />

                  <DatePicker
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(newValue) => {
                      setFormData((prev) => ({
                        ...prev,
                        startDate: newValue,
                      }));
                      setError(!newValue);
                    }}
                    slotProps={{
                      textField: {
                        error: !!error.startDate,
                        helperText: error.startDate || "",
                      },
                    }}
                    sx={{ width: "100%" }}
                  />
                </Stack>

                <Typography variant="h6" sx={{ mt: 2, color: "#5f6f1f" }}>
                  Adresse
                </Typography>

                <TextField
                  fullWidth
                  label="Street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                />

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />

                  <TextField
                    fullWidth
                    label="Zip Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    select
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    error={!!error.state}
                    helperText={error.state}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            maxHeight: 200,
                            overflowY: "auto",
                          },
                        },
                      },
                    }}
                  >
                    {usStates.map((states) => (
                      <MenuItem key={states.value} value={states.name}>
                        {states.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    select
                    label="Départment"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    error={!!error.department}
                    helperText={error.department}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept.id} value={dept.name}>
                        {dept.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: "flex-end", mt: 4 }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleReset}
                    sx={{ px: 4 }}
                  >
                    Reset
                  </Button>
                  <Button type="submit" variant="contained" sx={{ px: 4 }}>
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Paper>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default EmployeeForm;
