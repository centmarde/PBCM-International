<template>
  <v-container class="page-container">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <div class="text-center mb-8">
          <h1 class="text-h2 font-weight-bold mb-4 pbcm-gradient-text">
            Our Services
          </h1>
          <p class="text-h6 mb-6">
            Join us in worship and fellowship
          </p>
        </div>

        <v-row>
          <v-col cols="12" md="6" lg="4" v-for="service in services" :key="service.title">
            <v-card elevation="4" class="h-100">
              <v-card-title class="text-center py-6" :color="service.color">
                <v-icon :icon="service.icon" size="48" :color="service.color" class="d-block mx-auto mb-4" />
                <h3 class="text-h5">{{ service.title }}</h3>
              </v-card-title>
              <v-card-text class="pa-6">
                <div class="mb-4">
                  <v-chip :color="service.color" variant="outlined" class="mb-2">
                    <v-icon icon="mdi-clock" start />
                    {{ service.time }}
                  </v-chip>
                  <v-chip :color="service.color" variant="outlined" class="mb-2 ml-2">
                    <v-icon icon="mdi-calendar" start />
                    {{ service.day }}
                  </v-chip>
                </div>
                <p class="mb-4">{{ service.description }}</p>
                <v-btn
                  :color="service.color"
                  variant="outlined"
                  block
                  prepend-icon="mdi-information"
                >
                  Learn More
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
type Service = {
  title: string
  time: string
  day: string
  description: string
  icon: string
  color: 'primary' | 'secondary'
}

const services: Service[] = [
  {
    title: 'Sunday Worship Service',
    time: '10:00 AM',
    day: 'Sundays',
    description: 'Join us for our main worship service with praise, prayer, and Biblical teaching.',
    icon: 'mdi-church',
    color: 'primary'
  },
  {
    title: 'Bible Study',
    time: '7:00 PM',
    day: 'Wednesdays',
    description: 'Dive deeper into God\'s Word through interactive Bible study and discussion.',
    icon: 'mdi-book-open-variant',
    color: 'secondary'
  },
  {
    title: 'Prayer Meeting',
    time: '6:00 PM',
    day: 'Fridays',
    description: 'Come together in prayer for our community, nation, and world.',
    icon: 'mdi-hands-pray',
    color: 'primary'
  },
  {
    title: 'Youth Fellowship',
    time: '4:00 PM',
    day: 'Saturdays',
    description: 'Young people gathering for fellowship, activities, and spiritual growth.',
    icon: 'mdi-account-group',
    color: 'secondary'
  },
  {
    title: 'Morning Devotion',
    time: '6:00 AM',
    day: 'Daily',
    description: 'Start your day with prayer and meditation on God\'s Word.',
    icon: 'mdi-weather-sunrise',
    color: 'primary'
  },
  {
    title: 'Community Outreach',
    time: 'Various',
    day: 'Monthly',
    description: 'Serving our community through various outreach programs and activities.',
    icon: 'mdi-heart-multiple-outline',
    color: 'secondary'
  }
]
</script>

<style scoped>
.page-container {
  padding: 2rem 0;
  min-height: 70vh;
}
</style>
