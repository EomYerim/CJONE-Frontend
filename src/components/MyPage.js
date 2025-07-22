import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';

const MyPage = ({ isLoggedIn, username, userPoints, userGrade, onLogout, onUpdatePoints }) => {
  const navigate = useNavigate();
  const [bonusReceived, setBonusReceived] = useState(false);
  const [showBonusCard, setShowBonusCard] = useState(true);
  const [bonusLoading, setBonusLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, success: null, message: '' });

  const SERVER_URL = 'http://a0219d35d86ab4232acd477406a5d205-1866668016.ap-northeast-2.elb.amazonaws.com';

  // 등급별 보너스 포인트
  const getBonusAmount = () => {
    if (userGrade === 'SVIP') return 10000;
    if (userGrade === 'VVIP') return 7000;
    if (userGrade === 'VIP') return 5000;
    return 3000;
  };
  const bonusAmount = getBonusAmount();

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  const getGradeInfo = (grade) => {
    const gradeInfo = {
      'VIP': {
        name: 'VIP',
        color: '#FFD700',
        cardColor: '#f8f9fa', // 밝은 회색
        benefits: ['포인트 1.2배 적립', '무료 배송', '전용 고객센터']
      },
      'VVIP': {
        name: 'VVIP',
        color: '#C0C0C0',
        cardColor: '#ffffff', // 흰색
        benefits: ['포인트 1.5배 적립', '무료 배송', '전용 고객센터', '우선 주문 처리']
      },
      'SVIP': {
        name: 'SVIP',
        color: '#FF6B35',
        cardColor: '#fff8dc', // 밝은 크림색
        benefits: ['포인트 2배 적립', '무료 배송', '전용 고객센터', '우선 주문 처리', '전용 할인 혜택']
      }
    };
    return gradeInfo[grade] || gradeInfo['VVIP'];
  };

  const gradeInfo = getGradeInfo(userGrade);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleReceiveBonus = async () => {
    if (bonusReceived || bonusLoading) return;
    setBonusLoading(true);
    try {
      await fetch(`${SERVER_URL}/points/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'YERIM', basePoints: 10 })
      });
      setModal({
        open: true,
        success: false,
        message: '포인트 적립에 실패했습니다. 다시 시도해 주세요.'
      });
    } catch (e) {
      setModal({
        open: true,
        success: false,
        message: '포인트 적립에 실패했습니다. 다시 시도해 주세요.'
      });
    }
    setBonusLoading(false);
  };

  return (
    <div className="mypage-container">
      <div className="container">
        {/* AI 개인화 보너스 안내 카드 */}
        {showBonusCard && (
          <div className="ai-bonus-card">
            <h2>🎉 AI 기반 개인화 포인트 보너스 오픈 기념!</h2>
            <p>지금 <strong>{bonusAmount.toLocaleString()}P</strong> 추가 적립 혜택을 받아보세요.</p>
            {!bonusReceived ? (
              <button className="ai-bonus-btn" onClick={handleReceiveBonus} disabled={bonusLoading}>
                {bonusLoading ? 'API 호출 중...' : '포인트 추가 받기'}
              </button>
            ) : (
              <span className="ai-bonus-success">보너스가 지급되었습니다!</span>
            )}
          </div>
        )}
        {/* 보너스 결과 모달 */}
        {modal.open && (
          <div className="ai-bonus-modal-overlay">
            <div className="ai-bonus-modal">
              <div className="modal-content">
                {modal.success ? (
                  <>
                    <div className="modal-icon success">🎉</div>
                    <h3>포인트 적립 완료!</h3>
                    <p>{modal.message}</p>
                  </>
                ) : (
                  <>
                    <div className="modal-icon fail">⚠️</div>
                    <h3>포인트 적립 실패</h3>
                    <p>{modal.message}</p>
                  </>
                )}
                <button className="ai-bonus-btn" onClick={() => setModal({ ...modal, open: false })}>닫기</button>
              </div>
            </div>
          </div>
        )}
        <div className="mypage-header">
          <h1>마이페이지</h1>
        </div>

        <div className="mypage-grid">
          {/* 포인트 정보 */}
          <div className="card points-card" style={{ backgroundColor: gradeInfo.cardColor }}>
            <div className="card-header">
              <h2>💰 포인트 현황</h2>
            </div>
            <div className="points-info">
              <div className="current-points">
                <span className="points-label">현재 포인트</span>
                <span className="points-amount">{userPoints.toLocaleString()}P</span>
              </div>
              <div className="points-details">
                <div className="points-item">
                  <span>이번 달 적립</span>
                  <span>+{(userPoints * 0.1).toLocaleString()}P</span>
                </div>
                <div className="points-item">
                  <span>이번 달 사용</span>
                  <span>-{(userPoints * 0.05).toLocaleString()}P</span>
                </div>
              </div>
            </div>
          </div>

          {/* 등급 정보 */}
          <div className="card grade-card">
            <div className="card-header">
              <h2>👑 등급 정보</h2>
            </div>
            <div className="grade-info">
              <div className="grade-badge" style={{ backgroundColor: gradeInfo.color }}>
                {gradeInfo.name}
              </div>
              <div className="grade-details">
                <h3>{gradeInfo.name} 등급</h3>
                <ul className="benefits-list">
                  {gradeInfo.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 주문 내역 */}
          <div className="card orders-card">
            <div className="card-header">
              <h2>📦 주문 내역</h2>
            </div>
            <div className="orders-list">
              <div className="order-item">
                <div className="order-info">
                  <h4>Apple iPhone 15 Pro</h4>
                  <p>2024.01.15 주문</p>
                  <span className="order-status completed">배송 완료</span>
                </div>
                <div className="order-price">
                  <span>1,500,000원</span>
                  <span className="points-used">-150,000P 사용</span>
                </div>
              </div>
              <div className="order-item">
                <div className="order-info">
                  <h4>Nike Air Max 270</h4>
                  <p>2024.01.10 주문</p>
                  <span className="order-status processing">배송 중</span>
                </div>
                <div className="order-price">
                  <span>180,000원</span>
                  <span className="points-used">-18,000P 사용</span>
                </div>
              </div>
            </div>
          </div>

          {/* 포인트 적립 내역 */}
          <div className="card points-history-card">
            <div className="card-header">
              <h2>📊 포인트 적립 내역</h2>
            </div>
            <div className="points-history">
              <div className="history-item">
                <div className="history-info">
                  <span>Apple iPhone 15 Pro 구매</span>
                  <span>2024.01.15</span>
                </div>
                <span className="points-earned">+15,000P</span>
              </div>
              <div className="history-item">
                <div className="history-info">
                  <span>Nike Air Max 270 구매</span>
                  <span>2024.01.10</span>
                </div>
                <span className="points-earned">+1,800P</span>
              </div>
              <div className="history-item">
                <div className="history-info">
                  <span>신규 가입 보너스</span>
                  <span>2024.01.01</span>
                </div>
                <span className="points-earned">+10,000P</span>
              </div>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="mypage-actions">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            쇼핑 계속하기
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage; 