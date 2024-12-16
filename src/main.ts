import './assets/main.css'
import 'primeicons/primeicons.css'

// import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { initializeApp } from "firebase/app";
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';

const firebaseConfig = {
  apiKey: "AIzaSyA29nlZG8Gt0USUQkABE0HAhWDjLzAof-Y",
  authDomain: "custom-list-533e4.firebaseapp.com",
  projectId: "custom-list-533e4",
  storageBucket: "custom-list-533e4.firebasestorage.app",
  messagingSenderId: "539120067774",
  appId: "1:539120067774:web:9e90558fcc565a4f42eaef"
};

initializeApp(firebaseConfig);

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    }
  }
});

const app = createApp(App)
app.use(ToastService)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  }
});
app.component('app-menubar', Menubar);
app.component('app-button', Button);
app.component('app-input-text', InputText);
app.component('app-toast', Toast);
app.component('app-progress', ProgressSpinner);

app.mount('#app')
