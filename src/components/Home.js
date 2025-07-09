import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ isLoggedIn, username }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // 현실적인 상품 데이터
  const products = [
    {
      id: 1,
      name: "Apple iPhone 15 Pro",
      price: 1500000,
      originalPrice: 1700000,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      category: "전자기기",
      discount: 12
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 1200000,
      originalPrice: 1400000,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
      category: "전자기기",
      discount: 14
    },
    {
      id: 3,
      name: "Nike Air Max 270",
      price: 180000,
      originalPrice: 220000,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      category: "스포츠",
      discount: 18
    },
    {
      id: 4,
      name: "Adidas Ultraboost 22",
      price: 250000,
      originalPrice: 300000,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop",
      category: "스포츠",
      discount: 17
    },
    {
      id: 5,
      name: "MacBook Pro 14인치",
      price: 2800000,
      originalPrice: 3200000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      category: "전자기기",
      discount: 13
    },
    {
      id: 6,
      name: "Sony WH-1000XM5",
      price: 450000,
      originalPrice: 550000,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      category: "전자기기",
      discount: 18
    }
  ];

  // 배너 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home-container">
      {/* 이벤트 배너 섹션 */}
      <div className="banner-section">
        <div className="banner-slider">
          <div className={`banner-slide ${currentSlide === 0 ? 'active' : ''}`}>
            <div className="banner-content">
              <h2>🎉 특별 이벤트!</h2>
              <p>신규 회원가입 시 10,000원 할인 쿠폰 증정</p>
              <button 
                className="btn btn-primary banner-btn"
                onClick={() => navigate('/signup')}
              >
                회원가입하기
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
        </div>
      </div>

      {/* 환영 메시지 */}
      <div className="welcome-section">
        <div className="container">
          {!isLoggedIn ? (
            <div className="welcome-content">
              <h1>CJONE에 오신 것을 환영합니다!</h1>
              <p>최고의 서비스와 특별한 혜택을 경험해보세요.</p>
              <div className="cta-buttons">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/login')}
                >
                  로그인하기
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => navigate('/signup')}
                >
                  회원가입하기
                </button>
              </div>
            </div>
          ) : (
            <div className="welcome-content">
              <h1>안녕하세요, <strong>{username}</strong>님!</h1>
              <p>오늘도 특별한 쇼핑을 즐겨보세요.</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/mypage')}
              >
                마이페이지로 이동
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 상품 목록 섹션 */}
      <div className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>🔥 인기 상품</h2>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/products')}
            >
              전체보기
            </button>
          </div>
          
          <div className="products-grid">
            {products.map(product => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.discount > 0 && (
                    <div className="discount-badge">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 