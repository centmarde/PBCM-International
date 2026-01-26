<script setup lang="ts">
type HeroContent = {
  title: string
  subtitle: string
  description: string
  imageUrl: string
  imageAlt: string
}

const heroContent: HeroContent = {
  title: 'Welcome to PBCM',
  subtitle: 'Philippine Christian Benevolent Missionary',
  description: 'The Incarnation of the Holy Spirit. Join us in worship, fellowship, and spiritual growth as we spread the Gospel and serve our community with love and compassion.',
  imageUrl: '/assets/master-portrait.jpg',
  imageAlt: 'PBCM Church Logo'
}
</script>





<template>
	<v-container fluid>
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
</style>
