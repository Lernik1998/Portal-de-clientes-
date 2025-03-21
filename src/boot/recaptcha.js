import { boot } from 'quasar/wrappers';
import { VueReCaptcha } from 'vue-recaptcha-v3';

export default boot(({ app }) => {
    app.use(VueReCaptcha, {
      siteKey: '6LefLJEqAAAAACgWW-oezGwqx9jXTIFu_TbxGpFB',
    });
  });