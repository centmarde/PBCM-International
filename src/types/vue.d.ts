import type { ToastService } from "@/plugins/toast";
import type { Vuetify } from "vuetify";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $toast: ToastService;
    $vuetify: Vuetify;
  }
}
