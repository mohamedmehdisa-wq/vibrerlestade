
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ultrasfoot.vibrerlestade',
  appName: 'Vibrer le Stade',
  webDir: 'dist',
  // Fix: Removed 'bundledWebRuntime' property which is deprecated and removed in Capacitor 4.0+
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#7B161D",
      sound: "beep.wav",
    },
    Haptics: {
      vibrate: true
    }
  }
};

export default config;
