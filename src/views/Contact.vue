<template>
  <section class="contact" :style="{ backgroundImage: `url(${marbleBg})` }">
    <div class="glass-card" data-aos="fade-up" data-aos-duration="1000">
      <h1 class="main-title" data-aos="fade-up" data-aos-delay="100">
        立即預約拍攝
      </h1>

      <form @submit.prevent="sendEmail" ref="form" class="contact-form" data-aos="fade-up" data-aos-delay="200">
        <!-- 👤 使用者姓名欄位 -->
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

        <!-- 📱 IG 名稱輸入區 -->
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

        <!-- 備註區塊 -->
        <textarea
          v-model="userNote"
          name="message"
          placeholder="車種 ?  ( Ex: Yamaha R1 )"
          data-aos="fade-up"
          data-aos-delay="500"
        ></textarea>

        <!-- 拍攝需求 -->
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

        <!-- 拍攝日期欄位（只給選幾月幾號） -->
        <input
          v-model="shootDate"
          type="date"
          name="shoot_date"
          class="contact-input"
          :min="today"
          required
          data-aos="fade-up"
          data-aos-delay="400"
        />

        <!-- 拍攝時間欄位（幾點幾分） -->
        <input
          v-model="shootClock"
          type="time"
          name="shoot_clock"
          class="contact-input"
          required
          data-aos="fade-up"
          data-aos-delay="410"
        />

        <!-- 隱藏的完整時間欄位（給 EmailJS 傳資料） -->
        <input
          type="hidden"
          name="shoot_full_time"
          :value="shootFullTime"
        />

        <!-- 送出按鈕 -->
        <button type="submit" class="submit-btn" data-aos="zoom-in" data-aos-delay="800">
          提交預約
        </button>
        <p></p>

        <!-- 成功訊息 -->
        <p v-if="done" class="success-msg" data-aos="fade-up" data-aos-delay="1000">
          📩 預約已送出，請留意訊息通知！我會私訊與您確認詳細時間<p></p>
        </p>
      </form>

      <footer class="page-footer" data-aos="fade-up" data-aos-delay="1000">
        © 2025 Pinhua Photography | 靜態 × Rolling 攝影
      </footer>
    </div>
  </section>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import emailjs from '@emailjs/browser'
import marbleBg from '../assets/marble.jpg'

const form = ref(null)
const done = ref(false)

const userName = ref('')
const userIG = ref('')
const userNote = ref('')
const shootType = ref('')
const shootDate = ref('')
const shootClock = ref('')

const shootFullTime = computed(() => {
  if (!shootDate.value || !shootClock.value) return ''
  const [year, month, day] = shootDate.value.split('-')
  return `${year}年${month}月${day}日 ${shootClock.value}`
})

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

function sendEmail() {
  handleIGInput()

  if (!isValidIG.value) {
    alert('請輸入正確的 IG 名稱')
    return
  }

  console.log('📤 準備發送表單...')
  console.log('🧾 姓名：', userName.value)
  console.log('🧾 IG：', userIG.value)
  console.log('🧾 拍攝時間：', shootClock.value)
  console.log('🧾 合併時間：', shootFullTime.value)

  try {
    const fullTimeInput = form.value.querySelector('input[name="shoot_full_time"]')
    if (fullTimeInput) {
      fullTimeInput.value = shootFullTime.value
      console.log('✅ 手動補值成功：', fullTimeInput.value)
    }

    emailjs.sendForm(
      'service_sutp5s9',
      'template_gw85rci',
      form.value,
      '3DH3YZGxSTMbs0gwQ'
    ).then(() => {
      console.log('✅ EmailJS 成功送出')
      done.value = true
    }).catch((error) => {
      console.error('❌ EmailJS 發送失敗：', error)
      alert('發送失敗：' + error.text)
    })
  } catch (err) {
    console.error('❌ 重大錯誤：', err)
    alert('提交表單發生錯誤，請稍後再試')
  }
}

const today = new Date().toISOString().split('T')[0]

onMounted(() => {
  if (userIG.value === '') {
    isValidIG.value = true
    showIGError.value = false
  } else {
    handleIGInput()
  }
})
</script>




<style scoped>
.contact {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
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
  z-index: 1;
  position: relative;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}


.input-group {
  display: flex;
  flex-direction: column;
}

/* 所有 input 欄位共用樣式 */
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

/* 錯誤時加上紅框樣式 */
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
  background: rgba(0, 0, 0, 0.3); /* ✅ 透明黑底 */
  backdrop-filter: blur(8px);     /* ✅ 模糊玻璃效果 */
  -webkit-backdrop-filter: blur(8px);
  color: white;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  appearance: none;               /* ✅ 移除預設樣式 */
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
  background: rgba(0, 0, 0, 0.3); /* ✅ 透明黑底 */
  backdrop-filter: blur(10px);    /* ✅ 玻璃毛玻模糊 */
  -webkit-backdrop-filter: blur(10px);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: 0.05rem;
  box-shadow: 0 0 0 rgba(255, 255, 255, 0); /* 初始無光暈 */
}

.submit-btn:hover {
  background: rgba(255, 255, 255, 0.05);  /* ✅ 微白高亮玻璃 */
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.15); /* ✅ 光暈感 */
}

.success-msg {
  margin-top: 1.5rem;
  text-align: center;
  color: #9ff09f;
  font-weight: 500;
  font-size: 1rem;
}

/* 穩定顯示的錯誤訊息樣式 */
.error-text-stable {
  color: #ff8888;
  font-size: 0.85rem;
  min-height: 0.5rem;     /* ✅ 更小的佔位空間 */
  line-height: 0.5rem;
  margin-top: 0.2rem;     /* ✅ 與 input 間距 */
  margin-bottom: -0.3rem; /* ✅ 精準壓回來距離 */
  opacity: 1;
  transition: opacity 0.2s ease;
}

.error-text-stable:empty {
  opacity: 0;
}

.page-intro {
  font-size: 1.05rem;
  color: rgba(100, 98, 98, 0.65); /* ✅ 白色但有透明度 */
  font-family: 'Cormorant Garamond', serif;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
    text-align: center;
  }

  .contact-input,
  .contact-form textarea {
    width: 100%;
    font-size: 1rem;
  }

  .glass-card {
    padding: 2rem 1.5rem;
  }

  .grid-gallery {
    grid-template-columns: 1fr !important;
  }

  .gallery-item {
    border-radius: 12px;
  }

  .submit-btn {
    font-size: 1rem;
    padding: 0.8rem 1.2rem;
  }
}

}


</style>
