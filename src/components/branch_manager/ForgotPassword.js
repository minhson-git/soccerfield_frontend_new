import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleResetPassword = () => {
    // Thực hiện hành động gửi yêu cầu đặt lại mật khẩu ở đây, ví dụ gọi API
    setSubmitted(true);
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 400,
        margin: '50px auto',
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Forgot Password
      </Typography>
      {submitted ? (
        <Typography variant="body1" align="center">
          A password reset link has been sent to your email. Please check your inbox.
        </Typography>
      ) : (
        <>
          <Typography variant="body1" align="center" gutterBottom>
            Enter your email address to reset your password
          </Typography>
          <TextField
            fullWidth
            label="Email address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleResetPassword}
            disabled={!email}
            fullWidth
          >
            Reset Password
          </Button>
        </>
      )}
    </Box>
  );
};

export default ForgotPassword;
