import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');

    // 유효성 검사
    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (formData.username.length < 3) {
      setError('아이디는 3자 이상이어야 합니다.');
      return;
    }

    if (formData.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 실제 구현에서는 API 호출을 여기에 추가
    // 지금은 간단한 시뮬레이션
    setSuccess('회원가입이 완료되었습니다! 자동으로 로그인됩니다.');
    
    // 2초 후 자동 로그인
    setTimeout(() => {
      onLogin(formData.username);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h2 className="text-center mb-20">회원가입</h2>
        
        {error && (
          <div className="error-message mb-20">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message mb-20">
            {success}
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
              placeholder="아이디를 입력하세요 (3자 이상)"
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
              placeholder="비밀번호를 입력하세요 (6자 이상)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            회원가입
          </button>
        </form>

        <div className="text-center mt-20">
          <p>
            이미 계정이 있으신가요?{' '}
            <button 
              className="link-button" 
              onClick={() => navigate('/login')}
            >
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup; 