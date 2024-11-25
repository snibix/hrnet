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
import { departments, usStates } from "../constants/formData";
import theme from "../styles/theme";

const EmployeeForm = () => {
  // const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
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
                  <TextField fullWidth label="First Name" name="firstName" />
                  <TextField fullWidth label="Last Name" name="lastName" />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                  <DatePicker label="Date of birth" sx={{ width: "100%" }} />

                  <DatePicker label="Start Date" sx={{ width: "100%" }} />
                </Stack>

                <Typography variant="h6" sx={{ mt: 2, color: "#5f6f1f" }}>
                  Adresse
                </Typography>

                <TextField fullWidth label="Street" name="street" />

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField fullWidth label="City" name="city" />

                  <TextField fullWidth label="Zip Code" name="zipCode" />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField fullWidth select label="State" name="state">
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
