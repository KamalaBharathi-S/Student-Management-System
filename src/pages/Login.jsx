import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';
import { School } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Attempt login through AuthContext
    const success = await login(username, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div className={styles.logoContainer}>
            <School size={48} className={styles.logo} />
          </div>
          <h2>EduManage Portal</h2>
          <p>Sign in to your account</p>
        </div>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className={styles.loginBtn}>
            Sign In
          </button>
        </form>
        
        <div className={styles.loginFooter}>
          <p>Use default accounts for testing:</p>
          <ul className={styles.testAccounts}>
            <li><strong>Teacher:</strong> teacher1 / password</li>
            <li><strong>Student:</strong> student1 / password</li>
            <li><strong>Parent:</strong> parent1 / password</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
