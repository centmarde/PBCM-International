<script setup lang="ts">
import { useDisplay } from "vuetify";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/style.css";

type WorkInProgressProps = {
  modelValue: boolean;
};

type WorkInProgressEmits = {
  "update:modelValue": [value: boolean];
};

const props = defineProps<WorkInProgressProps>();
const emit = defineEmits<WorkInProgressEmits>();

const { xs, smAndDown } = useDisplay();

const closeDialog = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <v-dialog
    :model-value="props.modelValue"
    @update:model-value="closeDialog"
    :fullscreen="xs"
    :max-width="smAndDown ? '95%' : '600px'"
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card class="text-center">
      <!-- Header -->
      <v-card-title
        class="d-flex align-center justify-space-between pa-4 bg-primary"
      >
        <div class="flex-grow-1"></div>
        <v-btn
          icon="mdi-close"
          color="white"
          variant="text"
          size="small"
          @click="closeDialog"
        />
      </v-card-title>

      <!-- Content -->
      <PerfectScrollbar
        :options="{
          wheelSpeed: 2,
          wheelPropagation: false,
          swipeEasing: true,
          minScrollbarLength: 20,
          suppressScrollX: true,
        }"
        class="scrollable-content"
        :style="{ maxHeight: xs ? '70vh' : '60vh' }"
      >
        <v-card-text class="pa-8">
          <v-icon
            icon="mdi-hammer-wrench"
            color="primary"
            size="64"
            class="mb-6"
          />

          <h3 class="text-h5 text-primary font-weight-bold mb-4">
            Under Development
          </h3>

          <p class="text-body-1 text-medium-emphasis mb-6">
            We're building something amazing for God's glory.<br />
            Please check back soon.
          </p>

          <v-divider class="my-6" />
          <!-- Developer Invitation Section -->
          <div class="text-center">
            <h4 class="text-h6 text-primary mb-3">Join Our Development Team</h4>
            <p class="text-body-2 mb-4">
              Are you a developer who wants to use your skills for God's
              kingdom?<br />
              We invite you to help build this ministry platform.
            </p>

            <div
              class="d-flex flex-column flex-sm-row gap-3 justify-center align-center"
            >
              <v-btn
                class="mx-2"
                href="mailto:centmarde.campado@gmail.com?subject=PBCM Development Interest"
                color="primary"
                variant="outlined"
                prepend-icon="mdi-email"
                target="_blank"
                :size="smAndDown ? 'small' : 'default'"
              >
                Email Us
              </v-btn>

              <v-btn
                href="https://www.facebook.com/centmarde.campado"
                color="primary"
                variant="outlined"
                prepend-icon="mdi-facebook"
                target="_blank"
                :size="smAndDown ? 'small' : 'default'"
              >
                Drop a Message
              </v-btn>
            </div>
          </div>

          <v-divider class="my-6" />
          <p class="text-body-2 text-primary font-italic">
            "For I know the plans I have for you," declares the Lord,<br />
            "plans to prosper you and not to harm you, to give you hope and a
            future."
          </p>
          <p class="text-caption text-medium-emphasis mt-2">Jeremiah 29:11</p>
        </v-card-text>
      </PerfectScrollbar>

      <!-- Actions -->
      <v-card-actions class="pa-4 justify-center">
        <v-btn
          color="primary"
          variant="elevated"
          @click="closeDialog"
          prepend-icon="mdi-check"
        >
          Got it
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
/* Perfect Scrollbar PBCM Theme Integration */
.scrollable-content {
  position: relative;
}

/* Custom scrollbar styling to match PBCM theme */
.scrollable-content :deep(.ps__rail-y) {
  background-color: rgba(
    21,
    101,
    192,
    0.1
  ) !important; /* PBCM primary with opacity */
  border-radius: 6px;
}

.scrollable-content :deep(.ps__thumb-y) {
  background-color: rgb(21, 101, 192) !important; /* PBCM primary color */
  border-radius: 6px;
  width: 6px;
}

.scrollable-content :deep(.ps__thumb-y:hover) {
  background-color: rgb(
    33,
    150,
    243
  ) !important; /* PBCM secondary color on hover */
  width: 8px;
}

/* Smooth transitions for scrollbar interactions */
.scrollable-content :deep(.ps__rail-y):hover .ps__thumb-y,
.scrollable-content :deep(.ps__rail-y:focus .ps__thumb-y),
.scrollable-content :deep(.ps__rail-y.ps--clicking .ps__thumb-y) {
  width: 8px;
  transition: width 0.2s ease-in-out;
}

/* Ensure proper spacing and smooth scrolling */
.scrollable-content :deep(.ps) {
  overflow: hidden !important;
}

.scrollable-content :deep(.ps__rail-y) {
  opacity: 0.6;
  transition: opacity 0.3s ease-in-out;
}

.scrollable-content :deep(.ps__rail-y:hover) {
  opacity: 1;
}
</style>
