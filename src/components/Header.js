import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo" onClick={() => navigate('/')}>
            <div>
              <h1>CJONE</h1>
            </div>
          </div>
          <nav className="nav">
            {!isLoggedIn ? (
              <>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => navigate('/login')}
                >
                  로그인
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate('/signup')}
                >
                  회원가입
                </button>
              </>
            ) : (
              <>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate('/mypage')}
                >
                  마이페이지
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 