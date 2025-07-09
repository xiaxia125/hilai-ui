import { defineConfig } from "vitepress"
import { mdPlugin } from "./config/plugins"
export default defineConfig({
  title: "Hilai UI",
  description: "基于Element-plus基础组件封装使用",
  lang: "cn-ZH",
  base: "/hilai-ui/",
  lastUpdated: true,
  themeConfig: {
    logo: "",
    // siteTitle: "Hilai-ui",
    outline: 3,
    socialLinks: [{ icon: "github", link: "https://github.com/xiaxia125/hilai-ui" }],
    nav: [
      {
        text: "安装指南",
        link: "/guide/"
      },
      { text: "基础组件", link: "/components/HlButton/base.md" },
      {
        text: "开发文档",
        link: "/develop/KfDocs/base.md"
      },
      {
        text: "更新日志",
        link: "/changelog/"
      }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "安装指南",
          // items: [
          //   { text: "安装", link: "" },
          //   { text: "快速开始", link: "" },
          // ]
        }
      ],
      "/develop/": [
        {
          text: "开发文档",
          items: [
              { text: "安装", link: "" },
              { text: "快速开始", link: "" },
            ]
        }
      ],
      "/components": [
        {
          text: "按钮组件",
          collapsed: false,
          items: [
            { text: "Button", link: "/components/HlButton/base.md" },
          ]
        },
        {
          text: "表格组件",
          collapsed: false,
          items: [
            { text: "CrossTableSelector", link: "/components/HlCrossTableSelector/base.md" },
          ]
        },
        {
          text: "分页组件",
          collapsed: false,
          items: [
            { text: "Pagination", link: "/components/HlPagination/base.md" },
          ]
        },
        {
          text: "文件上传组件",
          collapsed: false,
          items: [
            { text: "FileUpload", link: "/components/HlFileUpload/base.md" },
          ]
        },
        {
          text: "视频组件",
          collapsed: false,
          items: [
            { text: "VideoPlayer", link: "/components/HlVideoPlayer/base.md" },
          ]
        },
      ]
    }
  },
  markdown: {
    headers: {
      level: [0, 0]
    },
    theme: { light: "github-light", dark: "github-dark" },
    config: md => mdPlugin(md)
  }
})
