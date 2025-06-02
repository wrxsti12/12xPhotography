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
  :key="plan.title + '-' + index"
  :class="['price-box', { selected: selectedPlanIndex === index, bonus: plan.isBonus }]"
  @click="handleSelect(index)"
  data-aos="fade-up"
  :data-aos-delay="300 + index * 100"
  v-once
>
  <div class="checkmark" v-if="selectedPlanIndex === index">✔</div>
  <h2>{{ plan.title }}</h2>
  <p>{{ plan.desc }}</p>
  <h3 v-if="plan.price">{{ plan.price }}</h3>
</div>

      </div>

      <!-- ✅ 引導提示 -->
      <p v-if="selectedPlanIndex === null" class="tip-text">
        請先選擇一個方案才能預約
      </p>

      <p v-if="selectedPlanIndex !== null" class="selection-label" data-aos="fade-in">
  ✅ 你已選擇方案：<strong>{{ plans[selectedPlanIndex].title }}</strong>
</p>


      <button
        class="cta-button"
        @click="goToContactWithPlan"
        :disabled="selectedPlanIndex === null"
        data-aos="fade-up"
        data-aos-delay="700"
      >
        我要預約
      </button>
    </div>
  </section>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import marbleBg from '../assets/marble.jpg'

const router = useRouter()

const selectedPlanIndex = ref(null)

const plans = [
  { title: '靜態攝影', desc: '適合個人與入門專案', price: '$1,500 - $2,000' },
  { title: '動態攝影', desc: '標準 Rolling Shot 服務', price: '$2,500' },
  { title: 'Reels短片拍攝', desc: '專屬客製拍攝計畫', price: '$10,000 起' },
  {
    title: '📩 優惠方案',
    desc: '靜態＋動態同日拍攝享 9 折優惠\n曾合作車友另享折扣 $200',
    price: '',
    isBonus: true
  }
]

// 點擊方案（排除 bonus 類型）
function handleSelect(index) {
  const plan = plans[index]
  if (!plan.isBonus) {
    selectedPlanIndex.value = index
  }
}


// 導向 /contact 並帶上方案
function goToContactWithPlan() {
  const selected = selectedPlanIndex.value
  if (selected !== null && !plans[selected].isBonus) {
    router.push({ path: '/contact', query: { plan: plans[selected].title } })
  }
}

</script>



<style scoped>
.quotation {
  width: 100vw;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 80px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  margin: 0;
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  margin-bottom: 40px;
}

.price-box {
  position: relative;
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

.price-box.selected {
  transform: scale(1.07);
  border: 2px solid #00ffc8;
  background: rgba(0, 255, 200, 0.08);
  box-shadow: 0 0 18px rgba(0, 255, 200, 0.3);
  z-index: 2;
}

/* ✅ 選中 ✔ checkmark */
.checkmark {
  position: absolute;
  top: 14px;
  right: 16px;
  width: 28px;
  height: 28px;
  background-color: #00c896;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px rgba(0, 200, 150, 0.5);
  animation: popIn 0.4s ease-out;
}

@keyframes popIn {
  from {
    transform: scale(0.3);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
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
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.cta-button:hover {
  background-color: white;
  color: black;
  transform: scale(1.05);
}

.cta-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tip-text {
  font-size: 0.95rem;
  margin-top: -12px;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.65);
}

/* ✅ 新增：選擇提示文字 */
.selection-label {
  font-size: 1rem;
  margin-top: -12px;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.price-box.bonus {
  cursor: default;
  background: rgba(255, 255, 255, 0.06);
  border: 1px dashed rgba(255, 255, 255, 0.3);
  opacity: 0.9;
  pointer-events: none;
}

.price-box.bonus h2 {
  font-size: 18px;
}

.price-box.bonus p {
  white-space: pre-line;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
}

</style>
