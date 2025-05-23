<template>
  <section class="gallery" :style="{ backgroundImage: `url(${marbleBg})` }">
    <div class="hero-content" data-aos="fade-up" data-aos-duration="1000">
      <h1 class="main-title" data-aos="fade-up" data-aos-delay="200">
        Gallery
      </h1>
      <p class="subtitle" data-aos="fade-up" data-aos-delay="400">
        &nbsp;&nbsp; 靜態 × 動態 攝影精選
      </p>
    </div>

    <div class="grid-gallery">
  <div
    v-for="(item, index) in images"
    :key="index"
    class="gallery-item"
    @click="openLightbox(item)"
  >

        <img :src="item.src" :alt="item.name" />
        <div class="overlay">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="lightboxVisible" class="lightbox" @click.self="closeLightbox">
      <div class="lightbox-content">
        <img :src="currentImage.src" :alt="currentImage.name" />
        <p class="lightbox-caption">{{ currentImage.name }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import marbleBg from '../assets/marble.jpg'

const images = [
  { src: '/gallery/static-1.jpg', name: 'Yamaha R1' },
  { src: '/gallery/static-2.jpg', name: 'Kawasaki Ninja400' },
  { src: '/gallery/static-3.jpg', name: 'Kawasaki ZX-4RR' },
  { src: '/gallery/static-4.jpg', name: 'Yamaha MT-09' },
  { src: '/gallery/static-5.jpg', name: 'Yamaha R1 Rolling' },
  { src: '/gallery/static-6.jpg', name: 'Ducati Panigale V4 SP2' },
  { src: '/gallery/static-7.jpg', name: 'Yamaha R15M' },
  { src: '/gallery/static-8.jpg', name: 'Suzuki Gsxr150' }
]

const lightboxVisible = ref(false)
const currentImage = ref({})

function openLightbox(image) {
  currentImage.value = image
  lightboxVisible.value = true
}

function closeLightbox() {
  lightboxVisible.value = false
}
</script>

<style scoped>
.gallery {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  color: white;
  overflow: hidden;
  padding-top: 6rem;
  padding-bottom: 4rem;
}

.gallery::before {
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
  margin-bottom: 3rem;
}

.main-title {
  font-size: 3.2rem;
  font-weight: 700;
  letter-spacing: 0.15rem;
  line-height: 1.3;
  margin-bottom: 1.2rem;
  font-family: 'Playfair Display', serif;
}

.subtitle {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.15rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2.2rem;
}

.grid-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: auto;
  z-index: 1;
  position: relative;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 0 24px rgba(255, 255, 255, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
}

.gallery-item:hover {
  transform: scale(1.02);
  box-shadow: 0 0 28px rgba(255, 255, 255, 0.18);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0.6rem 1rem;
  background: rgba(0, 0, 0, 0.35);
  text-align: center;
  backdrop-filter: blur(5px);
}

.overlay p {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.04rem;
  font-family: 'Playfair Display', serif;
}



/* ✅ Lightbox modal */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.lightbox-content {
  max-width: 90vw;
  max-height: 90vh;
  text-align: center;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.15);
}

.lightbox-caption {
  margin-top: 1rem;
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  color: #fff;
  opacity: 0.85;
}
</style>
