import { zodResolver } from "@hookform/resolvers/zod";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "snibix-modal/dist/Modal.css";
import { z } from "zod";
import { departments, usStates } from "../constants/formData";
import theme from "../styles/theme";
import MessageModal from "./MessageModal";

const employeShema = z.object({
  firstName: z.string().trim().min(1, { message: "First name is required" }),
  lastName: z.string().trim().min(1, { message: "Last name is required" }),
  dateOfBirth: z
    .string()
    .min(1, { message: "Date of Birth is required" })
    .refine(
      (date) => new Date().getFullYear() - new Date(date).getFullYear() > 16,
      {
        message: "Date birth must be at least 16 ",
      }
    ),
  startDate: z
    .string()
    .refine((date) => !!date, { message: "Start Date is required" }),
  street: z.string().trim().min(1, { message: "Street is required" }),
  city: z.string().trim().min(1, { message: "City is required" }),
  state: z.string().trim().min(1, { message: "State is required" }),
  zipCode: z.string().min(1, { message: "Zip Code is required" }),
  department: z.string().min(1, { message: "Department is required" }),
});

const EmployeeForm = () => {
  // const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(employeShema),
  });

  const submit = (data) => {
    console.log("Form Data:", data);

    reset();
    setIsOpen(true);
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
            <form onSubmit={handleSubmit(submit)}>
              <Stack spacing={3}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    type="text"
                    label="First Name"
                    {...register("firstName")}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />

                  <TextField
                    fullWidth
                    label="Last Name"
                    {...register("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date of Birth"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    {...register("dateOfBirth")}
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth?.message}
                  />
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                    {...register("startDate")}
                    error={!!errors.startDate}
                    helperText={errors.startDate?.message}
                  />
                </Stack>

                <Typography variant="h6" sx={{ mt: 2, color: "#5f6f1f" }}>
                  Adresse
                </Typography>

                <TextField
                  fullWidth
                  label="Street"
                  {...register("street")}
                  error={!!errors.street}
                  helperText={errors.street?.message}
                />

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    label="City"
                    {...register("city")}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />

                  <TextField
                    fullWidth
                    label="Zip Code"
                    {...register("zipCode")}
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/\D+/, ""))
                    }
                    error={!!errors.zipCode}
                    helperText={errors.zipCode?.message}
                  />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    defaultValue=""
                    fullWidth
                    select
                    label="State"
                    {...register("state")}
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  >
                    {usStates.map((states) => (
                      <MenuItem
                        key={states.abbreviation}
                        value={states.abbreviation}
                      >
                        {states.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    defaultValue=""
                    fullWidth
                    select
                    label="Départment"
                    {...register("department")}
                    error={!!errors.department}
                    helperText={errors.department?.message}
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
            <MessageModal
              className="modal-backdrop"
              isOpen={isOpen}
              close={() => setIsOpen(false)}
              title="Employee created susscessfuly !"
            />
          </Paper>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default EmployeeForm;
