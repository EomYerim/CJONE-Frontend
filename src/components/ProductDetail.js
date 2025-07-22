import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = ({ isLoggedIn, userPoints, onUpdatePoints, isEventActive = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);

  // 현실적인 상품 데이터 (실제로는 API에서 가져올 데이터)
  const products = {
    'tving-1': {
      id: 'tving-1',
      name: "티빙 정기결제 구독권",
      price: 13900,
      originalPrice: 13900,
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=600&fit=crop",
      category: "엔터테이먼트",
      brand: "티빙",
      description: "월 13,900원으로 모든 콘텐츠 무제한 시청",
      details: [
        "모든 콘텐츠 무제한 시청",
        "HD 화질 지원",
        "동시시청 2명까지",
        "광고 없는 시청"
      ],
      options: [
        { id: 'monthly', name: '월간 구독', price: 0 },
        { id: 'quarterly', name: '분기 구독', price: -2000 },
        { id: 'yearly', name: '연간 구독', price: -5000 }
      ],
      stock: 999,
      isTvingEvent: true
    },
    'tving-2': {
      id: 'tving-2',
      name: "티빙 프리미엄 패키지",
      price: 19900,
      originalPrice: 19900,
      image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=600&h=600&fit=crop",
      category: "엔터테이먼트",
      brand: "티빙",
      description: "4K 화질 + 동시시청 4명까지",
      details: [
        "4K UHD 화질 지원",
        "동시시청 4명까지",
        "다운로드 기능",
        "프리미엄 콘텐츠 우선 제공"
      ],
      options: [
        { id: 'monthly', name: '월간 구독', price: 0 },
        { id: 'quarterly', name: '분기 구독', price: -3000 },
        { id: 'yearly', name: '연간 구독', price: -8000 }
      ],
      stock: 999,
      isTvingEvent: true
    },
    'cgv-1': {
      id: 'cgv-1',
      name: "CGV 영화관람권",
      price: 12000,
      originalPrice: 14000,
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=600&fit=crop",
      category: "엔터테이먼트",
      brand: "CGV",
      description: "전국 CGV 영화관람권",
      details: [
        "전국 CGV 영화관 사용 가능",
        "2D 영화 1회 관람",
        "유효기간 1년",
        "예매 수수료 없음"
      ],
      options: [
        { id: 'single', name: '1매', price: 0 },
        { id: 'double', name: '2매', price: 0 },
        { id: 'triple', name: '3매', price: 0 }
      ],
      stock: 100
    },
    1: {
      id: 1,
      name: "Apple iPhone 15 Pro",
      price: 1500000,
      originalPrice: 1700000,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
      category: "전자기기",
      discount: 12,
      description: "Apple의 최신 플래그십 스마트폰입니다. A17 Pro 칩과 48MP 카메라로 놀라운 성능을 경험하세요.",
      details: [
        "A17 Pro 칩 탑재",
        "48MP 메인 카메라",
        "6.1인치 Super Retina XDR 디스플레이",
        "USB-C 포트 지원"
      ],
      options: [
        { id: '128gb', name: '128GB', price: 0 },
        { id: '256gb', name: '256GB', price: 200000 },
        { id: '512gb', name: '512GB', price: 400000 }
      ],
      stock: 15
    },
    2: {
      id: 2,
      name: "Samsung Galaxy S24",
      price: 1200000,
      originalPrice: 1400000,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop",
      category: "전자기기",
      discount: 14,
      description: "Samsung의 최신 갤럭시 스마트폰입니다. AI 기능과 강력한 카메라 성능을 자랑합니다.",
      details: [
        "Snapdragon 8 Gen 3 칩",
        "200MP 메인 카메라",
        "6.2인치 Dynamic AMOLED 2X",
        "5000mAh 배터리"
      ],
      options: [
        { id: '128gb', name: '128GB', price: 0 },
        { id: '256gb', name: '256GB', price: 150000 },
        { id: '512gb', name: '512GB', price: 300000 }
      ],
      stock: 8
    },
    3: {
      id: 3,
      name: "Nike Air Max 270",
      price: 180000,
      originalPrice: 220000,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      category: "스포츠",
      discount: 18,
      description: "Nike의 대표적인 에어맥스 시리즈입니다. 최대의 쿠션감과 편안함을 제공합니다.",
      details: [
        "Air Max 270 에어 유닛",
        "메쉬 어퍼 소재",
        "쿠션 중창",
        "고무 아웃솔"
      ],
      options: [
        { id: 'size7', name: '사이즈 7', price: 0 },
        { id: 'size8', name: '사이즈 8', price: 0 },
        { id: 'size9', name: '사이즈 9', price: 0 },
        { id: 'size10', name: '사이즈 10', price: 0 }
      ],
      stock: 12
    },
    4: {
      id: 4,
      name: "Adidas Ultraboost 22",
      price: 250000,
      originalPrice: 300000,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
      category: "스포츠",
      discount: 17,
      description: "Adidas의 프리미엄 러닝화입니다. Boost 중창으로 최고의 에너지 반환을 제공합니다.",
      details: [
        "Boost 중창 기술",
        "Primeknit 어퍼",
        "Continental 고무 아웃솔",
        "Torsion 시스템"
      ],
      options: [
        { id: 'size7', name: '사이즈 7', price: 0 },
        { id: 'size8', name: '사이즈 8', price: 0 },
        { id: 'size9', name: '사이즈 9', price: 0 },
        { id: 'size10', name: '사이즈 10', price: 0 }
      ],
      stock: 20
    },
    5: {
      id: 5,
      name: "MacBook Pro 14인치",
      price: 2800000,
      originalPrice: 3200000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
      category: "전자기기",
      discount: 13,
      description: "Apple의 최신 MacBook Pro입니다. M3 Pro 칩으로 놀라운 성능을 제공합니다.",
      details: [
        "M3 Pro 칩 탑재",
        "14인치 Liquid Retina XDR 디스플레이",
        "16GB 통합 메모리",
        "512GB SSD"
      ],
      options: [
        { id: '512gb', name: '512GB SSD', price: 0 },
        { id: '1tb', name: '1TB SSD', price: 300000 },
        { id: '2tb', name: '2TB SSD', price: 600000 }
      ],
      stock: 5
    },
    6: {
      id: 6,
      name: "Sony WH-1000XM5",
      price: 450000,
      originalPrice: 550000,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      category: "전자기기",
      discount: 18,
      description: "Sony의 최신 노이즈 캔슬링 헤드폰입니다. 업계 최고 수준의 노이즈 캔슬링을 제공합니다.",
      details: [
        "업계 최고 노이즈 캔슬링",
        "30시간 배터리 수명",
        "멀티포인트 연결",
        "퀵 차지 기능"
      ],
      options: [
        { id: 'black', name: '블랙', price: 0 },
        { id: 'silver', name: '실버', price: 0 },
        { id: 'blue', name: '블루', price: 50000 }
      ],
      stock: 100
    }
  };

  const product = products[id];

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="container">
          <div className="card">
            <h2>상품을 찾을 수 없습니다.</h2>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  const finalPrice = product.price + (selectedOption ? product.options.find(opt => opt.id === selectedOption)?.price || 0 : 0);
  const totalPrice = finalPrice * quantity;
  const savings = (product.originalPrice - finalPrice) * quantity;
  
  // 포인트 계산
  const maxPointsToUse = Math.min(userPoints, Math.floor(totalPrice * 0.1)); // 최대 10%까지 포인트 사용 가능
  const actualPointsToUse = usePoints ? Math.min(pointsToUse, maxPointsToUse) : 0;
  const finalTotalPrice = totalPrice - actualPointsToUse;
  
  // 티빙 이벤트 상품인 경우 선착순 이벤트 활성화 시 20%, 기본 15% 적립, 그 외는 1% 적립
  const pointsEarned = product.isTvingEvent 
    ? Math.floor(finalTotalPrice * (isEventActive ? 0.20 : 0.15)) 
    : Math.floor(finalTotalPrice * 0.01);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handlePointsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setPointsToUse(Math.min(value, maxPointsToUse));
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }
    
    if (!selectedOption) {
      alert('옵션을 선택해주세요.');
      return;
    }

    alert('장바구니에 추가되었습니다!');
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return;
    }
    
    if (!selectedOption) {
      alert('옵션을 선택해주세요.');
      return;
    }

    // 포인트 차감 및 적립
    const newPoints = userPoints - actualPointsToUse + pointsEarned;
    onUpdatePoints(newPoints);

    navigate('/checkout', { 
      state: { 
        product, 
        quantity, 
        selectedOption, 
        totalPrice: finalTotalPrice,
        pointsUsed: actualPointsToUse,
        pointsEarned
      } 
    });
  };

  return (
    <div className="product-detail-container">
      <div className="container">
        <div className="product-detail-grid">
          {/* 상품 이미지 */}
          <div className="product-image-section">
            <div className="product-image-large">
              <img src={product.image} alt={product.name} />
              {product.discount > 0 && (
                <div className="discount-badge-large">
                  {product.discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* 상품 정보 */}
          <div className="product-info-section">
            <div className="product-header">
              <span className="product-category">{product.category}</span>
              {product.brand && (
                <span className="product-brand">{product.brand}</span>
              )}
              <h1 className="product-title">{product.name}</h1>
              {product.isTvingEvent && (
                <div className="tving-event-notice">
                  <span className="event-badge">🎁 티빙 제휴 이벤트</span>
                  <span>결제 금액의 {isEventActive ? '20%' : '15%'} 포인트 적립</span>
                </div>
              )}
              <div className="product-price-section">
                <span className="current-price-large">
                  {finalPrice.toLocaleString()}원
                </span>
                {product.originalPrice > finalPrice && (
                  <span className="original-price-large">
                    {product.originalPrice.toLocaleString()}원
                  </span>
                )}
                {savings > 0 && (
                  <span className="savings">
                    {savings.toLocaleString()}원 절약
                  </span>
                )}
              </div>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* 옵션 선택 */}
            <div className="option-section">
              <h3>옵션 선택</h3>
              <div className="option-buttons">
                {product.options.map(option => (
                  <button
                    key={option.id}
                    className={`option-btn ${selectedOption === option.id ? 'selected' : ''}`}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <span>{option.name}</span>
                    {option.price > 0 && <span className="option-price">+{option.price.toLocaleString()}원</span>}
                    {option.price < 0 && <span className="option-price">-{Math.abs(option.price).toLocaleString()}원</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* 수량 선택 */}
            <div className="quantity-section">
              <h3>수량</h3>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
                <span className="stock-info">재고: {product.stock}개</span>
              </div>
            </div>

            {/* 포인트 사용 */}
            {isLoggedIn && (
              <div className="points-section">
                <h3>포인트 사용</h3>
                <div className="points-info">
                  <div className="points-balance">
                    <span>보유 포인트: {userPoints.toLocaleString()}P</span>
                  </div>
                  <div className="points-usage">
                    <label>
                      <input
                        type="checkbox"
                        checked={usePoints}
                        onChange={(e) => setUsePoints(e.target.checked)}
                      />
                      포인트 사용
                    </label>
                    {usePoints && (
                      <div className="points-input">
                        <input
                          type="number"
                          value={pointsToUse}
                          onChange={handlePointsChange}
                          placeholder="사용할 포인트"
                          min="0"
                          max={maxPointsToUse}
                        />
                        <span className="max-points">최대 {maxPointsToUse.toLocaleString()}P 사용 가능</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 총 가격 */}
            <div className="total-price-section">
              <div className="total-price-row">
                <span>상품 금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
              {usePoints && actualPointsToUse > 0 && (
                <div className="total-price-row points-row">
                  <span>포인트 할인</span>
                  <span>-{actualPointsToUse.toLocaleString()}P</span>
                </div>
              )}
              <div className="total-price-row final-price">
                <span>최종 결제 금액</span>
                <span>{finalTotalPrice.toLocaleString()}원</span>
              </div>
              {isLoggedIn && (
                <div className="points-earned-info">
                  <span>적립 예정 포인트: +{pointsEarned.toLocaleString()}P</span>
                </div>
              )}
            </div>

            {/* 구매 버튼 */}
            <div className="purchase-buttons">
              <button 
                className="btn btn-secondary purchase-btn"
                onClick={handleAddToCart}
              >
                장바구니 담기
              </button>
              <button 
                className="btn btn-primary purchase-btn"
                onClick={handleBuyNow}
              >
                바로 구매
              </button>
            </div>
          </div>
        </div>

        {/* 상품 상세 정보 */}
        <div className="product-details-section">
          <div className="card">
            <h2>상품 상세 정보</h2>
            <ul className="product-details-list">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 