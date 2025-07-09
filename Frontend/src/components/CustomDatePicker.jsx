// components/CustomDatePicker.jsx
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { useMediaQuery, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './theme'; 

const CustomDatePicker = ({
  label = "",
  onChange,
  value,
  editable = true,
  width = '100%',
  height = '37.5px'
}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const handleDateChange = (newValue) => {
    if (editable && onChange && newValue) {
      onChange(newValue.format('MM-DD-YYYY'));
    }
  };

  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={dayjs(value)}
          onChange={handleDateChange}
          readOnly={!editable}
          format="MM-DD-YYYY"
          PopperProps={{
            className: prefersDarkMode ? 'custom-datepicker-popper-dark' : '',
          }}
          enableAccessibleFieldDOMStructure={false}
          slots={{
            textField: (params) => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  readOnly: !editable,
                }}
                sx={{
                  width,
                  height,
                  '& .MuiOutlinedInput-root': {
                    height: '100%',
                    backgroundColor: prefersDarkMode ? '#1f2937' : '#f3f4f6',
                    fontSize: '0.875rem',
                    border: 'none',
                    marginTop: '4px',
                    color: prefersDarkMode ? '#f9fafb' : 'inherit',
                  },
                  '& .MuiInputLabel-root': {
                    color: prefersDarkMode ? '#cbd5e1' : 'inherit',
                  },
                }}
              />
            )
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default CustomDatePicker;
