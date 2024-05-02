import type { CapacitorConfig } from '@capacitor/cli';
import { CapacitorHttp } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Xplore Inspecciones',
  webDir: 'www/browser',
  android:{allowMixedContent:true},
  server:{androidScheme:'CAPACITOR_HTTP_SCHEME'}
  
};

export default config;
