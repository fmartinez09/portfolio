import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      typography: {
        invert: {
          css: {
            '--tw-prose-body': 'rgb(212 212 216)',        /* zinc-300 */
            '--tw-prose-headings': 'rgb(244 244 245)',    /* zinc-100 */
            '--tw-prose-links': 'rgb(244 244 245)',
            '--tw-prose-bold': 'rgb(244 244 245)',
            '--tw-prose-quotes': 'rgb(212 212 216)',
            '--tw-prose-hr': 'rgb(39 39 42)',             /* zinc-800 */
            '--tw-prose-captions': 'rgb(161 161 170)',
            '--tw-prose-code': 'rgb(228 228 231)',
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config
