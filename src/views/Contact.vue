<template>
  <section class="contact" :style="{ backgroundImage: `url(${marbleBg})` }">
    <div class="glass-card" data-aos="fade-up" data-aos-duration="1000">
      <div class="price-text" v-if="selectedPlan" data-aos="fade-up" data-aos-delay="100">
        <p>你選擇的方案：<strong>{{ selectedPlan }}</strong></p>
      </div>
      <h1 class="main-title" data-aos="fade-up" data-aos-delay="100">立即預約拍攝</h1>
      <div class="brand-philosophy-text" data-aos="fade-up" data-aos-delay="200"></div>

      <form @submit.prevent="sendEmail" ref="form" class="contact-form" data-aos="fade-up" data-aos-delay="300">
        <div class="input-group" data-aos="fade-up" data-aos-delay="150">
          <input
            id="userName"
            v-model="userName"
            class="contact-input"
            type="text"
            name="user_name"
            placeholder="請輸入您的姓名/綽號"
            autocomplete="off"
            required
          />
        </div>

        <div class="input-group" data-aos="fade-up" data-aos-delay="200">
          <input
            id="userIG"
            v-model="userIG"
            class="contact-input"
            :class="{ 'input-error': showIGError }"
            @input="handleIGInput"
            type="text"
            name="user_ig"
            placeholder="請輸入 IG 名稱"
            autocomplete="off"
            required
          />
          <p class="error-text-stable">{{ errorMessage }}</p>
        </div>

        <textarea
          v-model="userNote"
          name="message"
          readonly
          class="contact-input"
          placeholder="【方案】將自動填入"
          data-aos="fade-up"
          data-aos-delay="250"
        ></textarea>

        <select
          v-model="shootType"
          name="shoot_type"
          class="contact-input"
          required
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <option disabled selected value="">拍攝需求</option>
          <option>靜態攝影</option>
          <option>動態Rolling</option>
          <option>Reels短片紀錄</option>
        </select>

        <!-- 拍攝日期 Datepicker -->
<Datepicker
  v-model="selectedDate"
  placeholder="請選擇拍攝日期"
  :min-date="new Date()"
  :enable-time-picker="false"
  :disabled-dates="disableWeekdays"
  :teleport="true"
  class="contact-input"
  name="shoot_date"
  required
  data-aos="fade-up"
  data-aos-delay="400"
/>

<!-- 拍攝時段 (早場/午場/晚場) -->
<select
  v-model="shootClock"
  name="shoot_clock"
  class="contact-input"
  required
  data-aos="fade-up"
  data-aos-delay="410"
>
  <option disabled selected value="">請選擇拍攝時段</option>
  <option value="早場">早場</option>
  <option value="午場">午場</option>
  <option value="晚場">晚場</option>
</select>

        <input type="hidden" name="shoot_full_time" :value="shootFullTime" />
        <input v-if="selectedPlan" type="hidden" name="plan" :value="selectedPlan" />

        <button type="submit" class="submit-btn" data-aos="zoom-in" data-aos-delay="800">
          提交預約
        </button>

        <p v-if="done" class="success-msg">
  📩 預約已送出，請留意訊息通知！我會私訊與您確認詳細時間
</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import emailjs from '@emailjs/browser'
import { supabase } from '@/supabase'
import marbleBg from '../assets/marble.jpg'
import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from '@vuepic/vue-datepicker'

const selectedDate = ref(null)

const form = ref(null)
const done = ref(false)
const userName = ref('')
const userIG = ref('')
const userNote = ref('')
const shootType = ref('')
const shootDate = ref('')
const shootClock = ref('')
const route = useRoute()
const selectedPlan = ref('')
const today = new Date().toISOString().split('T')[0]

// ✅ 判斷是否是假日（六日）
function isWeekend(dateString) {
  if (!dateString) return false
  const day = new Date(dateString).getDay()
  return day === 6 || day === 0
}

// ✅ 限定只能假日的方案
const restrictedPlans = ['動態攝影', 'Reels短片拍攝']

// ✅ 是否為受限方案（假日限定）
const isWeekendRestricted = computed(() =>
  restrictedPlans.includes(selectedPlan.value)
)

// ✅ 是否目前選了不合法的平日日期
const isDateBlocked = computed(() =>
  isWeekendRestricted.value && shootDate.value && !isWeekend(shootDate.value)
)

// ✅ 自動清除錯誤的日期
watch([shootDate, selectedPlan], () => {
  if (isWeekendRestricted.value && shootDate.value && !isWeekend(shootDate.value)) {
    shootDate.value = ''
  }
})

// ✅ Date + 時段合併時間
const shootFullTime = computed(() => {
  if (!shootDate.value || !shootClock.value) return ''
  const [year, month, day] = shootDate.value.split('-')
  return `${year}年${month}月${day}日 ${shootClock.value}`
})

// ✅ 判斷 IG 是否有效
const isValidIG = ref(true)
const showIGError = ref(false)
const errorMessage = computed(() =>
  showIGError.value ? '請輸入有效 IG 名稱（3~30字，只能包含英文、數字、. 和 _）' : ''
)

function handleIGInput() {
  const pattern = /^[A-Za-z0-9._]{3,30}$/
  isValidIG.value = pattern.test(userIG.value)
  showIGError.value = userIG.value !== '' && !isValidIG.value
}

// ✅ 發送 Email + 寫入 Supabase
async function sendEmail() {
  handleIGInput()
  if (!isValidIG.value) {
    alert('請輸入正確的 IG 名稱')
    return
  }

  try {
    // 1️⃣ 若有特殊欄位，先手動補進表單
    const fullTimeInput = form.value.querySelector('input[name="shoot_full_time"]')
    if (fullTimeInput) fullTimeInput.value = shootFullTime.value

    // 2️⃣ 建立 formData 並補入 DatePicker 欄位
    const formData = new FormData(form.value)
    formData.append('拍攝日期', shootDate.value) // ✅ 正確變數名，補對應欄位名稱


    // 3️⃣ 傳送 EmailJS（改用 formData 傳遞）
    await emailjs.sendForm('service_sutp5s9', 'template_gw85rci', form.value, '3DH3YZGxSTMbs0gwQ')

    // 4️⃣ 同步寫入 Supabase
    const { error } = await supabase.from('reservations').insert([
      {
        user_name: userName.value,
        user_ig: userIG.value,
        shoot_type: shootType.value,
        shoot_date: shootDate.value,
        shoot_clock: shootClock.value,
        message: userNote.value,
        plan: selectedPlan.value,
        shoot_full_time: shootFullTime.value
      }
    ])

    if (error) {
      console.error('❌ Supabase 寫入失敗：', error.message)
    } else {
      done.value = true
    }

  } catch (err) {
    console.error('❌ 發送或寫入錯誤：', err)
    alert('提交失敗，請稍後再試')
  }
}


// ✅ 根據 URL 帶入方案（初始化）
onMounted(() => {
  const planParam = route.query.plan
  if (planParam) {
    const decodedPlan = decodeURIComponent(planParam)
    selectedPlan.value = decodedPlan

    if (userNote.value === '') {
      userNote.value = `【方案】${decodedPlan}`
    } else if (!userNote.value.includes(decodedPlan)) {
      userNote.value = `【方案】${decodedPlan}\n${userNote.value}`
    }

    if (shootType.value === '') {
      switch (decodedPlan) {
        case '靜態攝影':
          shootType.value = '靜態攝影'
          break
        case '動態攝影':
          shootType.value = '動態Rolling'
          break
        case 'Reels短片拍攝':
          shootType.value = 'Reels短片紀錄'
          break
        default:
          shootType.value = decodedPlan
      }
    }
  }

  if (userIG.value === '') {
    isValidIG.value = true
    showIGError.value = false
  } else {
    handleIGInput()
  }
})

function disableWeekdays(date) {
  const day = date.getDay()
  return day !== 6 && day !== 0 // 非六日就禁用
}
</script>





<style scoped>

.dp__menu {
  z-index: 9999 !important;
}
.contact {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  padding: 4rem 2rem;
  color: white;
  text-align: center;
  overflow: hidden;
}


.contact::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
}

.glass-card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 3rem;
  max-width: 900px;
  width: 100%;
  margin: auto;
  text-align: center;
  z-index: 0;
  position: relative;
  pointer-events: auto;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position: relative;
  z-index: 10;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.contact-input {
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s ease;
}

.input-error {
  border: 1px solid #ff4d4d;
  background-color: rgba(255, 77, 77, 0.05);
}

.contact-form select:hover,
.contact-form select:focus {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(0, 0, 0, 0.5);
}

.contact-form select {
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: white;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="20" width="20" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
}

.contact-form textarea {
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  font-family: inherit;
  font-size: 1rem;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.submit-btn {
  margin-top: 2.5rem;
  align-self: center;
  padding: 0.9rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: 0.05rem;
  box-shadow: 0 0 0 rgba(255, 255, 255, 0);
}

.submit-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.15);
}

.success-msg {
  margin-top: 1.5rem;
  text-align: center;
  color: #9ff09f;
  font-weight: 500;
  font-size: 1rem;
}

.error-text-stable {
  color: #ff8888;
  font-size: 0.85rem;
  min-height: 0.5rem;
  line-height: 0.5rem;
  margin-top: 0.2rem;
  margin-bottom: -0.3rem;
  opacity: 1;
  transition: opacity 0.2s ease;
}

.error-text-stable:empty {
  opacity: 0;
}

.page-intro {
  font-size: 1.05rem;
  color: rgba(100, 98, 98, 0.65);
  font-family: 'Cormorant Garamond', serif;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* ✅ RWD 補強：768px 以下 */
@media (max-width: 768px) {
  .glass-card {
    padding: 2rem 1rem;
  }

  .contact {
    padding: 2rem 1rem;
  }

  .contact-input,
.contact-form textarea,
.contact-form select {
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
}

  .submit-btn {
    font-size: 1rem;
    padding: 0.8rem 1.2rem;
  }

  .success-msg {
    font-size: 0.95rem;
  }
}

/* ✅ 更小手機尺寸補強：480px 以下 */
@media (max-width: 480px) {
  .contact-input,
  .contact-form textarea,
  .contact-form select {
    font-size: 0.95rem;
    padding: 0.75rem 0.9rem;
    line-height: 1.4;
  }


  .main-title {
    font-size: 1.5rem;
  }

  .contact {
    padding: 1.5rem 1rem;
  }

  .submit-btn {
    font-size: 0.95rem;
    padding: 0.6rem 1rem;
  }

  .contact-input,
  .contact-form textarea,
  .contact-form select {
    font-size: 0.95rem;
  }

  .contact-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
}


.price-text {
  max-width: 420px;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Cormorant Garamond', serif;
  line-height: 1.8;
  font-size: 1rem;
}

.price-text p {
  margin-bottom: 2rem;
  white-space: pre-line;
}
}

.contact-form input,
.contact-form textarea,
.contact-form select {
  position: relative;
  z-index: 20; /* 必須比 glass-card 高 */
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  pointer-events: auto; /* 強制可點 */
}
</style>
