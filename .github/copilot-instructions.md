# PBCM Vue.js Application - AI Coding Instructions

## Architecture Overview

This is a **PBCM (Philippine Christian Bible Missionary) website** built with Vue 3, Vuetify 3, TypeScript, and Vite. The project uses a file-based routing system with automatic imports and layouts.

### Key Stack Components
- **Framework**: Vue 3 with Composition API and `<script setup>` syntax
- **UI Framework**: Vuetify 3 with Material Design Icons (@mdi/font)
- **Build Tool**: Vite with TypeScript support
- **State Management**: Pinia stores
- **Routing**: File-based routing via `unplugin-vue-router`
- **Styling**: Vuetify component-first approach with minimal custom CSS
- **External Services**: Supabase, GROQ SDK, Axios, Tesseract.js, Mammoth, PDF.js

## Critical File Structure & Conventions

### Auto-Generated Files (DO NOT EDIT MANUALLY)
- `src/auto-imports.d.ts` - Vue/Pinia composables auto-imported globally
- `src/components.d.ts` - Component auto-imports from `src/components/`
- `src/typed-router.d.ts` - Type-safe router from file-based routing

### File-Based Routing
- **Pages**: `src/pages/*.vue` → Auto-generates routes
- **Layouts**: `src/layouts/default.vue` → Wraps pages with `<v-main><router-view /></v-main>`
- **Components**: Auto-imported from `src/components/` (e.g., `AppFooter` referenced but file missing)

### Theme System Files
- **`src/theme/theme.ts`**: Vuetify theme definitions (light/dark) with PBCM blue color palette
- **`src/styles/pbcm-theme.css`**: CSS custom properties, utility classes, and global theme styles

### Plugin Architecture
All plugins registered in `src/plugins/index.ts`:
```typescript
app.use(vuetify).use(router).use(pinia)
```

## Development Patterns

### Component Creation
- Use `<script setup lang="ts">` syntax consistently
- Components in `src/components/` are auto-imported globally
- Vuetify components (`v-*`) are auto-imported via vite-plugin-vuetify

### State Management
- Pinia stores in `src/stores/` with `defineStore()` auto-imported
- Example pattern: `export const useAppStore = defineStore('app', { state: () => ({ }) })`

### Styling Approach - **VUETIFY COMPONENTS FIRST**
- **CRITICAL**: Always prefer Vuetify components over custom CSS
- **Component-First Philosophy**: Use `v-container`, `v-row`, `v-col`, `v-card`, `v-btn`, etc. for layout and styling
- **Minimal Custom CSS**: Only write custom CSS when Vuetify components cannot achieve the desired result
- **Theme Configuration**: Global Vuetify theme in `src/plugins/vuetify.ts` for colors, typography, and spacing
- **PBCM Theme System**: 
  - `src/theme/theme.ts` - Vuetify theme definitions with PBCM blue palette (light/dark modes)
  - `src/styles/pbcm-theme.css` - CSS custom properties, utility classes, and global styles
- **Utility Classes**: Use Vuetify utility classes (`ma-4`, `pa-2`, `text-center`, etc.) and PBCM utility classes (`pbcm-gradient-text`, `pbcm-shadow-soft`, etc.)
- **Color System**: PBCM uses a blue-only 2-color palette (primary: `#1565C0`, secondary: `#2196F3`)
- **Responsive Design**: Use Vuetify's built-in breakpoint system (`xs`, `sm`, `md`, `lg`, `xl`)
- **SCSS Variables**: Only use `src/styles/settings.scss` for Vuetify variable overwrites, not custom styles
- **Last Resort**: Custom `<style scoped>` only when Vuetify cannot provide the needed styling

#### PBCM Theme Usage Examples:
```vue
<!-- ✅ CORRECT: Use Vuetify components with PBCM theme -->
<v-container>
  <v-row>
    <v-col cols="12" md="6">
      <v-card class="pa-4 pbcm-card" color="surface">
        <v-card-title class="text-primary">Sermon Title</v-card-title>
        <v-card-text>Sermon description content</v-card-text>
        <v-card-actions>
          <v-btn color="primary" class="pbcm-button">Listen Now</v-btn>
          <v-btn color="secondary" variant="outlined">Download</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</v-container>

<!-- ✅ CORRECT: Use CSS custom properties for consistent theming -->
<v-sheet 
  class="pbcm-gradient-bg pa-6 pbcm-border-radius-lg"
  style="color: white;"
>
  <h2 class="pbcm-gradient-text">Welcome to PBCM</h2>
</v-sheet>

<!-- ❌ AVOID: Custom CSS when Vuetify + PBCM theme can handle it -->
<div class="custom-container">
  <div class="custom-card" style="background: #1565C0;">
    <h2 style="color: #2196F3;">Title</h2>
    <button style="background: blue;">Action</button>
  </div>
</div>
```

### Responsive Design with Vuetify Display Utilities
- **CRITICAL**: Always use Vuetify's `useDisplay()` composable for responsive design
- **Import Pattern**: `import { useDisplay } from 'vuetify'`
- **Breakpoint Detection**: Destructure needed breakpoints: `const { xs, sm, md, lg, xl, smAndDown, mdAndUp } = useDisplay()`
- **Mobile-First Approach**: Design for mobile first, then enhance for larger screens
- **Common Patterns**:
  ```vue
  <script setup lang="ts">
  import { useDisplay } from 'vuetify'
  
  const { xs, smAndDown, mdAndUp } = useDisplay()
  </script>
  
  <template>
    <!-- ✅ CORRECT: Responsive layout using useDisplay -->
    <v-container>
      <v-row :justify="smAndDown ? 'center' : 'start'">
        <v-col 
          cols="12" 
          :md="mdAndUp ? 6 : 12"
          :class="{ 'text-center': smAndDown }"
        >
          <v-card :class="{ 'mx-auto': smAndDown, 'max-width-400': xs }">
            <v-card-title>{{ title }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
    <!-- ✅ CORRECT: Conditional rendering for mobile -->
    <v-dialog 
      :fullscreen="xs"
      :max-width="smAndDown ? '100%' : '600px'"
    >
      <!-- Dialog content -->
    </v-dialog>
    
    <!-- ✅ CORRECT: Responsive button sizing -->
    <v-btn 
      :size="xs ? 'small' : 'large'"
      :block="smAndDown"
      color="primary"
    >
      Action Button
    </v-btn>
  </template>
  ```

- **Available Breakpoints**:
  - `xs` - Extra small (< 600px) - Mobile phones
  - `sm` - Small (600px - 960px) - Tablets  
  - `md` - Medium (960px - 1264px) - Small laptops
  - `lg` - Large (1264px - 1904px) - Desktops
  - `xl` - Extra large (> 1904px) - Large screens
  - `smAndDown` - Small screens and below (< 960px)
  - `mdAndUp` - Medium screens and above (≥ 960px)

- **Mobile Optimization Guidelines**:
  - Use `:fullscreen="xs"` for dialogs on mobile
  - Center content with `:class="{ 'text-center': smAndDown }"`
  - Stack columns on mobile: `:cols="xs ? 12 : 6"`
  - Adjust spacing: `:class="{ 'pa-2': xs, 'pa-6': mdAndUp }"`
  - Use block buttons: `:block="smAndDown"`

### Auto-Import Configuration
- **Vue composables**: `ref`, `computed`, `onMounted`, etc. available globally
- **Router**: `useRouter`, `useRoute` auto-imported from Vue Router
- **Pinia**: `defineStore`, `storeToRefs` auto-imported

### TypeScript Guidelines
- **Prefer `type` over `interface`** for all type definitions
- **Avoid `null` and `any`** - use `undefined`, union types, or proper type definitions
- **Religious Domain Types**: Create specific types for ministry-related data (sermons, events, members, prayers)
- Example patterns:
  ```typescript
  type SermonData = {
    title: string
    speaker: string
    date: Date
    scripture: string
    audioUrl?: string
  }
  
  type MemberStatus = 'active' | 'inactive' | 'visitor'
  type ServiceType = 'sunday-service' | 'bible-study' | 'prayer-meeting'
  ```

## Development Commands

```bash
# Development server with HMR
npm run dev          # Starts on localhost:3000

# Production build
npm run build        # Runs type-check + vite build
npm run type-check   # Vue TSC type checking
npm run preview      # Preview production build
```

## Important Notes

### Router Error Handling
The router includes a dynamic import error workaround for Vite HMR issues - don't modify the `router.onError` handler in `src/router/index.ts`.

### Theme System
- Default theme set to 'system' (auto dark/light mode)
- Vuetify auto-import enabled - all `v-*` components available without imports

### Missing Components
- `AppFooter` is referenced in `default.vue` layout but component file doesn't exist
- When creating missing components, place in `src/components/` for auto-import

### Deployment
- Configured for Vercel with SPA fallback (`vercel.json`)
- All routes redirect to `/` for client-side routing

## Integration Dependencies
The project includes several specialized libraries likely for document processing and AI features:
- **Supabase**: Backend/database integration for member management, sermons, events
- **GROQ SDK**: AI/LLM integration for scripture search, sermon transcription
- **Tesseract.js**: OCR text recognition for digitizing physical documents
- **Mammoth**: DOCX document processing for sermon notes, bulletins
- **PDF.js**: PDF document handling for downloadable resources

## Religious Domain Considerations
- **Content Management**: Sermons, Bible studies, prayer requests, testimonies
- **Member Management**: Attendance tracking, ministry involvement, spiritual growth
- **Event Coordination**: Service schedules, special events, outreach programs
- **Resource Sharing**: Scripture references, devotionals, educational materials
- **Data Sensitivity**: Handle personal prayer requests and member information with appropriate privacy
