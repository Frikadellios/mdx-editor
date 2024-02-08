import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import node from '@astrojs/node';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import million from "million/compiler";
 
export default defineConfig({
  vite: {
    plugins: [
      million.vite({
        mode: "react",
        server: true,
        auto: {
          threshold: 0.05,
          skip: ["useBadHook", /badVariable/g],
        },
      }),
    ],
  },
  site: "https://mdx-editor-psi.vercel.app/",
  output: 'hybrid',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [starlight({
    title: 'My Docs',
    defaultLocale: 'root',
    locales: {
      root: {
        label: 'English',
        lang: 'en' // lang is required for root locales
      },

      es: {
        label: 'Español'
      }
    },
    social: {
      github: 'https://github.com/withastro/starlight'
    },
    components: {
      Head: './src/components/Head.astro'
    },
    sidebar: [{
      label: 'Guides',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Example Guide',
        link: '/guides/example/'
      }]
    }, {
      label: 'Reference',
      autogenerate: {
        directory: 'reference'
      }
    }]
  }), react(), sitemap()]
});