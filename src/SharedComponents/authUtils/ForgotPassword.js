import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Alert, Typography, Space } from "antd";
import { motion } from "framer-motion";
import { post } from "../httpClient ";

const { Title, Text } = Typography;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sendDetailsSuccess, setSendDetailsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleForgotPassword = async (values) => {
    try {
      const payload = {
        email: values.email,
        category: "FORGOT_PASSWORD",
      };

      const response = await post("/auth/resetPassword", payload);

      if (response.status === 200 || response.status === 201) {
        setSendDetailsSuccess(true);
        setError(null);
      }
    } catch (err) {
      setError("Email does not exist");
      console.error("An error occurred:", err);
    }
  };

  const handleCloseSuccess = () => {
    setSendDetailsSuccess(false);
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={styles.formContainer}
      >
        <Title level={1} style={styles.title}>
          Forgot Password?
        </Title>
        <Text style={styles.subtitle}>
          Don't worry. Resetting your password is easy — just tell us the email address you registered with{" "}
          <strong>Zeno HR</strong>.
        </Text>

        <Space direction="vertical" size="middle" style={{ width: "100%", marginTop: 32 }}>
          {error && (
            <Alert
              message={error}
              type="error"
              closable
              onClose={() => setError(null)}
              showIcon
            />
          )}

          {sendDetailsSuccess && (
            <Alert
              message="Temporary password details emailed successfully!"
              type="success"
              closable
              onClose={handleCloseSuccess}
              showIcon
            />
          )}

          <Form layout="vertical" onFinish={handleForgotPassword} requiredMark={false}>
            <Form.Item
              label={<span style={styles.label}>E-mail Address</span>}
              name="email"
              rules={[
                { required: true, message: "Please enter your email address" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={styles.resetBtn}
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>

          <div style={styles.backToLogin}>
            <Text style={{ color: "#6b7280" }}>
              Remembered your password?{" "}
              <Link to="/login" style={styles.loginLink}>
                Back to Login
              </Link>
            </Text>
          </div>
        </Space>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#ffffff",
    padding: "40px 20px",
  },
  formContainer: {
    width: "100%",
    maxWidth: "420px",
  },
  title: {
    color: "#1e3a8a",
    fontSize: "2.5rem",
    fontWeight: 600,
    marginBottom: "12px",
  },
  subtitle: {
    color: "#6b7280",
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  label: {
    color: "#1e3a8a",
    fontSize: "0.9rem",
    fontWeight: 500,
  },
  input: {
    padding: "12px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "6px",
    fontSize: "1rem",
  },
  resetBtn: {
    width: "100%",
    padding: "14px",
    background: "#1e40af",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: 500,
    height: "48px",
  },
  backToLogin: {
    textAlign: "center",
    fontSize: "0.9rem",
  },
  loginLink: {
    color: "#1e3a8a",
    textDecoration: "none",
    fontWeight: 600,
  },
};
