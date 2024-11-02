import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleResetPassword = () => {
    // Thực hiện hành động gửi yêu cầu đặt lại mật khẩu ở đây, ví dụ gọi API
    setSubmitted(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Forgot Password</h2>
      {submitted ? (
        <p style={styles.confirmationText}>
          A password reset link has been sent to your email. Please check your inbox.
        </p>
      ) : (
        <>
          <p style={styles.text}>Enter your email address to reset your password</p>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <button
            style={styles.button}
            onClick={handleResetPassword}
            disabled={!email} 
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '40px',
    maxWidth: '400px',
    margin: '50px auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Roboto', sans-serif",
  },
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#2C3E50',
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    marginBottom: '20px',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background 0.3s',
  },
  confirmationText: {
    fontSize: '1rem',
    color: '#2C3E50',
    textAlign: 'center',
  },
};

export default ForgotPassword;
