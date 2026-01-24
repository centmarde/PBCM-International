<script setup lang="ts">
import { useDisplay, useTheme } from 'vuetify'
import { pbcmThemes } from '@/theme/theme'

const { xs, smAndDown, mdAndUp } = useDisplay()
const theme = useTheme()

// Access PBCM theme colors
const { pbcmColors } = pbcmThemes

type MissionSection = {
  title: string
  content: string
  icon: string
  color?: string
}

const missionSections: MissionSection[] = [
  {
    title: 'Great Commission',
    content: 'To go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything Jesus has commanded us. (Matthew 28:19-20)',
    icon: 'mdi-earth',
    color: 'primary'
  },
  {
    title: 'Evangelism & Outreach',
    content: 'To proclaim the Gospel of Jesus Christ to the lost, bringing hope and salvation to those who have not yet heard the good news of God\'s love and grace.',
    icon: 'mdi-bullhorn',
    color: 'secondary'
  },
  {
    title: 'Discipleship & Growth',
    content: 'To nurture believers in their faith journey, providing biblical teaching, spiritual guidance, and opportunities for Christian fellowship and growth in Christ.',
    icon: 'mdi-account-group',
    color: 'primary-lighten-1'
  },
  {
    title: 'Community Service',
    content: 'To serve our local and global communities with Christ\'s love, meeting physical, emotional, and spiritual needs through acts of compassion and mercy.',
    icon: 'mdi-hands-pray',
    color: 'secondary-lighten-1'
  }
]
</script>

<template>
  <v-container class="pa-4">
    <!-- Hero Section -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" :md="mdAndUp ? 10 : 12">
        <v-sheet
          :style="`background: linear-gradient(135deg, ${pbcmColors.primary} 0%, ${pbcmColors.secondary} 100%)`"
          class="pa-8 rounded-xl text-center elevation-4"
          color="transparent"
        >
          <h1
            :class="[
              'text-white font-weight-bold mb-4',
              xs ? 'text-h4' : 'text-h2'
            ]"
          >
            Our Mission
          </h1>
          <p
            :class="[
              'text-white mb-0 font-weight-medium',
              xs ? 'text-body-1' : 'text-h6'
            ]"
          >
            Spreading the Gospel of Jesus Christ and building His Kingdom on Earth
          </p>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Mission Statement -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" :md="mdAndUp ? 8 : 12">
        <v-card
          color="surface"
          class="pa-6 rounded-lg elevation-3"
          :class="{ 'mx-2': smAndDown }"
        >
          <v-card-text class="text-center">
            <v-icon
              :size="xs ? 48 : 64"
              color="primary"
              class="mb-4"
            >
              mdi-cross
            </v-icon>
            <h2 :class="['text-primary mb-4 font-weight-bold', xs ? 'text-h5' : 'text-h4']">
              Philippine Christian Benevolent Missionary
            </h2>
            <p :class="[xs ? 'text-body-1' : 'text-h6', 'mb-4 font-weight-medium']">
              "Therefore go and make disciples of all nations, baptizing them in the name
              of the Father and of the Son and of the Holy Spirit, and teaching them to
              obey everything I have commanded you."
            </p>
            <v-chip
              color="secondary"
              variant="flat"
              class="font-weight-medium"
              size="small"
            >
              Matthew 28:19-20 (NIV)
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Mission Pillars -->
    <v-row justify="center">
      <v-col cols="12" :md="mdAndUp ? 10 : 12">
        <h2 :class="['text-center mb-6 text-primary font-weight-bold', xs ? 'text-h5' : 'text-h4']">
          Our Mission Pillars
        </h2>
        <v-row>
          <v-col
            v-for="(section, index) in missionSections"
            :key="index"
            cols="12"
            :sm="smAndDown ? 12 : 6"
            :md="mdAndUp ? 6 : 12"
          >
            <v-card
              color="surface"
              class="h-100 rounded-lg transition-all"
              :class="{ 'mx-2 mb-4': smAndDown }"
              elevation="2"
              hover
            >
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-4">
                  <v-avatar
                    :size="xs ? 48 : 56"
                    :color="section.color || 'secondary'"
                    class="mr-4"
                  >
                    <v-icon
                      :size="xs ? 24 : 32"
                      color="white"
                    >
                      {{ section.icon }}
                    </v-icon>
                  </v-avatar>
                  <h3 :class="['text-primary font-weight-bold', xs ? 'text-h6' : 'text-h5']">
                    {{ section.title }}
                  </h3>
                </div>
                <p :class="[xs ? 'text-body-2' : 'text-body-1', 'mb-0 text-medium-emphasis']">
                  {{ section.content }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Call to Action -->
    <v-row justify="center" class="mt-8 mb-4">
      <v-col cols="12" :md="mdAndUp ? 8 : 12">
        <v-card
          :style="`background: linear-gradient(45deg, ${theme.current.value.colors['surface-variant']} 0%, ${theme.current.value.colors.surface} 100%)`"
          class="text-center pa-8 rounded-xl elevation-4"
          :class="{ 'mx-2': smAndDown }"
        >
          <v-card-text>
            <v-icon
              :size="xs ? 48 : 64"
              color="primary"
              class="mb-4"
            >
              mdi-heart-multiple
            </v-icon>
            <h3 :class="['text-primary mb-4 font-weight-bold', xs ? 'text-h6' : 'text-h5']">
              Join Us in Our Mission
            </h3>
            <p :class="[xs ? 'text-body-2' : 'text-body-1', 'mb-6 text-medium-emphasis']">
              Whether you're seeking to know Christ, grow in your faith, or serve others,
              there's a place for you in our mission. Come and be part of God's work
              in the Philippines and around the world.
            </p>
            <div class="d-flex flex-column flex-sm-row justify-center ga-4">
              <v-btn
                color="primary"
                :size="xs ? 'default' : 'large'"
                :block="smAndDown"
                to="/contact"
                elevation="2"
                class="font-weight-bold"
              >
                <v-icon start>mdi-phone</v-icon>
                Contact Us
              </v-btn>
              <v-btn
                color="secondary"
                variant="outlined"
                :size="xs ? 'default' : 'large'"
                :block="smAndDown"
                to="/services"
                class="font-weight-bold"
              >
                <v-icon start>mdi-calendar</v-icon>
                Join Our Services
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
