import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
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
    setIsLoading(true);

    // 이메일, 비밀번호 유효성 검사
    if (!formData.email || !formData.password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      setIsLoading(false);
      return;
    }
    // 간단한 이메일 형식 체크
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      setIsLoading(false);
      return;
    }

    try {
      console.log('로그인 요청 시작:', `${API_BASE_URL}/auth/signIn`);
      console.log('요청 데이터:', { email: formData.email, password: formData.password });
      
      const requestBody = JSON.stringify({
        email: formData.email,
        password: formData.password
      });
      
      console.log('요청 본문:', requestBody);
      
      // 타임아웃 설정
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10초 타임아웃

      const response = await fetch(`${API_BASE_URL}/auth/signIn`, {
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
        // 로그인 성공
        console.log('로그인 성공');
        onLogin(formData.email);
        navigate('/');
      } else {
        // 로그인 실패
        console.log('로그인 실패:', data);
        setError(data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
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
        <h2 className="text-center mb-20">로그인</h2>
        
        {error && (
          <div className="error-message mb-20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
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
          <button 
            className="btn btn-secondary mt-10"
            onClick={() => {
              console.log('API 테스트 시작');
              fetch('/api/auth/signIn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'test@test.com', password: 'test123' })
              })
              .then(res => console.log('테스트 응답:', res.status))
              .catch(err => console.error('테스트 에러:', err));
            }}
          >
            API 연결 테스트
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 