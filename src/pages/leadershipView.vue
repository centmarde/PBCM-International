<script lang="ts" setup>
import OuterLayout from '@/layouts/outerLayout.vue';

interface LeadershipMember {
  id: number;
  name: string;
  position: string;
  role: string;
  bio: string;
  email: string;
  icon: string;
}

const leadershipTeam: LeadershipMember[] = [
  {
    id: 1,
    name: 'Pastor John Dela Cruz',
    position: 'Senior Pastor',
    role: 'Spiritual Leader',
    bio: 'With over 20 years of ministry experience, Pastor John leads our congregation with wisdom and compassion.',
    email: 'pastor.john@pbcm.org',
    icon: 'mdi-cross'
  },
  {
    id: 2,
    name: 'Rev. Maria Santos',
    position: 'Associate Pastor',
    role: 'Community Outreach',
    bio: 'Dedicated to community service and pastoral care, Rev. Maria coordinates our outreach programs.',
    email: 'rev.maria@pbcm.org',
    icon: 'mdi-heart-multiple'
  },
  {
    id: 3,
    name: 'Brother David Reyes',
    position: 'Worship Director',
    role: 'Music & Worship',
    bio: 'Leading worship services with passionate music and spiritual depth to enhance our worship experience.',
    email: 'david@pbcm.org',
    icon: 'mdi-music-box-multiple'
  },
  {
    id: 4,
    name: 'Sister Grace Aquino',
    position: 'Children\'s Ministry Director',
    role: 'Youth & Children',
    bio: 'Nurturing the next generation of believers through engaging and biblically-sound children\'s programs.',
    email: 'grace@pbcm.org',
    icon: 'mdi-account-multiple-check'
  },
  {
    id: 5,
    name: 'Mr. Robert Torres',
    position: 'Facilities Manager',
    role: 'Administration',
    bio: 'Ensuring our facilities are welcoming and well-maintained for all church activities and events.',
    email: 'robert@pbcm.org',
    icon: 'mdi-home-city'
  },
  {
    id: 6,
    name: 'Sister Angela Mercado',
    position: 'Counselor',
    role: 'Pastoral Care',
    bio: 'Providing compassionate pastoral counseling and spiritual guidance to our church members.',
    email: 'angela@pbcm.org',
    icon: 'mdi-hands-pray'
  }
];
</script>

<template>
  <OuterLayout>
    <template #content>
      <v-container fluid class="py-12">
        <!-- Header Section -->
        <section class="mb-12">
          <v-row align="center" justify="center">
            <v-col cols="12" md="8" class="text-center">
              <h1 class="display-1 font-weight-bold mb-4">Our Leadership Team</h1>
              <p class="text-h6 text-medium-emphasis">
                Meet the dedicated individuals who guide our church and serve our community with faith and commitment.
              </p>
            </v-col>
          </v-row>
        </section>

        <!-- Leadership Team Cards -->
        <v-row :gutter="6" class="mb-12">
          <v-col v-for="member in leadershipTeam" :key="member.id" cols="12" sm="6" md="4" lg="4">
            <v-card class="h-100 leadership-card" elevation="2">
              <!-- Card Header with Icon -->
              <div class="card-header pa-6 text-center" style="background: linear-gradient(135deg, #1565C0 0%, #2196F3 100%); color: white;">
                <v-icon :icon="member.icon" size="64" class="mb-2"></v-icon>
                <h3 class="text-h5 font-weight-bold mt-4 mb-2">{{ member.name }}</h3>
              </div>

              <!-- Card Content -->
              <v-card-item class="pb-0">
                <div class="position-badge mb-3">
                  <v-chip color="primary" text-color="white" size="small" label>
                    {{ member.position }}
                  </v-chip>
                </div>
              </v-card-item>

              <v-card-text>
                <p class="text-caption font-weight-bold text-medium-emphasis mb-3">{{ member.role }}</p>
                <p class="text-body2 mb-4">{{ member.bio }}</p>
              </v-card-text>

              <!-- Card Actions -->
              <v-card-actions class="pt-0">
                <v-btn
                  :href="`mailto:${member.email}`"
                  color="primary"
                  variant="text"
                  size="small"
                  prepend-icon="mdi-email"
                >
                  Contact
                </v-btn>
                <v-spacer />
                <v-btn icon="mdi-phone" color="primary" variant="text" size="small" />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Call to Action Section -->
        <v-row justify="center" class="mt-12">
          <v-col cols="12" md="8">
            <v-card class="pa-8" style="background: linear-gradient(135deg, #1565C0 0%, #2196F3 100%); color: white;">
              <v-row align="center">
                <v-col cols="12" md="8">
                  <h3 class="text-h5 font-weight-bold mb-2">Want to Connect with Our Leaders?</h3>
                  <p class="text-body2 opacity-90">
                    We're always available to discuss ministry opportunities, personal matters, or any questions about our church community.
                  </p>
                </v-col>
                <v-col cols="12" md="4" class="text-md-right">
                  <v-btn color="white" variant="flat" to="/contact">
                    Get in Touch
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </OuterLayout>
</template>

<style scoped>
.leadership-card {
  transition: all 0.3s ease;
  overflow: hidden;
}

.leadership-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15) !important;
}

.card-header {
  border-radius: 8px 8px 0 0;
}

.position-badge {
  display: inline-block;
}
</style>