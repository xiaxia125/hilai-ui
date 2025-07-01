import{_ as n,o as a,c as l,K as p}from"./chunks/framework.1643958b.js";const d=JSON.parse('{"title":"开发文档","description":"","frontmatter":{},"headers":[],"relativePath":"examples/KfDocs/index.md","filePath":"examples/KfDocs/index.md","lastUpdated":1751333433000}'),o={name:"examples/KfDocs/index.md"};function e(t,s,c,r,y,E){return a(),l("div",null,s[0]||(s[0]=[p(`<h1 id="开发文档" tabindex="-1">开发文档 <a class="header-anchor" href="#开发文档" aria-label="Permalink to &quot;开发文档&quot;">​</a></h1><h2 id="组件开发文件结构" tabindex="-1">组件开发文件结构 <a class="header-anchor" href="#组件开发文件结构" aria-label="Permalink to &quot;组件开发文件结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">├─ packages</span></span>
<span class="line"><span style="color:#e1e4e8;">   ├─ name//组件名称</span></span>
<span class="line"><span style="color:#e1e4e8;">   │  ├─ src</span></span>
<span class="line"><span style="color:#e1e4e8;">   │  │  └─ index.vue//组件入口文件</span></span>
<span class="line"><span style="color:#e1e4e8;">   │  └─ index.ts//组件导出</span></span>
<span class="line"><span style="color:#e1e4e8;">   └─ components.d.ts//组件类型文件</span></span>
<span class="line"><span style="color:#e1e4e8;">   └─ index.ts//组件的全局注册</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">├─ packages</span></span>
<span class="line"><span style="color:#24292e;">   ├─ name//组件名称</span></span>
<span class="line"><span style="color:#24292e;">   │  ├─ src</span></span>
<span class="line"><span style="color:#24292e;">   │  │  └─ index.vue//组件入口文件</span></span>
<span class="line"><span style="color:#24292e;">   │  └─ index.ts//组件导出</span></span>
<span class="line"><span style="color:#24292e;">   └─ components.d.ts//组件类型文件</span></span>
<span class="line"><span style="color:#24292e;">   └─ index.ts//组件的全局注册</span></span></code></pre></div><h2 id="组件开发流程" tabindex="-1">组件开发流程 <a class="header-anchor" href="#组件开发流程" aria-label="Permalink to &quot;组件开发流程&quot;">​</a></h2><h3 id="创建组件入口文件" tabindex="-1">创建组件入口文件 <a class="header-anchor" href="#创建组件入口文件" aria-label="Permalink to &quot;创建组件入口文件&quot;">​</a></h3><h3 id="创建组件导出文件" tabindex="-1">创建组件导出文件 <a class="header-anchor" href="#创建组件导出文件" aria-label="Permalink to &quot;创建组件导出文件&quot;">​</a></h3><p>这里以treeselect组件为例：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> TreeSelect </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./src/index.vue&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { withInstall } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;../withInstall&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HlTreeSelect</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">withInstall</span><span style="color:#E1E4E8;">(TreeSelect);</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> HlTreeSelect;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> TreeSelect </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./src/index.vue&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { withInstall } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;../withInstall&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HlTreeSelect</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">withInstall</span><span style="color:#24292E;">(TreeSelect);</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> HlTreeSelect;</span></span></code></pre></div><h3 id="组件类型文件添加" tabindex="-1">组件类型文件添加 <a class="header-anchor" href="#组件类型文件添加" aria-label="Permalink to &quot;组件类型文件添加&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> HlTreeSelect </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./treeselect/src/index.vue&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">declare</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">module</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">GlobalComponents</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#FFAB70;">HlTreeSelect</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> HlTreeSelect</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> HlTreeSelect </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./treeselect/src/index.vue&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">module</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">GlobalComponents</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#E36209;">HlTreeSelect</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> HlTreeSelect</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="组件全局注册文件添加" tabindex="-1">组件全局注册文件添加 <a class="header-anchor" href="#组件全局注册文件添加" aria-label="Permalink to &quot;组件全局注册文件添加&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { debounce, throttle, formatNumber } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./utils&quot;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> { Component, App } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> HlTreeSelect </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./treeselect&quot;</span><span style="color:#6A737D;">//这里填写组件名称</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 存储组件列表</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">components</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    [</span><span style="color:#FFAB70;">propName</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">]</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Component</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">HlTreeSelect,</span><span style="color:#6A737D;">//这里填写组件名称</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 插件声明：声明所有插件</span></span>
<span class="line"><span style="color:#6A737D;">// 插件注册：在 Vue 项目的入口文件中，通过 ( app.use(插件) ) 进行注册</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">installComponents</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">app</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">key</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> components) {</span></span>
<span class="line"><span style="color:#E1E4E8;">   app.</span><span style="color:#B392F0;">component</span><span style="color:#E1E4E8;">(key, components[key])</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// vue插件</span></span>
<span class="line"><span style="color:#6A737D;">// - install：每个插件都有一个 install 方法</span></span>
<span class="line"><span style="color:#6A737D;">// - 参数：是通过 Vue.createApp() 创建的 app 实例</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">install</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">app</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#B392F0;">installComponents</span><span style="color:#E1E4E8;">(app)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// @ts-ignore</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> window </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;undefined&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> window.Vue) {</span></span>
<span class="line"><span style="color:#6A737D;">// @ts-ignore</span></span>
<span class="line"><span style="color:#E1E4E8;">window.Vue.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(install)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 按需引入</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">HlTreeSelect,</span><span style="color:#6A737D;">//这里填写组件名称</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">* </span><span style="color:#F97583;">@description</span><span style="color:#6A737D;"> 公共方法</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> { throttle, debounce, formatNumber }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 导出的对象必须具有 install，才能被 Vue.use() 方法安装</span></span>
<span class="line"><span style="color:#E1E4E8;">install</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { debounce, throttle, formatNumber } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./utils&quot;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> { Component, App } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> HlTreeSelect </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./treeselect&quot;</span><span style="color:#6A737D;">//这里填写组件名称</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 存储组件列表</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">components</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    [</span><span style="color:#E36209;">propName</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Component</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">HlTreeSelect,</span><span style="color:#6A737D;">//这里填写组件名称</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 插件声明：声明所有插件</span></span>
<span class="line"><span style="color:#6A737D;">// 插件注册：在 Vue 项目的入口文件中，通过 ( app.use(插件) ) 进行注册</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">installComponents</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">app</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">key</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> components) {</span></span>
<span class="line"><span style="color:#24292E;">   app.</span><span style="color:#6F42C1;">component</span><span style="color:#24292E;">(key, components[key])</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// vue插件</span></span>
<span class="line"><span style="color:#6A737D;">// - install：每个插件都有一个 install 方法</span></span>
<span class="line"><span style="color:#6A737D;">// - 参数：是通过 Vue.createApp() 创建的 app 实例</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">install</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">app</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">App</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#6F42C1;">installComponents</span><span style="color:#24292E;">(app)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// @ts-ignore</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> window </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;undefined&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> window.Vue) {</span></span>
<span class="line"><span style="color:#6A737D;">// @ts-ignore</span></span>
<span class="line"><span style="color:#24292E;">window.Vue.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(install)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 按需引入</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">HlTreeSelect,</span><span style="color:#6A737D;">//这里填写组件名称</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;">* </span><span style="color:#D73A49;">@description</span><span style="color:#6A737D;"> 公共方法</span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> { throttle, debounce, formatNumber }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 导出的对象必须具有 install，才能被 Vue.use() 方法安装</span></span>
<span class="line"><span style="color:#24292E;">install</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="组件文档开发文件结构" tabindex="-1">组件文档开发文件结构 <a class="header-anchor" href="#组件文档开发文件结构" aria-label="Permalink to &quot;组件文档开发文件结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">├─ docs</span></span>
<span class="line"><span style="color:#e1e4e8;">    ├─ .vitepress</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  └─ config.ts//配置文件</span></span>
<span class="line"><span style="color:#e1e4e8;">    └─ components</span></span>
<span class="line"><span style="color:#e1e4e8;">    │  └─ name//组件名称</span></span>
<span class="line"><span style="color:#e1e4e8;">    │     └─base.md//组件组合文档</span></span>
<span class="line"><span style="color:#e1e4e8;">    └─ examples</span></span>
<span class="line"><span style="color:#e1e4e8;">       └─ name//组件名称</span></span>
<span class="line"><span style="color:#e1e4e8;">          └─ base.vue//组件模块文档</span></span>
<span class="line"><span style="color:#e1e4e8;">          └─ base.vue//组件模块文档</span></span>
<span class="line"><span style="color:#e1e4e8;">          └─ base.vue//组件模块文档</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">├─ docs</span></span>
<span class="line"><span style="color:#24292e;">    ├─ .vitepress</span></span>
<span class="line"><span style="color:#24292e;">    │  └─ config.ts//配置文件</span></span>
<span class="line"><span style="color:#24292e;">    └─ components</span></span>
<span class="line"><span style="color:#24292e;">    │  └─ name//组件名称</span></span>
<span class="line"><span style="color:#24292e;">    │     └─base.md//组件组合文档</span></span>
<span class="line"><span style="color:#24292e;">    └─ examples</span></span>
<span class="line"><span style="color:#24292e;">       └─ name//组件名称</span></span>
<span class="line"><span style="color:#24292e;">          └─ base.vue//组件模块文档</span></span>
<span class="line"><span style="color:#24292e;">          └─ base.vue//组件模块文档</span></span>
<span class="line"><span style="color:#24292e;">          └─ base.vue//组件模块文档</span></span></code></pre></div><h2 id="组件文档开发流程" tabindex="-1">组件文档开发流程 <a class="header-anchor" href="#组件文档开发流程" aria-label="Permalink to &quot;组件文档开发流程&quot;">​</a></h2><h3 id="创建组件模块文档" tabindex="-1">创建组件模块文档 <a class="header-anchor" href="#创建组件模块文档" aria-label="Permalink to &quot;创建组件模块文档&quot;">​</a></h3><p>注意：一个文件对应一个右边的选择侧边栏</p><h3 id="创建组件组合文档" tabindex="-1">创建组件组合文档 <a class="header-anchor" href="#创建组件组合文档" aria-label="Permalink to &quot;创建组件组合文档&quot;">​</a></h3><p>将所有模块文档组合在这里</p><h3 id="在文档配置文件添加" tabindex="-1">在文档配置文件添加 <a class="header-anchor" href="#在文档配置文件添加" aria-label="Permalink to &quot;在文档配置文件添加&quot;">​</a></h3><p>在.vitepress/config.ts文件中添加：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">sidebar</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;/components&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      text: </span><span style="color:#9ECBFF;">&quot;常用组件&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      items: [</span></span>
<span class="line"><span style="color:#E1E4E8;">        { text: </span><span style="color:#9ECBFF;">&quot;组件名称&quot;</span><span style="color:#E1E4E8;">, link: </span><span style="color:#9ECBFF;">&quot;/components/组件名称/base.md&quot;</span><span style="color:#E1E4E8;"> },</span></span>
<span class="line"><span style="color:#E1E4E8;">      ]</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">sidebar</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;/components&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      text: </span><span style="color:#032F62;">&quot;常用组件&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      items: [</span></span>
<span class="line"><span style="color:#24292E;">        { text: </span><span style="color:#032F62;">&quot;组件名称&quot;</span><span style="color:#24292E;">, link: </span><span style="color:#032F62;">&quot;/components/组件名称/base.md&quot;</span><span style="color:#24292E;"> },</span></span>
<span class="line"><span style="color:#24292E;">      ]</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">   </span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,22)]))}const u=n(o,[["render",e]]);export{d as __pageData,u as default};
