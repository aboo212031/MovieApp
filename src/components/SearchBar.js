import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";

const SearchBar = ({ searchTerm, onChange }) => {
  const [history, setHistory] = useState([]);

  // Load search history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("searchHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Save to history only on Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchTerm.trim()) {
      const newTerm = searchTerm.trim();
      if (!history.includes(newTerm)) {
        const updated = [newTerm, ...history].slice(0, 10);
        setHistory(updated);
        localStorage.setItem("searchHistory", JSON.stringify(updated));
      }
    }
  };

  return (
    <Box mt={2} mb={2} width="100%">
      <Autocomplete
        freeSolo
        options={history}
        inputValue={searchTerm}
        onInputChange={(event, newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for movies"
            variant="outlined"
            fullWidth
            onKeyDown={handleKeyDown}
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;
