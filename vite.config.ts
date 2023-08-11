import { defineApplicationConfig } from '@vben/vite-config';

export default defineApplicationConfig({
  overrides: {
    optimizeDeps: {
      include: [
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        'qrcode',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    server: {
      port: 23081,
      proxy: {
        '/api': {
          target: 'http://pm-test.xmpaoyou.com/',
          // target: 'http://10.130.0.36:8077',
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
          // only https
          // secure: false
        },
      },
    },
  },
});
