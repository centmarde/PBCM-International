<template>
  <v-container class="page-container">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <div class="text-center mb-8">
          <h1 class="text-h2 font-weight-bold mb-4 pbcm-gradient-text">
            Contact Us
          </h1>
          <p class="text-h6 mb-6">
            We'd love to hear from you
          </p>
        </div>

        <v-row>
          <!-- Contact Information -->
          <v-col cols="12" md="6">
            <v-card elevation="4" class="h-100">
              <v-card-title class="text-h5 text-center py-6">
                <v-icon icon="mdi-map-marker" color="primary" class="me-2" />
                Get In Touch
              </v-card-title>
              <v-card-text class="pa-6">
                <div v-for="contact in contactInfo" :key="contact.type" class="contact-item mb-4">
                  <div class="d-flex align-center mb-2">
                    <v-icon :icon="contact.icon" :color="contact.color" class="me-3" />
                    <h4 class="text-h6">{{ contact.type }}</h4>
                  </div>
                  <p class="ml-9 mb-0">{{ contact.value }}</p>
                  <p v-if="contact.subtitle" class="ml-9 text-caption opacity-75">
                    {{ contact.subtitle }}
                  </p>
                </div>

                <v-divider class="my-4" />

                <div class="text-center">
                  <h4 class="text-h6 mb-3">Follow Us</h4>
                  <div class="d-flex justify-center ga-2">
                    <v-btn
                      v-for="social in socialMedia"
                      :key="social.platform"
                      :icon="social.icon"
                      :color="social.color"
                      variant="outlined"
                      size="large"
                      :href="social.url"
                      target="_blank"
                    />
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Contact Form -->
          <v-col cols="12" md="6">
            <v-card elevation="4" class="h-100">
              <v-card-title class="text-h5 text-center py-6">
                <v-icon icon="mdi-email-send" color="secondary" class="me-2" />
                Send us a Message
              </v-card-title>
              <v-card-text class="pa-6">
                <v-form ref="contactForm">
                  <v-text-field
                    v-model="form.name"
                    label="Full Name"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    color="primary"
                    class="mb-4"
                    :rules="[rules.required]"
                  />

                  <v-text-field
                    v-model="form.email"
                    label="Email Address"
                    prepend-inner-icon="mdi-email"
                    variant="outlined"
                    color="primary"
                    class="mb-4"
                    :rules="[rules.required, rules.email]"
                  />

                  <v-select
                    v-model="form.subject"
                    :items="subjectOptions"
                    label="Subject"
                    prepend-inner-icon="mdi-tag"
                    variant="outlined"
                    color="primary"
                    class="mb-4"
                    :rules="[rules.required]"
                  />

                  <v-textarea
                    v-model="form.message"
                    label="Message"
                    prepend-inner-icon="mdi-message-text"
                    variant="outlined"
                    color="primary"
                    rows="4"
                    class="mb-4"
                    :rules="[rules.required]"
                  />

                  <v-btn
                    color="primary"
                    size="large"
                    block
                    prepend-icon="mdi-send"
                    @click="submitForm"
                    :loading="isSubmitting"
                  >
                    Send Message
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
type ContactInfo = {
  type: string
  value: string
  subtitle?: string
  icon: string
  color: 'primary' | 'secondary'
}

type SocialMedia = {
  platform: string
  icon: string
  color: 'primary' | 'secondary'
  url: string
}

const contactInfo: ContactInfo[] = [
  {
    type: 'Address',
    value: '123 Faith Street, Manila, Philippines',
    subtitle: 'Visit us anytime',
    icon: 'mdi-map-marker',
    color: 'primary'
  },
  {
    type: 'Phone',
    value: '+63 (2) 123-4567',
    subtitle: 'Call us during office hours',
    icon: 'mdi-phone',
    color: 'secondary'
  },
  {
    type: 'Email',
    value: 'info@pbcm.org',
    subtitle: 'We reply within 24 hours',
    icon: 'mdi-email',
    color: 'primary'
  },
  {
    type: 'Service Times',
    value: 'Sundays at 10:00 AM',
    subtitle: 'All are welcome',
    icon: 'mdi-clock',
    color: 'secondary'
  }
]

const socialMedia: SocialMedia[] = [
  {
    platform: 'Facebook',
    icon: 'mdi-facebook',
    color: 'primary',
    url: '#'
  },
  {
    platform: 'YouTube',
    icon: 'mdi-youtube',
    color: 'secondary',
    url: '#'
  },
  {
    platform: 'Email',
    icon: 'mdi-email',
    color: 'primary',
    url: 'mailto:info@pbcm.org'
  }
]

// Form data
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const subjectOptions = [
  'General Inquiry',
  'Prayer Request',
  'Ministry Information',
  'Event Information',
  'Visit Information',
  'Other'
]

const isSubmitting = ref(false)

// Form validation rules
const rules = {
  required: (value: string) => !!value || 'This field is required',
  email: (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'Enter a valid email address'
  }
}

const submitForm = async () => {
  isSubmitting.value = true

  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Reset form
  Object.assign(form, {
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  isSubmitting.value = false

  // Show success message (you can implement a proper notification system)
  alert('Thank you for your message! We will get back to you soon.')
}
</script>

<style scoped>
.page-container {
  padding: 2rem 0;
  min-height: 70vh;
}

.contact-item {
  border-left: 3px solid rgb(var(--v-theme-primary));
  padding-left: 1rem;
  margin-left: 1rem;
}
</style>
