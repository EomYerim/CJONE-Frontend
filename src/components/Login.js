import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 간단한 유효성 검사
    if (!formData.username || !formData.password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 실제 구현에서는 API 호출을 여기에 추가
    // 지금은 간단한 시뮬레이션
    if (formData.username === 'test' && formData.password === 'test123') {
      onLogin(formData.username);
      navigate('/');
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h2 className="text-center mb-20">로그인</h2>
        
        {error && (
          <div className="error-message mb-20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              아이디
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              value={formData.username}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            로그인
          </button>
        </form>

        <div className="text-center mt-20">
          <p>
            계정이 없으신가요?{' '}
            <button 
              className="link-button" 
              onClick={() => navigate('/signup')}
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 