<template>
  <section class="home" :style="{ backgroundImage: `url(${marbleBg})` }">
    <!-- ⛔ 拿掉 .glass-card -->
    <div class="hero-content" data-aos="fade-up" data-aos-duration="1000">
      <!-- 原始主標區 -->
      <h1
        class="main-title"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
      >
        攝 影 預 約 表 單 
      </h1>

      <p
        class="subtitle"
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="1000"
      >
        P i n h u a &nbsp;&nbsp; P h o t o g r a p h y
      </p>

      
      <div class="hero-title" style="margin-top: 2.5rem;">
        <span class="line" data-aos="fade-up" data-aos-delay="0">Pinhua 靜態 × 動態攝影</span><br />
<span class="line" data-aos="fade-up" data-aos-delay="200">快門落下，是光影說話的時刻</span><br />
<span class="line" data-aos="fade-up" data-aos-delay="400">紀錄，不只是留下，更是讓它成為永恆</span>

      </div>

      <router-link
  to="/contact"
  class="cta-btn"
  data-aos="zoom-in"
  data-aos-delay="800"
  data-aos-duration="800"
>
  立即預約拍攝
</router-link><p></p>

    </div>
  </section>
</template>

<script setup>
import marbleBg from '../assets/marble.jpg'

function scrollToContact() {
  window.scrollTo({ top: 1000, behavior: 'smooth' })
}
</script>

<style scoped>
.home {
  height: 100vh; /* ✅ 讓首頁占滿整個畫面 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  color: white;
  overflow: hidden;
}


.hero-title {
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: 0.08rem;
  text-align: center;
  padding-bottom: 2rem; 
}


.line {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  font-weight: 400;
  letter-spacing: 0.05rem;
  background: linear-gradient(90deg, #ffffff, #d9d9d9, #ffffff); 
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  opacity: 0.85;
}


.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6); 
  z-index: 0;
}

.hero-content {
  z-index: 1;
  position: relative;
  max-width: 960px;
  width: 100%;
  margin: auto;
  text-align: center;
}


.main-title {
  font-size: 3.2rem;
  font-weight: 700;
  letter-spacing: 0.15rem;
  line-height: 1.3;
  margin-bottom: 1.2rem;
}

.subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.35rem;
  color: #ccc;
  opacity: 0.9;
  margin-bottom: 2rem;
}


.cta-btn {
  margin-top: 1.8rem; /* ✅ 與上方文字保有呼吸感，但不過遠 */
  background-color: transparent;
  color: #ffffff;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.4); /* ✅ 輕薄白邊框 */
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: 0.08rem;
}

.cta-btn:hover {
  background-color: rgba(255, 255, 255, 0.1); /* ✅ 微亮 hover 背景 */
  border-color: rgba(255, 255, 255, 0.6);      /* ✅ 邊框亮一點 */
  box-shadow: 0 4px 18px rgba(255, 255, 255, 0.15); /* ✅ 光暈感 hover 效果 */
}



</style>
