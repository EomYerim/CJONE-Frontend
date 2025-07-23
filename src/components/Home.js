import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ isLoggedIn, username, isEventActive, setIsEventActive }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60초 카운트다운
  const [remainingSpots, setRemainingSpots] = useState(50); // 남은 자리 수

  // 카테고리 목록
  const categories = ['전체', '엔터테이먼트', '쇼핑', '외식', '여행', '생활/편의'];

  // 카테고리별 제휴 브랜드 상품 데이터
  const categoryProducts = {
    '엔터테이먼트': [
      {
        id: 'tving-1',
        name: "티빙 월정액 이용권",
        price: 13900,
        originalPrice: 13900,
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop",
        category: "엔터테이먼트",
        brand: "티빙",
        description: "결제 금액의 1% 적립 (PC 및 모바일 웹에서 CJ ONE 아이디로 이용권 구매한 경우)"
      },
      {
        id: 'tving-2',
        name: "티빙 연간 이용권",
        price: 139000,
        originalPrice: 166800,
        image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=300&fit=crop",
        category: "엔터테이먼트",
        brand: "티빙",
        description: "결제 금액의 0.3% 적립"
      },
      {
        id: 'cgv-1',
        name: "CGV 영화관람권",
        price: 12000,
        originalPrice: 14000,
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop",
        category: "엔터테이먼트",
        brand: "CGV",
        description: "전국 CGV 영화관람권"
      }
    ],
    '쇼핑': [
      {
        id: 'olive-1',
        name: "올리브영 기프트카드",
        price: 50000,
        originalPrice: 50000,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        category: "쇼핑",
        brand: "올리브영",
        description: "뷰티&헬스 전문점 기프트카드"
      },
      {
        id: 'emart-1',
        name: "이마트 상품권",
        price: 100000,
        originalPrice: 100000,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
        category: "쇼핑",
        brand: "이마트",
        description: "전국 이마트 사용 가능"
      },
      {
        id: 'ssg-1',
        name: "SSG.COM 상품권",
        price: 50000,
        originalPrice: 50000,
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
        category: "쇼핑",
        brand: "SSG.COM",
        description: "온라인 쇼핑몰 상품권"
      }
    ],
    '외식': [
      {
        id: 'vips-1',
        name: "VIPS 스테이크하우스",
        price: 45000,
        originalPrice: 50000,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
        category: "외식",
        brand: "VIPS",
        description: "프리미엄 스테이크 & 뷔페"
      },
      {
        id: 'twosome-1',
        name: "투썸플레이스 기프트카드",
        price: 30000,
        originalPrice: 30000,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        category: "외식",
        brand: "투썸플레이스",
        description: "전국 투썸플레이스 사용 가능"
      },
      {
        id: 'baskin-1',
        name: "배스킨라빈스 기프트카드",
        price: 20000,
        originalPrice: 20000,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
        category: "외식",
        brand: "배스킨라빈스",
        description: "아이스크림 전문점 기프트카드"
      }
    ],
    '여행': [
      {
        id: 'hotel-1',
        name: "CJ대한통운 호텔 패키지",
        price: 150000,
        originalPrice: 180000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
        category: "여행",
        brand: "CJ대한통운",
        description: "전국 주요 호텔 숙박권"
      },
      {
        id: 'travel-1',
        name: "여행 상품권",
        price: 200000,
        originalPrice: 200000,
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
        category: "여행",
        brand: "CJ ONE",
        description: "국내외 여행 상품권"
      }
    ],
    '생활/편의': [
      {
        id: 'gas-1',
        name: "주유소 상품권",
        price: 100000,
        originalPrice: 100000,
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
        category: "생활/편의",
        brand: "CJ대한통운",
        description: "전국 주요 주유소 사용 가능"
      },
      {
        id: 'convenience-1',
        name: "편의점 상품권",
        price: 30000,
        originalPrice: 30000,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        category: "생활/편의",
        brand: "CJ ONE",
        description: "전국 편의점 사용 가능"
      }
    ]
  };

  // 배너 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 3초 후 모달 표시 및 카운트다운 (테스트용)
  // useEffect(() => {
  //   console.log('타이머 시작');
  //   const modalTimer = setTimeout(() => {
  //     console.log('모달 표시');
  //     setShowModal(true);
  //     setIsEventActive(true);
  //   }, 3000); // 3초 후 (테스트용)

  //   return () => {
  //     clearTimeout(modalTimer);
  //   };
  // }, []);

  // // 모달이 열려있을 때만 카운트다운 실행
  // useEffect(() => {
  //   if (!showModal) return;

  //   const countdownTimer = setInterval(() => {
  //     if (timeLeft > 0) {
  //       setTimeLeft(prev => prev - 1);
  //     } else {
  //       setIsEventActive(false);
  //       setShowModal(false);
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(countdownTimer);
  //   };
  // }, [showModal, timeLeft, setIsEventActive]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEventParticipation = () => {
    if (remainingSpots > 0) {
      setRemainingSpots(prev => prev - 1);
      alert(`🎉 선착순 이벤트에 참여하셨습니다!\n남은 자리: ${remainingSpots - 1}개`);
      setShowModal(false);
    } else {
      alert('죄송합니다. 선착순 이벤트가 마감되었습니다.');
      setShowModal(false);
    }
  };

  // 테스트용: 즉시 모달 표시
  const handleTestModal = () => {
    setTimeLeft(60); // 카운트다운 리셋
    setShowModal(true);
    setIsEventActive(true);
  };

  // 선택된 카테고리의 상품들 가져오기
  const getProductsByCategory = () => {
    if (selectedCategory === '전체') {
      return Object.values(categoryProducts).flat();
    }
    return categoryProducts[selectedCategory] || [];
  };

  // 시간 포맷팅
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="home-container">
      {/* 선착순 이벤트 모달 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="event-modal">
            <div className="modal-header">
              <h2>🚨 긴급! 선착순 이벤트</h2>
              <button className="modal-close" onClick={handleModalClose}>×</button>
            </div>
            <div className="modal-content">
              <div className="event-timer">
                <span className="timer-label">남은 시간:</span>
                <span className="timer-display">{formatTime(timeLeft)}</span>
              </div>
              <div className="event-info">
                <h3>🚨 긴급! 티빙 특별 이벤트</h3>
                <p>선착순 {remainingSpots}명에게 <strong>포인트 적립률 2배 증가!</strong></p>
                <p className="event-details">
                  • 월정액 이용권: 1% → <strong>2%</strong> 포인트 적립<br/>
                  • 연간 이용권: 0.3% → <strong>0.6%</strong> 포인트 적립<br/>
                  • 선착순 {remainingSpots}명 한정<br/>
                  • 지금 바로 신청하세요!
                </p>
                <div className="remaining-spots">
                  <span>남은 자리: <strong>{remainingSpots}개</strong></span>
                </div>
                <div className="event-notice">
                  <small>※ CJ ONE 아이디로 구매 시에만 적용됩니다</small>
                  <small>※ PC 및 모바일 웹에서만 적용됩니다</small>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  className="btn btn-primary event-btn"
                  onClick={handleEventParticipation}
                  disabled={!isEventActive || remainingSpots === 0}
                >
                  {remainingSpots > 0 ? '지금 참여하기' : '마감됨'}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={handleModalClose}
                >
                  나중에 하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 이벤트 배너 섹션 */}
      <div className="banner-section">
        <div className="banner-slider">
          <div className={`banner-slide ${currentSlide === 0 ? 'active' : ''}`}>
            <div className="banner-content">
              <h2>🎬 티빙 + CJ ONE 특별 혜택!</h2>
              <p>월정액 이용권 구매 시 <strong>1% 포인트 적립</strong> + <strong>첫 달 50% 할인</strong></p>
              <div className="banner-highlight">
                <span className="highlight-text">🔥 선착순 100명 한정</span>
              </div>
              <button 
                className="btn btn-primary banner-btn"
                onClick={() => setSelectedCategory('엔터테이먼트')}
              >
                지금 확인하기
              </button>
            </div>
          </div>
          <div className={`banner-slide ${currentSlide === 1 ? 'active' : ''}`}>
            <div className="banner-content">
              <h2>🔥 여름 특가 세일</h2>
              <p>모든 상품 최대 50% 할인</p>
              <button 
                className="btn btn-primary banner-btn"
                onClick={() => navigate('/products')}
              >
                쇼핑하기
              </button>
            </div>
          </div>
          <div className={`banner-slide ${currentSlide === 2 ? 'active' : ''}`}>
            <div className="banner-content">
              <h2>🎁 무료 배송 이벤트</h2>
              <p>5만원 이상 구매 시 무료 배송</p>
              <button 
                className="btn btn-primary banner-btn"
                onClick={() => navigate('/products')}
              >
                자세히 보기
              </button>
            </div>
          </div>
          <div className={`banner-slide tving-event ${currentSlide === 3 ? 'active' : ''}`}>
            <div className="banner-content">
              <h2>📺 티빙 제휴 특별 이벤트!</h2>
              <p>결제 금액의 15% 포인트 적립</p>
              <p className="event-period">이벤트 기간: 일주일 한정</p>
              <button 
                className="btn btn-primary banner-btn"
                onClick={() => setSelectedCategory('엔터테이먼트')}
              >
                티빙 상품 보기
              </button>
            </div>
          </div>
        </div>
        <div className="banner-dots">
          <span 
            className={`dot ${currentSlide === 0 ? 'active' : ''}`}
            onClick={() => handleDotClick(0)}
          ></span>
          <span 
            className={`dot ${currentSlide === 1 ? 'active' : ''}`}
            onClick={() => handleDotClick(1)}
          ></span>
          <span 
            className={`dot ${currentSlide === 2 ? 'active' : ''}`}
            onClick={() => handleDotClick(2)}
          ></span>
          <span 
            className={`dot ${currentSlide === 3 ? 'active' : ''}`}
            onClick={() => handleDotClick(3)}
          ></span>
        </div>
      </div>

      {/* AI 기반 개인화 포인트 보너스 안내 배너 */}
      <div className="ai-bonus-banner">
        <div className="container">
          <span role="img" aria-label="ai">🤖</span>
          <strong>AI 기반 개인화 포인트 보너스 오픈!</strong> 지금 나만의 보너스를 확인하세요.
          <button className="ai-bonus-banner-btn" onClick={() => navigate('/ai-bonus')}>
            나만의 보너스 확인하기
          </button>
        </div>
      </div>


      {/* 카테고리 섹션 */}
      <div className="category-section">
        <div className="container">
          <div className="section-header">
            <h2>🏷️ 카테고리별 제휴 브랜드</h2>
          </div>
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>





      {/* 상품 목록 섹션 */}
      <div className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>🔥 {selectedCategory} 제휴 상품</h2>

          </div>
          
          <div className="products-grid">
            {getProductsByCategory().map(product => {
              // AI 개인화 보너스 예시 로직 (랜덤)
              let aiBonus = null;
              const rand = Math.random();
              if (rand < 0.2) aiBonus = '개인화 2배 적립';
              else if (rand < 0.35) aiBonus = '50% 추가 적립';
              else if (rand < 0.45) aiBonus = '신규회원 10배 적립';
              else if (rand < 0.55) aiBonus = '취향저격 3배 적립';
              return (
                <div 
                  key={product.id} 
                  className="product-card"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {product.brand && (
                      <div className="brand-badge">
                        {product.brand}
                      </div>
                    )}
                    {/* AI 개인화 보너스 뱃지 */}
                    {aiBonus && (
                      <div className="ai-bonus-badge">{aiBonus}</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-category">{product.category}</p>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price">
                      <span className="current-price">
                        {product.price.toLocaleString()}원
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="original-price">
                          {product.originalPrice.toLocaleString()}원
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 