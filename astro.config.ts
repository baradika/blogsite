import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'

import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import rehypeExpressiveCode from 'rehype-expressive-code'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypeShiki from '@shikijs/rehype'
import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'
import { remarkPdfEmbed } from './src/lib/remark-pdf-embed'

import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://astro-erudite.vercel.app',
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkPdfEmbed],
    }),
    react(),
    sitemap(),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 1234,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noreferrer', 'noopener'],
        },
      ],
      rehypeHeadingIds,
      rehypeKatex,
      [
        rehypeExpressiveCode,
        {
          themes: ['github-dark'],
          plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
          useDarkModeMediaQuery: false,
          themeCssSelector: () => '.expressive-code',
          defaultProps: {
            wrap: true,
            collapseStyle: 'collapsible-auto',
            overridesByLang: {
              'ansi,bat,bash,batch,cmd,console,powershell,ps,ps1,psd1,psm1,sh,shell,shellscript,shellsession,text,zsh':
                {
                  showLineNumbers: false,
                },
            },
          },
          styleOverrides: {
            codeFontSize: '0.75rem',
            borderColor: 'var(--code-block-border)',
            codeFontFamily: 'var(--font-mono)',
            codeBackground: 'var(--code-block-bg)',
            frames: {
              editorActiveTabForeground: 'var(--code-block-foreground)',
              editorActiveTabBackground: 'var(--code-block-bg)',
              editorActiveTabIndicatorBottomColor: 'transparent',
              editorActiveTabIndicatorTopColor: 'transparent',
              editorTabBorderRadius: '0',
              editorTabBarBackground: 'var(--code-block-bg)',
              editorTabBarBorderBottomColor: 'var(--code-block-border)',
              frameBoxShadowCssValue: 'none',
              terminalBackground: 'var(--code-block-bg)',
              terminalTitlebarBackground: 'var(--code-block-bg)',
              terminalTitlebarBorderBottomColor: 'var(--code-block-border)',
              terminalTitlebarForeground: 'var(--muted-foreground)',
            },
            lineNumbers: {
              foreground: 'var(--muted-foreground)',
            },
            uiFontFamily: 'var(--font-sans)',
          },
        },
      ],
      [
        rehypeShiki,
        {
          themes: {
            light: 'github-dark',
            dark: 'github-dark',
          },
          inline: 'tailing-curly-colon',
        },
      ],
    ],
    remarkPlugins: [remarkMath, remarkEmoji],
  },
})
