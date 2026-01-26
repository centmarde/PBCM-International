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

  </v-container>
</template>
