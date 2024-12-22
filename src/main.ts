import './assets/main.css'
import 'primeicons/primeicons.css'

// import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { initializeApp } from "firebase/app";
import ToastService from 'primevue/toastservice';
import ConfirmationService from "primevue/confirmationservice";
import Tooltip from 'primevue/tooltip';
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import Message from 'primevue/message';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import DatePicker from 'primevue/datepicker';
import RadioButton from 'primevue/radiobutton';
import Badge from 'primevue/badge';


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
app.use(ConfirmationService);
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
app.directive('tooltip',Tooltip)
app.component('app-menubar', Menubar);
app.component('app-button', Button);
app.component('app-input-text', InputText);
app.component('app-toast', Toast);
app.component('app-progress', ProgressSpinner);
app.component('app-card', Card);
app.component('app-datatable', DataTable);
app.component('app-column', Column);
app.component('app-confirm', ConfirmDialog);
app.component('app-message', Message);
app.component('app-input-number', InputNumber);
app.component('app-textarea', Textarea);
app.component('app-datepicker', DatePicker);
app.component('app-radio', RadioButton);
app.component('app-badge', Badge);


app.mount('#app')
