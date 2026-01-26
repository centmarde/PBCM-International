<script lang="ts" setup>
import OuterLayout from '@/layouts/outerLayout.vue'
type Ministry = {
  name: string
  description: string
  leader: string
  schedule: string
  icon: string
  image: string
  color: 'primary' | 'secondary'
}

const ministries: Ministry[] = [
  {
    name: 'Children\'s Ministry',
    description: 'Nurturing young hearts with Bible stories, songs, and activities that teach them about God\'s love.',
    leader: 'Sister Maria',
    schedule: 'Sundays 9:00 AM',
    icon: 'mdi-baby-face',
    image: '/assets/master-portrait.jpg',
    color: 'primary'
  },
  {
    name: 'Youth Ministry',
    description: 'Empowering teenagers to grow in faith through fellowship, Bible study, and community service.',
    leader: 'Brother John',
    schedule: 'Saturdays 4:00 PM',
    icon: 'mdi-account-group',
    image: '/assets/master-portrait.jpg',
    color: 'secondary'
  },
  {
    name: 'Women\'s Fellowship',
    description: 'Supporting women in their spiritual journey through prayer, study, and mutual encouragement.',
    leader: 'Sister Grace',
    schedule: 'Tuesdays 2:00 PM',
    icon: 'mdi-flower',
    image: '/assets/master-portrait.jpg',
    color: 'primary'
  },
  {
    name: 'Men\'s Fellowship',
    description: 'Building godly men through accountability, prayer, and service to the church and community.',
    leader: 'Brother Paul',
    schedule: 'Thursdays 7:00 PM',
    icon: 'mdi-shield-cross',
    image: '/assets/master-portrait.jpg',
    color: 'secondary'
  },
  {
    name: 'Worship Team',
    description: 'Leading the congregation in praise and worship through music, songs, and instrumental ministry.',
    leader: 'Sister Joy',
    schedule: 'Practice: Fridays 7:00 PM',
    icon: 'mdi-music',
    image: '/assets/master-portrait.jpg',
    color: 'primary'
  },
  {
    name: 'Outreach Ministry',
    description: 'Reaching out to the community with God\'s love through evangelism and service projects.',
    leader: 'Brother Mark',
    schedule: 'Monthly Events',
    icon: 'mdi-heart-multiple',
    image: '/assets/master-portrait.jpg',
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
                Our Ministries
              </h1>
              <p class="text-h6 mb-6">
                Serving God and Community Through Various Ministries
              </p>
            </div>

        <v-row>
          <v-col cols="12" md="6" lg="4" v-for="ministry in ministries" :key="ministry.name">
            <v-card elevation="4" class="h-100 ministry-card">
              <v-img
                :src="ministry.image"
                height="200"
                class="ministry-image"
                cover
              >
                <div class="ministry-overlay">
                  <v-icon :icon="ministry.icon" size="64" color="white" />
                </div>
              </v-img>

              <v-card-title class="text-h5 text-center py-4">
                {{ ministry.name }}
              </v-card-title>

              <v-card-text class="pa-6">
                <p class="mb-4">{{ ministry.description }}</p>

                <div class="ministry-details mb-4">
                  <v-chip color="primary" variant="outlined" size="small" class="me-2 mb-2">
                    <v-icon icon="mdi-account-group" start />
                    {{ ministry.leader }}
                  </v-chip>
                  <v-chip color="secondary" variant="outlined" size="small" class="mb-2">
                    <v-icon icon="mdi-calendar" start />
                    {{ ministry.schedule }}
                  </v-chip>
                </div>

                <v-btn
                  :color="ministry.color"
                  variant="outlined"
                  block
                  prepend-icon="mdi-arrow-right"
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

.ministry-card {
  transition: all 0.3s ease;
}

.ministry-card:hover {
  transform: translateY(-4px);
}

.ministry-image {
  position: relative;
}

.ministry-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
    rgba(var(--v-theme-primary), 0.7) 0%,
    rgba(var(--v-theme-secondary), 0.7) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.ministry-card:hover .ministry-overlay {
  opacity: 1;
}

.ministry-details {
  min-height: 60px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>
