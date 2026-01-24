<script lang="ts" setup>
type HeroContent = {
  title: string
  subtitle: string
  description: string
  imageUrl: string
  imageAlt: string
}

const heroContent: HeroContent = {
  title: 'Welcome to PBCM',
  subtitle: 'Philippine Christian Bible Missionary',
  description: 'The Incarnation of the Holy Spirit. Join us in worship, fellowship, and spiritual growth as we spread the Gospel and serve our community with love and compassion.',
  imageUrl: '/assets/master-portrait.jpg',
  imageAlt: 'PBCM Church Logo'
}
</script>

<template>
  <v-container fluid class="hero-section">
    <v-row align="center" justify="center" class="fill-height">
      <!-- Left Column - Content -->
      <v-col cols="12" md="6" class="hero-content">
        <div class="text-content">
          <h1 class="hero-title text-h2 text-md-h1 font-weight-bold mb-4">
            {{ heroContent.title }}
          </h1>
          <h2 class="hero-subtitle text-h5 text-md-h4 mb-6">
            {{ heroContent.subtitle }}
          </h2>
          <p class="hero-description text-body-1 text-md-h6 mb-8">
            {{ heroContent.description }}
          </p>

          <div class="hero-actions">
            <v-btn
              color="primary"
              size="large"
              class="me-4 mb-2"
              prepend-icon="mdi-home-heart"
              elevation="2"
            >
              Visit Us
            </v-btn>
            <v-btn
              color="secondary"
              variant="outlined"
              size="large"
              class="mb-2"
              prepend-icon="mdi-calendar-heart"
            >
              Service Times
            </v-btn>
          </div>
        </div>
      </v-col>

      <!-- Right Column - Image -->
      <v-col cols="12" md="6" class="hero-image">
        <div class="image-container">
          <v-card class="hero-card" elevation="8">
            <v-img
              :src="heroContent.imageUrl"
              :alt="heroContent.imageAlt"
              class="hero-logo"
              contain
              max-height="400"
            />
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.hero-section {
  min-height: 80vh;
  background: linear-gradient(135deg,
    rgb(var(--v-theme-background)) 0%,
    rgb(var(--v-theme-surface-variant)) 100%);
  padding: 2rem 0;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-content {
  max-width: 500px;
}

.hero-title {
  background: linear-gradient(45deg,
    rgb(var(--v-theme-primary)),
    rgb(var(--v-theme-primary-lighten-1)));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

.hero-subtitle {
  color: rgb(var(--v-theme-secondary));
  font-weight: 500;
}

.hero-description {
  color: rgb(var(--v-theme-on-background));
  opacity: 0.87;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.hero-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.hero-card {
  border-radius: 16px;
  border: 2px solid rgb(var(--v-theme-primary));
  background: linear-gradient(135deg,
    rgba(var(--v-theme-primary), 0.05) 0%,
    rgba(var(--v-theme-secondary), 0.05) 100%);
  transition: all 0.3s ease;
}

.hero-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(var(--v-theme-primary), 0.3);
}

.hero-logo {
  transition: transform 0.3s ease;
  padding: 1rem;
}

/* Theme-aware button animations */
:deep(.v-btn--variant-elevated) {
  box-shadow: 0 4px 8px rgba(var(--v-theme-primary), 0.3);
}

:deep(.v-btn--variant-elevated:hover) {
  box-shadow: 0 6px 12px rgba(var(--v-theme-primary), 0.4);
  transform: translateY(-1px);
}

:deep(.v-btn--variant-outlined) {
  border-color: rgb(var(--v-theme-secondary));
}

:deep(.v-btn--variant-outlined:hover) {
  background-color: rgba(var(--v-theme-secondary), 0.1);
  transform: translateY(-1px);
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .hero-section {
    min-height: 70vh;
    padding: 1rem 0;
  }

  .text-content {
    text-align: center;
    margin-bottom: 2rem;
  }

  .hero-actions {
    justify-content: center;
  }
}

/* Dark theme specific adjustments */
:root .v-theme--pbcmDark {
  .hero-title {
    background: linear-gradient(45deg,
      rgb(var(--v-theme-primary)),
      rgb(var(--v-theme-secondary)));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-card {
    background: linear-gradient(135deg,
      rgba(var(--v-theme-surface), 0.8) 0%,
      rgba(var(--v-theme-surface-variant), 0.9) 100%);
  }
}
</style>
