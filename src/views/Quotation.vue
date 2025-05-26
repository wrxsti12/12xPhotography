<template>
  <section class="quotation" :style="{ backgroundImage: `url(${marbleBg})` }">
    <div class="glass-card" data-aos="zoom-in-up" data-aos-duration="1000">
      <h1 class="main-title" data-aos="fade-up" data-aos-delay="100">報價方案</h1>
      <p class="subtitle" data-aos="fade-up" data-aos-delay="200">
        簡約、高效、專屬於你的拍攝體驗
      </p>

      <div class="price-grid">
        <div
  v-for="(plan, index) in plans"
  :key="index"
  :class="['price-box', { selected: selectedPlan === index }]"
  @click="selectPlan(index)"
  data-aos="fade-up"
  :data-aos-delay="300 + index * 100"
>

          <h2>{{ plan.title }}</h2>
          <p>{{ plan.desc }}</p>
          <h3>{{ plan.price }}</h3>
        </div>
      </div>

      <router-link to="/contact" class="cta-button" data-aos="fade-up" data-aos-delay="700">
        我要預約
      </router-link>
    </div>
  </section>
</template>


<script setup>
import { ref } from 'vue'
import marbleBg from '../assets/marble.jpg'

const selectedPlan = ref(null)

const selectPlan = (index) => {
  selectedPlan.value = index
}

const plans = [
  { title: 'Lite', desc: '適合個人與入門專案', price: '$3,000 起' },
  { title: 'Pro', desc: '標準Rolling Shot服務', price: '$5,000 起' },
  { title: 'Elite', desc: '專屬客製拍攝計畫', price: '$10,000 起' }
]
</script>


<style scoped>
.quotation {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  padding: 80px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.glass-card {
  max-width: 1100px;
  width: 100%;
  padding: 48px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(20px) saturate(120%);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  text-align: center;
  color: white;
}

.main-title {
  font-size: 42px;
  margin-bottom: 16px;
  letter-spacing: 2px;
}

.subtitle {
  font-size: 18px;
  margin-bottom: 48px;
  opacity: 0.85;
}

.price-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* ✅ 保證橫向排列 */
  gap: 32px;
  margin-bottom: 40px;
}

.price-box {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(12px);
  transition: all 0.4s ease;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  transform: scale(1);
}

.price-box:hover {
  transform: scale(1.04);
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.12);
}

.price-box.highlight {
  border: 2px solid #ffffffcc;
  background: rgba(255, 255, 255, 0.15);
}

.price-box.selected {
  border: 2px solid #ffffffcc;
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
  z-index: 1;
}

.price-box h2 {
  font-size: 22px;
  margin-bottom: 8px;
}

.price-box p {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 12px;
}

.price-box h3 {
  font-size: 20px;
  font-weight: bold;
}

.cta-button {
  padding: 12px 28px;
  background-color: #ffffff22;
  border: 1px solid #ffffff55;
  color: white;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: white;
  color: black;
  transform: scale(1.05);
}
</style>
