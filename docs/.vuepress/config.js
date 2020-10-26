const path = require('path');

// const booksConfig = require('./booksConfig/config');
// import { booksOfVue } from './booksConfig/config';
const booksOfVue = require('./booksConfig/config');

module.exports = (options, context) => ({
  dest: 'dist',
  title: 'silit’ Home',
  description: 'silit’ Home',
  plugins: [
    ['@vuepress/back-to-top'],
    ['vuepress-plugin-zooming'],
    ['fulltext-search'],
  ],
  chainWebpack(config) {
    config.resolve.alias.set('@public', path.resolve(__dirname, './public')),
      config.resolve.alias.set('@docs', path.resolve(__dirname, '../'));
  },
  themeConfig: {
    editLinks: false,
    docsDir: 'docs',
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'PC',
        items: [{ text: 'Pc', link: '/pc/pc' }],
      },
      {
        text: 'books',
        items: [
          {
            text: 'Vue.js 组件精讲',
            link: '/books/bookA/开篇：Vue.js 的精髓——组件',
          },
          {
            text: 'Vue 项目构建与开发入门',
            link: '/books/book2/开篇：Vue CLI 3 项目构建基础',
          },
        ],
      },
    ],
    sidebarDepth: 3,
    sidebar: {
      '/pc/': [
        {
          title: 'pc',
          collapsable: false,
          children: ['pc'],
        },
      ],
      '/books/bookA/': [
        {
          title: 'Vue.js 组件精讲',
          collapsable: false,
          children: booksOfVue.booksOfVue1,
        },
      ],
      '/books/book2/': [
        {
          title: 'Vue 项目构建与开发入门',
          collapsable: false,
          children: booksOfVue.booksOfVue2,
        },
      ],
    },
  },
});
