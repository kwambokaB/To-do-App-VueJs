import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  BiBrightnessHighFill,
  BiMoon,
  BiMoonFill,
  BiCircle,
  IoCheckmark,
  BiCheck2
} from 'oh-vue-icons/icons';

addIcons(BiMoon, BiBrightnessHighFill, BiMoonFill, BiCircle, IoCheckmark,BiCheck2);

const app = createApp(App);
app.component('v-icon', OhVueIcon);
app.mount('#app');
