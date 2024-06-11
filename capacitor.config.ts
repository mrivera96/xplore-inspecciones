import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.xplore.inspecciones',
  appName: 'Xplore Inspecciones',
  webDir: 'www/browser',
 server:{hostname:'localhost',androidScheme:'http',iosScheme:'http',cleartext:true, },
 android:{allowMixedContent:true,},
};

export default config;
