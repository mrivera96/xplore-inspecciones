import type { CapacitorConfig } from '@capacitor/cli';
import { CapacitorHttp } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Xplore Inspecciones',
  webDir: 'www/browser',
 server:{hostname:'localhost',androidScheme:'http',iosScheme:'http',cleartext:true, },
 android:{allowMixedContent:true,},
};

export default config;
