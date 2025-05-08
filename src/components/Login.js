import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Username"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        type="password"
        label="Password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={onLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
