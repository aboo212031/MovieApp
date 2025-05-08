import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (field) => (event, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event?.target ? event.target.value : value,
    }));
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="large">
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              value={filters.genre}
              onChange={handleChange("genre")}
              label="Genre"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="28">Action</MenuItem>
              <MenuItem value="35">Comedy</MenuItem>
              <MenuItem value="18">Drama</MenuItem>
              <MenuItem value="27">Horror</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="large">
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              value={filters.year}
              onChange={handleChange("year")}
              label="Year"
            >
              <MenuItem value="">All</MenuItem>
              {[...Array(30)].map((_, i) => {
                const year = 2025 - i;
                return (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterBar;
