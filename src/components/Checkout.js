import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ isLoggedIn, onUpdatePoints }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    addressDetail: '',
    zipCode: '',
    paymentMethod: 'card'
  });

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  if (!location.state) {
    navigate('/');
    return null;
  }

  const { product, quantity, selectedOption, totalPrice, pointsUsed, pointsEarned } = location.state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 폼 검증
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    // 구매 완료 처리
    alert('구매가 완료되었습니다!');
    
    // 포인트 적립 (이미 ProductDetail에서 차감되었으므로 적립만)
    const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
    const newPoints = currentPoints + pointsEarned;
    onUpdatePoints(newPoints);
    
    navigate('/mypage');
  };

  const selectedOptionData = product.options.find(opt => opt.id === selectedOption);
  const optionPrice = selectedOptionData ? selectedOptionData.price : 0;

  return (
    <div className="checkout-container">
      <div className="container">
        <div className="checkout-header">
          <h1>주문/결제</h1>
          <p>주문 정보를 확인하고 결제를 진행해주세요.</p>
        </div>

        <div className="checkout-grid">
          {/* 주문 상품 정보 */}
          <div className="card order-summary-card">
            <div className="card-header">
              <h2>📦 주문 상품</h2>
            </div>
            <div className="order-item-detail">
              <div className="product-info">
                <img src={product.image} alt={product.name} className="product-thumbnail" />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  {selectedOptionData && (
                    <p className="product-option">옵션: {selectedOptionData.name}</p>
                  )}
                  <p className="product-quantity">수량: {quantity}개</p>
                </div>
              </div>
              <div className="product-price">
                <span className="price-amount">{(product.price + optionPrice).toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* 결제 정보 */}
          <div className="card payment-summary-card">
            <div className="card-header">
              <h2>💰 결제 정보</h2>
            </div>
            <div className="payment-breakdown">
              <div className="payment-row">
                <span>상품 금액</span>
                <span>{(product.price + optionPrice).toLocaleString()}원</span>
              </div>
              <div className="payment-row">
                <span>수량</span>
                <span>{quantity}개</span>
              </div>
              <div className="payment-row subtotal">
                <span>소계</span>
                <span>{((product.price + optionPrice) * quantity).toLocaleString()}원</span>
              </div>
              {pointsUsed > 0 && (
                <div className="payment-row points-discount">
                  <span>포인트 할인</span>
                  <span>-{pointsUsed.toLocaleString()}P</span>
                </div>
              )}
              <div className="payment-row total">
                <span>최종 결제 금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="payment-row points-earned">
                <span>적립 예정 포인트</span>
                <span>+{pointsEarned.toLocaleString()}P</span>
              </div>
            </div>
          </div>

          {/* 배송 정보 */}
          <div className="card delivery-form-card">
            <div className="card-header">
              <h2>🚚 배송 정보</h2>
            </div>
            <form onSubmit={handleSubmit} className="delivery-form">
              <div className="form-group">
                <label className="form-label">받는 분 *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="이름을 입력하세요"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">이메일 *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="이메일을 입력하세요"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">연락처 *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="연락처를 입력하세요"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">우편번호 *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="우편번호를 입력하세요"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">기본주소 *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="기본주소를 입력하세요"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">상세주소</label>
                <input
                  type="text"
                  name="addressDetail"
                  value={formData.addressDetail}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="상세주소를 입력하세요"
                />
              </div>

              {/* 결제 방법 */}
              <div className="form-group">
                <label className="form-label">결제 방법 *</label>
                <div className="payment-methods">
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                    />
                    <span>신용카드</span>
                  </label>
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={handleInputChange}
                    />
                    <span>계좌이체</span>
                  </label>
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="phone"
                      checked={formData.paymentMethod === 'phone'}
                      onChange={handleInputChange}
                    />
                    <span>휴대폰 결제</span>
                  </label>
                </div>
              </div>

              {/* 주문 버튼 */}
              <div className="checkout-actions">
                <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                  이전으로
                </button>
                <button type="submit" className="btn btn-primary">
                  {totalPrice.toLocaleString()}원 결제하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 