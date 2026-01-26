<script lang="ts" setup>
import { ref } from 'vue'
import OuterLayout from '@/layouts/outerLayout.vue'

interface Belief {
  id: number
  title: string
  icon: string
  quote: string
  description: string
  color: string
}

interface Core {
  id: number
  number: string
  title: string
  icon: string
  points: string[]
  color: string
}

// Tab selection
const activeTab = ref(0)

// Belief quotes
const beliefs: Belief[] = [
  {
    id: 1,
    title: 'God\'s Word',
    icon: 'mdi-book-open-variant',
    quote: 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.',
    description: '2 Timothy 3:16',
    color: 'primary'
  },
  {
    id: 2,
    title: 'God\'s Love',
    icon: 'mdi-heart-multiple',
    quote: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    description: 'John 3:16',
    color: 'secondary'
  },
  {
    id: 3,
    title: 'God\'s Grace',
    icon: 'mdi-gift-open',
    quote: 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.',
    description: 'Ephesians 2:8',
    color: 'success'
  },
  {
    id: 4,
    title: 'God\'s Power',
    icon: 'mdi-lightning-bolt',
    quote: 'I can do all this through him who gives me strength.',
    description: 'Philippians 4:13',
    color: 'info'
  }
]

// Core teachings
const coreTeachings: Core[] = [
  {
    id: 1,
    number: '01',
    title: 'The Holy Trinity',
    icon: 'mdi-hexagram',
    points: [
      'God exists as Father, Son, and Holy Spirit',
      'Three in one, co-eternal and co-equal',
      'One substance, three persons'
    ],
    color: 'primary'
  },
  {
    id: 2,
    number: '02',
    title: 'Salvation Through Christ',
    icon: 'mdi-cross',
    points: [
      'Jesus Christ is God\'s Son and our Savior',
      'He died for our sins and rose from the dead',
      'Salvation is received through faith alone'
    ],
    color: 'secondary'
  },
  {
    id: 3,
    number: '03',
    title: 'The Church\'s Mission',
    icon: 'mdi-church',
    points: [
      'The church is the body of Christ',
      'Called to make disciples of all nations',
      'Empowered by the Holy Spirit for ministry'
    ],
    color: 'success'
  },
  {
    id: 4,
    number: '04',
    title: 'Eternal Hope',
    icon: 'mdi-infinity',
    points: [
      'Christ will return to judge all people',
      'Believers will spend eternity with God',
      'Heaven is our ultimate hope and home'
    ],
    color: 'info'
  }
]

</script>

<template>
  <OuterLayout>
    <template #content>
      <v-container fluid class="py-12">
        <!-- Hero Header -->
        <v-row align="center" justify="center" class="mb-16">
          <v-col cols="12" md="9" class="text-center">
            <h1 class="display-1 font-weight-bold mb-6">Our Faith &amp; Beliefs</h1>
            <p class="text-h6 text-medium-emphasis">
              At PBCM International, our faith is anchored in biblical truth. These core beliefs define who we are
              and guide our mission to serve Christ and reach the world.
            </p>
          </v-col>
        </v-row>

        <!-- Scripture Quotes Section -->
        <section class="mb-16">
          <v-row justify="center" class="mb-8">
            <v-col cols="12" md="10">
              <h2 class="text-h4 font-weight-bold">Scripture That Guides Us</h2>
            </v-col>
          </v-row>

          <v-row justify="center" :gutter="6">
            <v-col v-for="belief in beliefs" :key="belief.id" cols="12" sm="6" md="3">
              <v-card
                class="quote-card pa-6 h-100"
                :style="{ borderTop: `4px solid var(--v-${belief.color})` }"
                elevation="1"
              >
                <div class="text-center mb-4">
                  <v-icon :color="belief.color" size="48">{{ belief.icon }}</v-icon>
                </div>
                <h3 class="text-h6 font-weight-bold text-center mb-4">{{ belief.title }}</h3>
                <blockquote class="text-center text-body2 mb-4 quote-text" style="font-style: italic; line-height: 1.6;">
                  "{{ belief.quote }}"
                </blockquote>
                <p class="text-center text-caption font-weight-bold" :class="`text-${belief.color}`">
                  {{ belief.description }}
                </p>
              </v-card>
            </v-col>
          </v-row>
        </section>

        <!-- Core Teachings Section -->
        <section class="mb-16">
          <v-row justify="center" class="mb-8">
            <v-col cols="12" md="10">
              <h2 class="text-h4 font-weight-bold">Core Teachings</h2>
              <p class="text-body2 text-medium-emphasis">
                The pillars of our faith and the foundation of PBCM International
              </p>
            </v-col>
          </v-row>

          <v-row justify="center" :gutter="6">
            <v-col v-for="teaching in coreTeachings" :key="teaching.id" cols="12" md="6" lg="3">
              <v-card class="teaching-card h-100" elevation="2">
                <!-- Number Badge -->
                <div class="number-badge" :class="`bg-${teaching.color}`">
                  {{ teaching.number }}
                </div>

                <!-- Card Content -->
                <v-card-item class="pt-8 pb-0">
                  <div class="mb-4">
                    <v-icon :color="teaching.color" size="44">{{ teaching.icon }}</v-icon>
                  </div>
                  <v-card-title class="text-h6 pa-0 mb-4 font-weight-bold">
                    {{ teaching.title }}
                  </v-card-title>
                </v-card-item>

                <!-- Points List -->
                <v-card-text>
                  <ul class="teaching-points">
                    <li v-for="(point, idx) in teaching.points" :key="idx" class="mb-3">
                      <span class="text-body2">{{ point }}</span>
                    </li>
                  </ul>
                </v-card-text>

                <!-- CTA Button -->
                <v-card-actions>
                  <v-btn
                    color="primary"
                    variant="text"
                    size="small"
                    append-icon="mdi-arrow-right"
                  >
                    Learn More
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </section>

        <!-- What We Believe Banner -->
        <v-row justify="center" class="mb-16">
          <v-col cols="12" md="10">
            <v-card
              class="pa-8 text-white"
              style="background: linear-gradient(135deg, #1565C0 0%, #2196F3 100%);"
            >
              <v-row align="center">
                <v-col cols="12" md="8">
                  <h3 class="text-h5 font-weight-bold mb-2">In One Sentence...</h3>
                  <p class="text-body1 opacity-90">
                    We believe that through faith in Jesus Christ alone, all who repent and believe receive
                    forgiveness of sins and the gift of eternal life in God's kingdom.
                  </p>
                </v-col>
                <v-col cols="12" md="4" class="text-md-right">
                  <v-icon size="80" class="opacity-50">mdi-heart-multiple</v-icon>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <!-- CTA Section -->
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h3 class="text-h5 font-weight-bold mb-4">Want to Know More?</h3>
            <p class="text-body2 text-medium-emphasis mb-6">
              Our pastoral team is available to discuss faith, theology, and how these beliefs apply to your life.
            </p>
            <div class="d-flex gap-3 justify-center flex-wrap">
              <v-btn color="primary" variant="flat" size="large" to="/contact" append-icon="mdi-arrow-right">
                Contact Us
              </v-btn>
              <v-btn color="primary" variant="outlined" size="large" append-icon="mdi-download">
                Full Statement of Faith
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </OuterLayout>
</template>

<style scoped>
.quote-card {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.quote-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1) !important;
}

.quote-text {
  color: var(--v-on-surface);
  line-height: 1.8;
}

.teaching-card {
  position: relative;
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
}

.teaching-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12) !important;
}

.number-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  opacity: 0.15;
  font-family: 'Arial Black', sans-serif;
}

.teaching-points {
  list-style: none;
  padding: 0;
  margin: 0;
}

.teaching-points li {
  padding-left: 0;
  position: relative;
}

.teaching-points li::before {
  content: '•';
  margin-right: 8px;
  font-weight: bold;
  font-size: 20px;
}

.foundation-box {
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.foundation-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}
</style>
