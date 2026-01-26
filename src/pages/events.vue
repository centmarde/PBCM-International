<script lang="ts" setup>
import OuterLayout from '@/layouts/outerLayout.vue'
type Event = {
  title: string
  date: string
  time: string
  description: string
  icon: string
  color: 'primary' | 'secondary'
}

type QuickEvent = {
  title: string
  subtitle: string
  day: string
  icon: string
  color: 'primary' | 'secondary'
}

const quickEvents: QuickEvent[] = [
  {
    title: 'Sunday Service',
    subtitle: '10:00 AM - Main Sanctuary',
    day: 'Sun',
    icon: 'mdi-church',
    color: 'primary'
  },
  {
    title: 'Bible Study',
    subtitle: '7:00 PM - Fellowship Hall',
    day: 'Wed',
    icon: 'mdi-book-open-variant',
    color: 'secondary'
  },
  {
    title: 'Prayer Meeting',
    subtitle: '6:00 PM - Prayer Room',
    day: 'Fri',
    icon: 'mdi-hands-pray',
    color: 'primary'
  },
  {
    title: 'Youth Fellowship',
    subtitle: '4:00 PM - Youth Center',
    day: 'Sat',
    icon: 'mdi-account-group',
    color: 'secondary'
  }
]

const upcomingEvents: Event[] = [
  {
    title: 'Mission Sunday',
    date: 'February 2, 2026',
    time: '10:00 AM',
    description: 'Join us as we celebrate our missionary work and hear testimonies from our mission field.',
    icon: 'mdi-earth',
    color: 'primary'
  },
  {
    title: 'Community Outreach',
    date: 'February 8, 2026',
    time: '8:00 AM',
    description: 'Help us serve our community through feeding programs and medical assistance.',
    icon: 'mdi-heart-multiple',
    color: 'secondary'
  },
  {
    title: 'Baptism Service',
    date: 'February 15, 2026',
    time: '11:00 AM',
    description: 'Witness new believers take their step of faith through water baptism.',
    icon: 'mdi-water',
    color: 'primary'
  },
  {
    title: 'Marriage Retreat',
    date: 'February 21-23, 2026',
    time: '6:00 PM',
    description: 'Strengthen your marriage through this special weekend retreat for couples.',
    icon: 'mdi-heart',
    color: 'secondary'
  },
  {
    title: 'Easter Celebration',
    date: 'April 12, 2026',
    time: '6:00 AM',
    description: 'Celebrate the resurrection of our Lord Jesus Christ with sunrise service and fellowship.',
    icon: 'mdi-cross',
    color: 'primary'
  },
  {
    title: 'Summer Camp',
    date: 'May 15-20, 2026',
    time: 'All Day',
    description: 'A week-long camp for children and teenagers filled with fun, learning, and spiritual growth.',
    icon: 'mdi-campfire',
    color: 'secondary'
  }
]
</script>

<template>
  <OuterLayout>
    <template #content>
      <v-container class="page-container">
        <v-row justify="center">
          <v-col cols="12" md="10">
            <div class="text-center mb-8">
              <h1 class="text-h2 font-weight-bold mb-4 pbcm-gradient-text">
                Upcoming Events
              </h1>
              <p class="text-h6 mb-6">
                Join us for these special occasions and activities
              </p>
            </div>

        <v-row>
          <v-col cols="12" lg="8">
            <!-- Featured Event -->
            <v-card elevation="6" class="featured-event mb-6">
              <v-img
                src="/assets/master-portrait.jpg"
                height="300"
                cover
                class="featured-image"
              >
                <div class="featured-overlay">
                  <v-chip color="secondary" size="large" class="featured-badge">
                    <v-icon icon="mdi-star" start />
                    Featured Event
                  </v-chip>
                </div>
              </v-img>

              <v-card-title class="text-h4 py-6">
                Annual Bible Conference 2026
              </v-card-title>

              <v-card-text class="pa-6">
                <div class="d-flex flex-wrap mb-4 ga-2">
                  <v-chip color="primary" variant="outlined">
                    <v-icon icon="mdi-calendar" start />
                    March 15-17, 2026
                  </v-chip>
                  <v-chip color="secondary" variant="outlined">
                    <v-icon icon="mdi-clock" start />
                    9:00 AM - 6:00 PM
                  </v-chip>
                  <v-chip color="primary" variant="outlined">
                    <v-icon icon="mdi-map-marker" start />
                    PBCM Main Sanctuary
                  </v-chip>
                </div>

                <p class="text-h6 mb-4">
                  Join us for three days of powerful worship, inspiring messages, and fellowship
                  with believers from across the region. This year's theme: "Walking in Faith."
                </p>

                <v-btn color="primary" size="large" prepend-icon="mdi-ticket">
                  Register Now
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" lg="4">
            <!-- Quick Events List -->
            <v-card elevation="4">
              <v-card-title class="text-h5 text-center py-4">
                <v-icon icon="mdi-calendar-clock" color="secondary" class="me-2" />
                This Week
              </v-card-title>

              <v-list>
                <v-list-item
                  v-for="event in quickEvents"
                  :key="event.title"
                  :prepend-icon="event.icon"
                  :title="event.title"
                  :subtitle="event.subtitle"
                  class="quick-event-item"
                >
                  <template #append>
                    <v-chip :color="event.color" size="small" variant="outlined">
                      {{ event.day }}
                    </v-chip>
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>

        <!-- Events Grid -->
        <v-row class="mt-6">
          <v-col cols="12" md="6" lg="4" v-for="event in upcomingEvents" :key="event.title">
            <v-card elevation="4" class="h-100 event-card">
              <v-card-title class="text-center py-4" :style="{ backgroundColor: `rgb(var(--v-theme-${event.color}))`, color: 'white' }">
                <v-icon :icon="event.icon" size="48" class="d-block mx-auto mb-2" />
                <h4 class="text-h6">{{ event.title }}</h4>
              </v-card-title>

              <v-card-text class="pa-6">
                <div class="mb-4">
                  <v-chip :color="event.color" variant="outlined" size="small" class="mb-2">
                    <v-icon icon="mdi-calendar" start />
                    {{ event.date }}
                  </v-chip>
                  <v-chip :color="event.color" variant="outlined" size="small" class="mb-2 ml-2">
                    <v-icon icon="mdi-clock" start />
                    {{ event.time }}
                  </v-chip>
                </div>

                <p class="mb-4">{{ event.description }}</p>

                <v-btn
                  :color="event.color"
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
  </OuterLayout>
</template>



<style scoped>
.page-container {
  padding: 2rem 0;
  min-height: 70vh;
}

.featured-event {
  transition: all 0.3s ease;
}

.featured-event:hover {
  transform: translateY(-2px);
}

.featured-image {
  position: relative;
}

.featured-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.event-card {
  transition: all 0.3s ease;
}

.event-card:hover {
  transform: translateY(-4px);
}

.quick-event-item {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.quick-event-item:last-child {
  border-bottom: none;
}
</style>
