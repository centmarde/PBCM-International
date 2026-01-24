<template>
  <v-container class="page-container">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div class="text-center mb-8">
          <h1 class="text-h2 font-weight-bold mb-4 pbcm-gradient-text">
            About PBCM
          </h1>
          <p class="text-h6 mb-6">
            Philippine Christian Bible Missionary - Our Story and Mission
          </p>
        </div>

        <v-card elevation="4" class="mb-6">
          <v-card-title class="text-h4 text-center py-6">
            <v-icon icon="mdi-church" size="48" color="primary" class="me-4" />
            Our Mission
          </v-card-title>
          <v-card-text class="text-h6 pa-8">
            <p class="mb-4">
              The Incarnation of the Holy Spirit guides our ministry as we serve
              the Lord Jesus Christ and spread His Gospel throughout the Philippines
              and beyond.
            </p>
            <p class="mb-4">
              We are committed to building a community of believers who grow in
              faith, hope, and love while serving others with compassion and
              dedication to God's word.
            </p>
          </v-card-text>
        </v-card>

        <v-row>
          <v-col cols="12" md="6">
            <v-card color="primary" class="text-center pa-6 h-100">
              <v-icon icon="mdi-bible" size="64" class="mb-4" />
              <h3 class="text-h5 mb-4">Our Beliefs</h3>
              <p>
                Founded on Biblical truth and the teachings of Jesus Christ,
                we believe in salvation through faith and the transforming
                power of the Holy Spirit.
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card color="secondary" class="text-center pa-6 h-100">
              <v-icon icon="mdi-heart-multiple" size="64" class="mb-4" />
              <h3 class="text-h5 mb-4">Our Community</h3>
              <p>
                A loving fellowship where believers support one another,
                grow together in faith, and reach out to serve those in
                need with Christ's love.
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
// Page setup
</script>

<style scoped>
.page-container {
  padding: 2rem 0;
  min-height: 70vh;
}
</style>
