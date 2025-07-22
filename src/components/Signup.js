import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Signup = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = '/api'; // 프록시 사용

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // 유효성 검사
    if (!formData.email || !formData.password || !formData.name) {
      setError('모든 필드를 입력해주세요.');
      setIsLoading(false);
      return;
    }
    // 이메일 형식 체크
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      setIsLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      setIsLoading(false);
      return;
    }
    if (formData.name.length < 2) {
      setError('이름은 2자 이상이어야 합니다.');
      setIsLoading(false);
      return;
    }

    try {
      console.log('회원가입 요청 시작:', `${API_BASE_URL}/auth/signUp`);
      console.log('요청 데이터:', { username: formData.name, password: formData.password, email: formData.email });
      
      const requestBody = JSON.stringify({
        username: formData.name,
        password: formData.password,
        email: formData.email
      });
      
      console.log('요청 본문:', requestBody);
      
      // 타임아웃 설정
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10초 타임아웃

      const response = await fetch(`${API_BASE_URL}/auth/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('응답 상태:', response.status);
      console.log('응답 헤더:', response.headers);

      const data = await response.json();
      console.log('응답 데이터:', data);

      if (response.ok) {
        // 회원가입 성공
        console.log('회원가입 성공');
        setSuccess('회원가입이 완료되었습니다! 자동으로 로그인됩니다.');
        
        // 2초 후 자동 로그인
        setTimeout(() => {
          onLogin(formData.email);
          navigate('/');
        }, 2000);
      } else {
        // 회원가입 실패
        console.log('회원가입 실패:', data);
        setError(data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 에러:', error);
      console.error('에러 상세:', error.message);
      
      if (error.name === 'AbortError') {
        setError('요청 시간이 초과되었습니다. 서버 상태를 확인해주세요.');
      } else if (error.message.includes('Failed to fetch')) {
        setError('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
      } else {
        setError(`서버 연결에 실패했습니다: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
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
            <label htmlFor="name" className="form-label">
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
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
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={isLoading}
          >
            {isLoading ? '회원가입 중...' : '회원가입'}
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