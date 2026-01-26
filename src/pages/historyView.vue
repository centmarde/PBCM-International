<script lang="ts" setup>
import { ref } from 'vue'
import OuterLayout from '@/layouts/outerLayout.vue'

interface TimelineEvent {
  id: number
  year: string
  title: string
  description: string
  icon: string
  details: string[]
}

interface Milestone {
  id: number
  number: string
  title: string
  icon: string
  description: string
  color: string
}

// Timeline events
const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: '1995',
    title: 'Foundation Year',
    description: 'PBCM International was founded with a vision to serve Christ and reach communities.',
    icon: 'mdi-seed',
    details: [
      'Started with a small group of passionate believers',
      'Established core mission: To glorify God and make disciples',
      'First service held in a rented community space'
    ]
  },
  {
    id: 2,
    year: '2000',
    title: 'Building Our Home',
    description: 'We acquired our first permanent church building, marking a major milestone in our growth.',
    icon: 'mdi-home-city',
    details: [
      'Purchased our first permanent facility',
      'Expanded ministries to include children and youth programs',
      'Growing congregation reaching 500+ members'
    ]
  },
  {
    id: 3,
    year: '2008',
    title: 'Outreach Expansion',
    description: 'PBCM began expanding community outreach and missionary programs globally.',
    icon: 'mdi-earth',
    details: [
      'Launched community outreach initiatives',
      'Established international missionary partnerships',
      'Opened scholarship programs for underprivileged students'
    ]
  },
  {
    id: 4,
    year: '2015',
    title: 'Leadership Development',
    description: 'Established formal leadership training programs and mentorship initiatives.',
    icon: 'mdi-account-tie',
    details: [
      'Created pastoral training academy',
      'Developed mentorship programs',
      'Established governance structure for sustainability'
    ]
  },
  {
    id: 5,
    year: '2020',
    title: 'Digital Transformation',
    description: 'Adapted to modern times by launching digital ministry and online community.',
    icon: 'mdi-laptop',
    details: [
      'Launched live streaming services',
      'Created digital discipleship platforms',
      'Expanded reach through social media ministry'
    ]
  },
  {
    id: 6,
    year: '2025',
    title: 'Vision Forward',
    description: 'Continuing our mission with renewed commitment to serve and transform lives.',
    icon: 'mdi-telescope',
    details: [
      'Expanding to multiple campuses',
      'Increasing international mission work',
      'Growing digital and in-person community'
    ]
  }
]

// Key milestones
const milestones: Milestone[] = [
  {
    id: 1,
    number: '500+',
    title: 'Active Members',
    icon: 'mdi-account-multiple',
    description: 'A growing community of believers committed to Christ',
    color: 'primary'
  },
  {
    id: 2,
    number: '30+',
    title: 'Years of Service',
    icon: 'mdi-calendar-heart',
    description: 'Three decades of faithful ministry to our communities',
    color: 'secondary'
  },
  {
    id: 3,
    number: '15+',
    title: 'Programs',
    icon: 'mdi-briefcase-multiple',
    description: 'Diverse ministries serving all ages and needs',
    color: 'success'
  },
  {
    id: 4,
    number: '8',
    title: 'Countries',
    icon: 'mdi-globe-model',
    description: 'International mission partnerships and outreach',
    color: 'info'
  }
]

// Selected event for details
const selectedEvent = ref<number | null>(null)

const selectEvent = (id: number) => {
  selectedEvent.value = selectedEvent.value === id ? null : id
}
</script>

<template>
  <OuterLayout>
    <template #content>
      <v-container fluid class="py-12">
        <!-- Hero Section -->
        <v-row align="center" justify="center" class="mb-16">
          <v-col cols="12" md="9" class="text-center">
            <h1 class="display-1 font-weight-bold mb-4">Our History</h1>
            <p class="text-h6 text-medium-emphasis">
              For over 30 years, PBCM International has been a beacon of faith, hope, and community service.
              From our humble beginnings to today, God's faithfulness has guided every step of our journey.
            </p>
          </v-col>
        </v-row>

        <!-- Key Milestones -->
        <section class="mb-16">
          <v-row justify="center" class="mb-8">
            <v-col cols="12" md="10">
              <h2 class="text-h4 font-weight-bold">Our Impact by Numbers</h2>
            </v-col>
          </v-row>

          <v-row justify="center" :gutter="6">
            <v-col v-for="milestone in milestones" :key="milestone.id" cols="12" sm="6" md="3">
              <v-card class="milestone-card pa-6 h-100 text-center" elevation="2">
                <div class="mb-4">
                  <v-icon :color="milestone.color" size="56">{{ milestone.icon }}</v-icon>
                </div>
                <h3 class="text-h4 font-weight-bold mb-2" :class="`text-${milestone.color}`">
                  {{ milestone.number }}
                </h3>
                <h4 class="text-h6 font-weight-bold mb-3">{{ milestone.title }}</h4>
                <p class="text-body2 text-medium-emphasis">{{ milestone.description }}</p>
              </v-card>
            </v-col>
          </v-row>
        </section>

        <!-- Timeline Section -->
        <section class="mb-16">
          <v-row justify="center" class="mb-8">
            <v-col cols="12" md="10">
              <h2 class="text-h4 font-weight-bold mb-2">Journey Through the Years</h2>
              <p class="text-body2 text-medium-emphasis">
                Key moments that shaped PBCM International into what we are today
              </p>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12" md="10">
              <!-- Timeline -->
              <div class="timeline">
                <div v-for="(event, idx) in timelineEvents" :key="event.id" class="timeline-item">
                  <!-- Timeline Marker -->
                  <div class="timeline-marker">
                    <v-icon color="primary" size="32">{{ event.icon }}</v-icon>
                  </div>

                  <!-- Timeline Content -->
                  <v-card
                    class="timeline-card"
                    :class="{ active: selectedEvent === event.id }"
                    elevation="1"
                  >
                    <v-card-item class="pb-0">
                      <div class="d-flex align-center justify-space-between mb-2">
                        <v-chip color="primary" text-color="white" size="small" label>
                          {{ event.year }}
                        </v-chip>
                        <v-btn
                          icon
                          variant="text"
                          size="small"
                          color="primary"
                          @click="selectEvent(event.id)"
                        >
                          <v-icon>{{ selectedEvent === event.id ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                      </div>
                    </v-card-item>

                    <v-card-title class="text-h6 font-weight-bold">
                      {{ event.title }}
                    </v-card-title>

                    <v-card-text>
                      <p class="text-body2 mb-4">{{ event.description }}</p>
                    </v-card-text>

                    <!-- Expandable Details -->
                    <v-expand-transition>
                      <div v-if="selectedEvent === event.id" class="px-4 pb-4">
                        <v-divider class="mb-4" />
                        <ul class="timeline-details">
                          <li v-for="(detail, idx) in event.details" :key="idx" class="mb-2">
                            <span class="text-body2">{{ detail }}</span>
                          </li>
                        </ul>
                      </div>
                    </v-expand-transition>
                  </v-card>
                </div>
              </div>
            </v-col>
          </v-row>
        </section>

        <!-- Our Vision Section -->
        <v-row justify="center" class="mb-16">
          <v-col cols="12" md="10">
            <v-row :gutter="6">
              <v-col cols="12" md="6">
                <v-card class="pa-8 h-100" style="background: linear-gradient(135deg, #1565C0 0%, #2196F3 100%); color: white;">
                  <v-icon size="48" class="mb-4">mdi-telescope</v-icon>
                  <h3 class="text-h5 font-weight-bold mb-3">Our Vision</h3>
                  <p class="text-body2">
                    To be a beacon of Christ's light, reaching and transforming communities locally and globally
                    through faithful proclamation of God's Word and sacrificial service.
                  </p>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="pa-8 h-100" style="background: linear-gradient(135deg, #2196F3 0%, #1565C0 100%); color: white;">
                  <v-icon size="48" class="mb-4">mdi-target</v-icon>
                  <h3 class="text-h5 font-weight-bold mb-3">Our Mission</h3>
                  <p class="text-body2">
                    To glorify God by making disciples of Jesus Christ, equipping them to reach their world
                    with the gospel and serve with compassion and excellence.
                  </p>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- CTA Section -->
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <v-card class="pa-8">
              <h3 class="text-h5 font-weight-bold mb-3">Be Part of Our Story</h3>
              <p class="text-body2 text-medium-emphasis mb-6">
                Join our community and help us continue God's work in the world. Every person has a role to play
                in our ongoing mission.
              </p>
              <div class="d-flex gap-3 justify-center flex-wrap">
                <v-btn color="primary" variant="flat" size="large" to="/contact" append-icon="mdi-arrow-right">
                  Get Involved
                </v-btn>
                <v-btn color="primary" variant="outlined" size="large" append-icon="mdi-download">
                  Our Story PDF
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </OuterLayout>
</template>

<style scoped>
.milestone-card {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.milestone-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12) !important;
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--v-primary);
  opacity: 0.3;
}

.timeline-item {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  position: relative;
}

.timeline-marker {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
  border: 3px solid var(--v-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.timeline-card {
  flex: 1;
  transition: all 0.3s ease;
}

.timeline-card:hover {
  box-shadow: 0 8px 16px rgba(21, 101, 192, 0.15) !important;
}

.timeline-card.active {
  box-shadow: 0 12px 24px rgba(21, 101, 192, 0.2) !important;
}

.timeline-details {
  list-style: none;
  padding: 0;
  margin: 0;
}

.timeline-details li {
  padding-left: 20px;
  position: relative;
}

.timeline-details li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--v-primary);
  font-weight: bold;
}

.value-box {
  background: var(--v-surface-variant);
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.value-box:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
</style>