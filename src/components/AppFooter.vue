<script lang="ts" setup>
import { useDisplay } from 'vuetify'

type FooterLink = {
  title: string
  href: string
  icon?: string
}

type FooterSection = {
  title: string
  links: FooterLink[]
}

const { xs, smAndDown, mdAndUp } = useDisplay()

const footerSections: FooterSection[] = [
  {
    title: 'About PBCM',
    links: [
      { title: 'Our Mission', href: '/mission' },
      { title: 'Our Beliefs', href: '/beliefs' },
      { title: 'Leadership', href: '/leadership' },
      { title: 'History', href: '/history' },
    ]
  },
  {
    title: 'Ministries',
    links: [
      { title: 'Sunday Service', href: '/services' },
      { title: 'Bible Study', href: '/bible-study' },
      { title: 'Youth Ministry', href: '/youth' },
      { title: 'Outreach', href: '/outreach' },
    ]
  },
  {
    title: 'Connect',
    links: [
      { title: 'Contact Us', href: '/contact' },
      { title: 'Visit Us', href: '/visit' },
      { title: 'Events', href: '/events' },
      { title: 'Prayer Requests', href: '/prayer' },
    ]
  }
]

const socialLinks = [
  { icon: 'mdi-facebook', href: '#', color: 'primary' },
  { icon: 'mdi-youtube', href: '#', color: 'secondary' },
  { icon: 'mdi-email', href: 'mailto:info@pbcm.org', color: 'secondary' },
  { icon: 'mdi-phone', href: 'tel:+1234567890', color: 'primary' },
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <v-footer
    class="footer-section"
    :color="$vuetify.theme.current.dark ? 'surface' : 'primary'"
  >
    <v-container>
      <v-row :justify="smAndDown ? 'center' : 'start'">
        <!-- Logo and Mission -->
        <v-col
          cols="12"
          :md="mdAndUp ? 4 : 12"
          class="mb-6"
          :class="{ 'text-center': smAndDown }"
        >
          <div class="footer-brand" :class="{ 'mx-auto': smAndDown }">
            <h3 class="footer-title mb-4">
              Philippine Christian Bible Missionary
            </h3>
            <p class="footer-mission mb-4">
              Spreading the Gospel and serving our community with love,
              faith, and compassion. Join us in worship and fellowship.
            </p>

            <!-- Social Links -->
            <div class="social-links" :class="{ 'justify-center': smAndDown }">
              <v-btn
                v-for="social in socialLinks"
                :key="social.icon"
                :icon="social.icon"
                :color="social.color"
                variant="text"
                size="small"
                class="me-2"
                :href="social.href"
                target="_blank"
              />
            </div>
          </div>
        </v-col>

        <!-- Footer Links -->
        <v-col
          v-for="section in footerSections"
          :key="section.title"
          cols="12"
          :sm="xs ? 12 : 4"
          :md="mdAndUp ? 2 : 4"
          class="mb-6"
          :class="{ 'text-center': smAndDown }"
        >
          <div class="footer-section-content">
            <h4 class="footer-section-title mb-3">
              {{ section.title }}
            </h4>
            <ul class="footer-links" :class="{ 'text-center': smAndDown }">
              <li v-for="link in section.links" :key="link.title" class="mb-2">
                <v-btn
                  :to="link.href"
                  variant="text"
                  size="small"
                  class="footer-link pa-0"
                  :color="$vuetify.theme.current.dark ? 'secondary' : 'white'"
                >
                  {{ link.title }}
                </v-btn>
              </li>
            </ul>
          </div>
        </v-col>

        <!-- Contact Info -->
        <v-col
          cols="12"
          :md="mdAndUp ? 2 : 12"
          class="mb-6"
          :class="{ 'text-center': smAndDown }"
        >
          <div class="footer-section-content">
            <h4 class="footer-section-title mb-3">Contact Info</h4>
            <div class="contact-info">
              <div
                class="contact-item mb-2"
                :class="{ 'justify-center': smAndDown }"
              >
                <v-icon
                  icon="mdi-map-marker"
                  size="small"
                  :color="$vuetify.theme.current.dark ? 'secondary' : 'white'"
                  class="me-2"
                />
                <span class="contact-text">123 Faith Street<br>Manila, Philippines</span>
              </div>
              <div
                class="contact-item mb-2"
                :class="{ 'justify-center': smAndDown }"
              >
                <v-icon
                  icon="mdi-clock"
                  size="small"
                  :color="$vuetify.theme.current.dark ? 'secondary' : 'white'"
                  class="me-2"
                />
                <span class="contact-text">Sunday 10:00 AM</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Copyright -->
      <v-divider class="my-4" />
      <v-row>
        <v-col cols="12" class="text-center">
          <p class="footer-copyright">
            © {{ currentYear }} Philippine Christian Bible Missionary. All rights reserved.
            <span class="mx-2">|</span>
            Built with ❤️ for God's glory
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.footer-section {
  padding: 3rem 0 1rem;
  margin-top: 2rem;
}

.footer-brand {
  max-width: 320px;
}

.footer-title {
  color: rgb(var(--v-theme-on-primary));
  font-weight: 600;
  line-height: 1.3;
}

.footer-mission {
  color: rgba(var(--v-theme-on-primary), 0.9);
  line-height: 1.6;
  font-size: 0.95rem;
}

.footer-section-title {
  color: rgb(var(--v-theme-secondary));
  font-weight: 600;
  font-size: 1.1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-link {
  justify-content: flex-start !important;
  text-transform: none !important;
  font-weight: 400;
  opacity: 0.9;
}

.footer-link:hover {
  opacity: 1;
  text-decoration: underline;
}

.social-links {
  display: flex;
  gap: 0.5rem;
}

.social-links.justify-center {
  justify-content: center;
}

.contact-info {
  color: rgba(var(--v-theme-on-primary), 0.9);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  font-size: 0.9rem;
}

.contact-item.justify-center {
  justify-content: center;
}

.contact-text {
  line-height: 1.4;
}

.footer-copyright {
  color: rgba(var(--v-theme-on-primary), 0.8);
  font-size: 0.85rem;
  margin: 0;
}

/* Dark theme adjustments */
:root .v-theme--pbcmDark .footer-section {
  border-top: 1px solid rgba(var(--v-theme-primary), 0.2);
}

:root .v-theme--pbcmDark .footer-title {
  color: rgb(var(--v-theme-on-surface));
}

:root .v-theme--pbcmDark .footer-mission,
:root .v-theme--pbcmDark .contact-info,
:root .v-theme--pbcmDark .footer-copyright {
  color: rgba(var(--v-theme-on-surface), 0.8);
}
</style>
