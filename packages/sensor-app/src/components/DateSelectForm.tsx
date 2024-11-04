import { useState, FormEvent, useContext, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, Button } from "@mui/material";
import { Intervals } from "../constants/sensor-data-intervals";
import { subDays } from "date-fns";
import { SettingsContext } from "../providers/settings-context";

const AFTER = "after";
const BETWEEN = "between";

export default function DateSelectForm({
  handleDateChange,
}: {
  handleDateChange: (dates: Date[], interval: Intervals) => void;
}) {
  const baseError = {
    pickerZero: { error: false, msg: "" },
    pickerOne: { error: false, msg: "" },
  };
  const [rangeType, setRangeType] = useState(AFTER);
  const [timeInterval, setTimeInterval] = useState(Intervals.FIVE_MINUTES);
  const [dateRange, setDateRange] = useState<Date[]>([subDays(new Date(), 1)]);
  const [errors, setErrors] = useState(baseError);

  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    handleDateChange(dateRange, timeInterval);
  }, [settings]);

  const handleRangeTypeChange = (event: SelectChangeEvent) => {
    setRangeType(event.target.value);
    setDateRange([dateRange[0]]);
    setErrors({ ...errors, pickerOne: baseError.pickerOne });
  };

  const handleIntervalChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const enumValue = Object.values(Intervals).find((e) => e === value);
    setTimeInterval(enumValue!);
  };

  const handleDateRangeChange = (newValue: Date, positionIdx: number) => {
    const updatedRange = [...dateRange];
    updatedRange[positionIdx] = newValue;
    setDateRange(updatedRange);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errMsg = "Please Select a Date";
    const err = baseError;

    if (!dateRange[0]) {
      err.pickerZero = {
        error: true,
        msg: errMsg,
      };
    }
    if (rangeType === BETWEEN && !dateRange[1]) {
      err.pickerOne = {
        error: true,
        msg: errMsg,
      };
    }

    if (err.pickerOne.error || err.pickerZero.error) {
      return setErrors(err);
    }
    setErrors(baseError);
    return handleDateChange(dateRange, timeInterval);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", m: 2 }}>
        <Box>
          <FormControl variant="standard" sx={{ m: 2, width: 200 }}>
            <InputLabel id="Date-interval-selector-label">
              Time Interval
            </InputLabel>
            <Select
              labelId="Date-interval-selector-label"
              id="Date-interval-selector"
              value={timeInterval}
              onChange={handleIntervalChange}
              label="Date Range Type"
              sx={{ textTransform: "capitalize" }}
            >
              {Object.values(Intervals).map((interval) => (
                <MenuItem
                  key={interval}
                  value={interval}
                  sx={{ textTransform: "capitalize" }}
                >
                  {interval}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 2, width: 200 }}>
            <InputLabel id="Date-Range-selector-label">
              Date Range Type
            </InputLabel>
            <Select
              labelId="Date-Range-selector-label"
              id="Date-Range-selector"
              value={rangeType}
              onChange={handleRangeTypeChange}
              label="Date Range Type"
              sx={{ textTransform: "capitalize" }}
            >
              {[AFTER, BETWEEN].map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                  sx={{ textTransform: "capitalize" }}
                >
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <DateTimePicker
            sx={{ m: 2 }}
            value={dateRange[0]}
            maxDateTime={dateRange[1] ?? undefined}
            label={rangeType === BETWEEN ? "DateTime From" : "DateTime After"}
            onAccept={(newValue) => handleDateRangeChange(newValue as Date, 0)}
            slotProps={{
              textField: {
                error: errors.pickerZero.error,
                helperText: errors.pickerZero.msg,
              },
            }}
          />
          {rangeType === BETWEEN && (
            <DateTimePicker
              sx={{ m: 2 }}
              minDateTime={dateRange[0]}
              label="DateTime To"
              onAccept={(newValue) =>
                handleDateRangeChange(newValue as Date, 1)
              }
              slotProps={{
                textField: {
                  error: errors.pickerOne.error,
                  helperText: errors.pickerOne.msg,
                },
              }}
            />
          )}
        </Box>
        <Button
          type="submit"
          sx={{ m: 2, alignSelf: "start" }}
          variant="contained"
        >
          Go
        </Button>
      </Box>
    </form>
  );
}
