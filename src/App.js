import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import MyPage from './components/MyPage';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import AIBonusPoster from './components/AIBonusPoster';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userPoints, setUserPoints] = useState(0);
  const [userGrade, setUserGrade] = useState('VVIP');
  const [isEventActive, setIsEventActive] = useState(false);

  // 페이지 로드 시 로컬 스토리지에서 사용자 정보 확인
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedPoints = parseInt(localStorage.getItem('userPoints') || '0');
    const savedGrade = localStorage.getItem('userGrade') || 'VVIP';
    
    if (savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
      setUserPoints(savedPoints);
      setUserGrade(savedGrade);
    }
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    
    // 기존 포인트와 등급 정보가 없으면 기본값 설정
    const existingPoints = localStorage.getItem('userPoints');
    const existingGrade = localStorage.getItem('userGrade');
    
    if (!existingPoints) {
      setUserPoints(100000); // 기본 포인트 10만점
      localStorage.setItem('userPoints', '100000');
    } else {
      setUserPoints(parseInt(existingPoints));
    }
    
    if (!existingGrade) {
      setUserGrade('VVIP');
      localStorage.setItem('userGrade', 'VVIP');
    } else {
      setUserGrade(existingGrade);
    }
    
    localStorage.setItem('username', user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserPoints(0);
    setUserGrade('VVIP');
    localStorage.removeItem('username');
    localStorage.removeItem('userPoints');
    localStorage.removeItem('userGrade');
  };

  const handleUpdatePoints = (newPoints) => {
    setUserPoints(newPoints);
    localStorage.setItem('userPoints', newPoints.toString());
  };



  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  isLoggedIn={isLoggedIn} 
                  username={username} 
                  isEventActive={isEventActive}
                  setIsEventActive={setIsEventActive}
                />
              } 
            />
            <Route 
              path="/login" 
              element={
                isLoggedIn ? 
                <Navigate to="/" replace /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/signup" 
              element={
                isLoggedIn ? 
                <Navigate to="/" replace /> : 
                <Signup onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/mypage" 
              element={
                isLoggedIn ? 
                <MyPage 
                  isLoggedIn={isLoggedIn}
                  username={username} 
                  userPoints={userPoints}
                  userGrade={userGrade}
                  onLogout={handleLogout}
                  onUpdatePoints={handleUpdatePoints}
                /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/product/:id" 
              element={
                <ProductDetail 
                  isLoggedIn={isLoggedIn} 
                  userPoints={userPoints}
                  onUpdatePoints={handleUpdatePoints}
                  isEventActive={isEventActive}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  isLoggedIn={isLoggedIn} 
                  onUpdatePoints={handleUpdatePoints}
                />
              } 
            />
            <Route path="/ai-bonus" element={<AIBonusPoster userGrade={userGrade} onUpdatePoints={handleUpdatePoints} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 