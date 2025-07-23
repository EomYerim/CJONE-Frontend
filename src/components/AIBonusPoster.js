import React, { useState } from 'react';

// 서버 URL (실제 환경에 맞게 변경 필요)
const SERVER_URL = 'http://a0219d35d86ab4232acd477406a5d205-1866668016.ap-northeast-2.elb.amazonaws.com';

// CJ ONE 등급 정보 (실제 CJ ONE 브랜드 색상 및 디자인 반영)
const gradeInfo = {
  SVIP: { 
    name: 'SVIP', 
    color: 'linear-gradient(135deg, #E3B448 0%, #B98D3A 100%)', 
    textColor: '#FFFFFF',
    bonus: 100 
  },
  VVIP: { 
    name: 'VVIP', 
    color: 'linear-gradient(135deg, #BDBDBD 0%, #8C8C8C 100%)', 
    textColor: '#FFFFFF',
    bonus: 70 
  },
  VIP: { 
    name: 'VIP', 
    color: 'linear-gradient(135deg, #4A4A4A 0%, #2C2C2C 100%)', 
    textColor: '#FFFFFF',
    bonus: 50 
  },
};

// 메인 컴포넌트
export default function AIBonusPoster({ userGrade = 'VVIP', onUpdatePoints }) {
  // 모달 상태 관리 (성공/실패 케이스 분리)
  const [modal, setModal] = useState({ open: false, status: 'success', message: '' });
  const [loading, setLoading] = useState(false);

  // 보너스 포인트 적립 핸들러
  const handleReceiveBonus = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}/points/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'YERIM', basePoints: 10 }) // userId는 실제 환경에 맞게 동적으로 전달해야 합니다.
      });

      if (response.ok) {
        // 성공 시
        const result = await response.json();
        const receivedPoints = result.totalPoints; // API 응답에 따라 키 이름 변경 필요
        setModal({ 
          open: true, 
          status: 'success', 
          message: `${receivedPoints}P가 성공적으로 적립되었습니다!` 
        });
        if (onUpdatePoints) {
          onUpdatePoints(); // 부모 컴포넌트의 포인트 상태 업데이트
        }
      } else {
        // 실패 시 (서버 에러)
        throw new Error('Server response was not ok.');
      }
    } catch (error) {
      // 실패 시 (네트워크 에러 등)
      console.error("Failed to receive bonus:", error);
      setModal({ 
        open: true, 
        status: 'error', 
        message: '포인트 적립에 실패했습니다. 잠시 후 다시 시도해 주세요.' 
      });
    }
    setLoading(false);
  };

  return (
    <div className="ai-bonus-page" style={{ 
      minHeight: '100vh',
      background: '#f4f5f7',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* --- 상단 헤더 --- */}
      <header style={{
        background: 'white',
        padding: '12px 20px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        {/* <img 
          src="https://i.imgur.com/8aL4a2s.png" // CJ ONE 로고 URL
          alt="CJ ONE Logo"
          style={{ height: '24px', verticalAlign: 'middle' }}
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x24/e60012/white?text=CJ+ONE'; }}
        /> */}
      </header>

      {/* --- 메인 콘텐츠 --- */}
      <main style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          
          {/* 등급별 포인트 안내 */}
          <section style={{ marginBottom: 60 }}>
            <h2 style={{ 
              fontSize: 26, 
              fontWeight: 700, 
              textAlign: 'center', 
              marginBottom: 32,
              color: '#111'
            }}>
              등급별 오픈 기념 포인트
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 24
            }}>
              {Object.entries(gradeInfo).map(([grade, info]) => (
                <div key={grade} style={{ 
                  background: info.color, 
                  color: info.textColor, 
                  borderRadius: 16, 
                  padding: '28px 24px', 
                  textAlign: 'center',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}>
                  <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8, textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
                    {info.name}
                  </div>
                  <div style={{ 
                    fontSize: 34, 
                    fontWeight: 900, 
                    color: '#fff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.25)'
                  }}>
                    {info.bonus}<span style={{fontSize: 24, fontWeight: 700}}>P</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 500, marginTop: 8, opacity: 0.9 }}>
                    즉시 지급
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 서비스 소개 */}
          <section style={{ 
            background: 'white', 
            borderRadius: 20, 
            padding: 40, 
            marginBottom: 60,
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)'
          }}>
            <h2 style={{ 
              fontSize: 26, 
              fontWeight: 700, 
              marginBottom: 28,
              color: '#111',
              textAlign: 'center'
            }}>
              더 똑똑해진 CJ ONE, AI 포인트
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 32,
              fontSize: 15,
              lineHeight: 1.7,
              color: '#555',
              textAlign: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#e60012', marginBottom: 12 }}>
                  #개인화_분석
                </h3>
                <p>
                  사용자의 구매 이력과 선호도를 AI가 분석하여 맞춤형 보너스를 제공합니다.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#e60012', marginBottom: 12 }}>
                  #실시간_추천
                </h3>
                <p>
                  구매 시점에 실시간으로 최적화된 포인트 적립 혜택을 추천해 드립니다.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#e60012', marginBottom: 12 }}>
                  #스마트_적립
                </h3>
                <p>
                  기본 적립에 더해 AI 분석 기반 보너스 포인트를 자동으로 적립해 드립니다.
                </p>
              </div>
            </div>
          </section>

          {/* 적립 버튼 섹션 (CTA) */}
          <section style={{ 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #e60012 0%, #c40010 100%)',
            borderRadius: 20,
            padding: 40,
            color: 'white',
            boxShadow: '0 12px 40px rgba(230, 0, 18, 0.25)'
          }}>
            <h2 style={{ 
              fontSize: 28, 
              fontWeight: 800, 
              marginBottom: 12,
              textShadow: '0 2px 4px rgba(0,0,0,0.15)'
            }}>
              AI 기반 포인트 서비스 오픈
            </h2>
            <p style={{ 
              fontSize: 17, 
              opacity: 0.9, 
              marginBottom: 28,
              lineHeight: 1.6
            }}>
              CJ ONE이 AI로 더 똑똑해졌어요!<br/>
              개인화 포인트 보너스 신규 도입을 기념하여<br/>
              지금 바로 등급별 차등 포인트를 받아보세요.
            </p>
            <button 
              onClick={handleReceiveBonus} 
              disabled={loading} 
              style={{ 
                fontSize: 18, 
                fontWeight: 700, 
                background: 'white', 
                color: '#e60012', 
                border: 'none', 
                borderRadius: 12, 
                padding: '16px 40px', 
                cursor: 'pointer', 
                boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                minWidth: 260,
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 18px rgba(0,0,0,0.1)';
              }}
            >
              {loading ? '적립 중...' : '내 등급 포인트 받기'}
            </button>
          </section>
        </div>
      </main>

      {/* --- 성공/실패 모달 --- */}
      {modal.open && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
        }}>
          <div style={{ 
            background: 'white', borderRadius: 20, padding: '32px 40px', 
            minWidth: 300, maxWidth: '90%', textAlign: 'center', 
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            animation: 'modalSlideIn 0.3s ease-out forwards'
          }}>
            <div style={{ 
              fontSize: 48, marginBottom: 16,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}>
              {modal.status === 'success' ? '✅' : '❌'}
            </div>
            <div style={{ 
              fontSize: 18, fontWeight: 600, 
              color: modal.status === 'success' ? '#28a745' : '#e60012', 
              marginBottom: 24, lineHeight: 1.5,
              wordBreak: 'keep-all'
            }}>{modal.message}</div>
            <button 
              onClick={() => setModal({open: false, status: '', message: ''})} 
              style={{ 
                fontSize: 16, 
                background: modal.status === 'success' ? '#28a745' : '#e60012', 
                color: '#fff', border: 'none', borderRadius: 12, 
                padding: '12px 32px', cursor: 'pointer', fontWeight: 600,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
