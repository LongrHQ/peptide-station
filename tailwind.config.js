module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: { min: '1400px' },
      '2xxl': { min: '1601px' },
      'xxl-only': { min: '1400px', max: '1600px' },
      large: { min: '2100px' },
    },

    boxShadow: {
      // ── Legacy (keep for backward compat) ──────────────────────────────
      header: '0 1px 0 #E2DDD3',
      counter: '0 2px 4px rgba(16,22,18,0.06)',
      cart: '0 3px 6px rgba(16,22,18,0.10)',
      footer: '3px 0 6px rgba(16,22,18,0.10)',
      'product-item': '0 3px 12px rgba(16,22,18,0.08)',
      float: '0 0 8px rgba(16,22,18,0.08)',
      floatingUp: '0 6px 16px rgba(16,22,18,0.12)',
      upside: '0 9px 7px -8px rgba(16,22,18,0.50)',
      mobile: '0 0px 2px rgba(16,22,18,0.10)',
      navigation: '0 3px 12px rgba(16,22,18,0.12)',
      floatBig: '0 0 16px rgba(16,22,18,0.12)',
      imgFloat: '0 10px 20px rgba(16,22,18,0.12)',
      // ── Brand shadows ──────────────────────────────────────────────────
      'product-hover': '0 8px 32px rgba(16,22,18,0.14)',
      'glow-accent': '0 0 0 3px rgba(53,191,116,0.28)',
      'glow-brand': '0 0 0 3px rgba(26,92,56,0.22)',
      'lift': '0 4px 24px rgba(16,22,18,0.10)',
      'lift-lg': '0 12px 48px rgba(16,22,18,0.14)',
    },

    fontFamily: {
      // body — DM Sans (clean, warm, modern)
      open: ['DM Sans', 'sans-serif'],     // backward compat alias
      body: ['DM Sans', 'sans-serif'],
      // display — Instrument Serif (distinctive, authoritative)
      display: ['Instrument Serif', 'serif'],
      // mono — DM Mono (specs, dosages, scientific data)
      mono: ['DM Mono', 'monospace'],
    },

    fontSize: {
      // ── Legacy scale (keep for backward compat) ───────────────────────
      '11px': '11px',
      '12px': '12px',
      '13px': '13px',
      '14px': '14px',
      '16px': '16px',
      '18px': '18px',
      '21px': '21px',
      '24px': '24px',
      '30px': '30px',
      '36px': '36px',
      // ── Display scale (hero sections, section headings) ───────────────
      '40px': '40px',
      '48px': '48px',
      '56px': '56px',
      '64px': '64px',
      '72px': '72px',
    },

    // Extend
    extend: {
      colors: {
        // ── Peptide Station brand palette ──────────────────────────────
        // Canvas — off-white
        canvas: '#F5F4EF',
        // Ink — charcoal (primary text + button bg)
        ink: '#2C2C2C',
        'ink-hover': '#C0392B',
        // Brand — red anchor
        brand: '#C0392B',
        'brand-hover': '#992D22',
        'brand-mid': '#E74C3C',
        // Accent — red (interactive states, highlights)
        accent: '#E74C3C',
        'accent-hover': '#C0392B',
        'accent-light': 'rgba(192,57,43,0.10)',
        // Warm — red (premium signals, badges, trust cues)
        warm: '#C0392B',
        'warm-hover': '#992D22',
        'warm-light': 'rgba(192,57,43,0.10)',
        // Surface & structure
        surface: '#FFFFFF',
        'surface-alt': '#EEECEA',
        muted: '#7A7874',

        // ── Legacy green (remapped to red for backward compat) ────
        green: '#E74C3C',
        'green-hover': '#C0392B',
        'green-light': 'rgba(192,57,43,0.10)',

        // ── Semantic ───────────────────────────────────────────────────
        'gray-f7': '#f5f4ef',
        'gray-3a': '#3a3a3a',
        'light-yellow': '#feeec8',
        'light-blue': '#ceeffe',
        'light-green': '#d0f5e4',
        'light-purple': '#d8dafe',
        error: '#E03535',
        overlay: 'rgba(16,22,18,0.65)',
        dark: '#101612',

        gray: {
          100: '#f5f4ef',
          200: '#eeecea',   // Light BG
          300: '#dddbd5',   // Border
          400: '#c8c6c0',   // Border Alt
          500: '#989690',   // Light Text
          600: '#74726C',
          700: '#555350',   // Normal Text
          800: '#3a3836',
          900: '#2C2C2C',   // Heavy Text / Charcoal
        },
      },

      lineHeight: {
        11: '2.75rem',
        12: '3rem',
      },

      width: {
        'main-content': 'calc(100% - 360px)',
        sidebar: '360px',
      },

      maxWidth: {
        half: '50%',
      },

      maxHeight: {
        '650px': '650px',
      },

      minHeight: {
        '480px': '480px',
      },

      height: {
        drawer: 'calc(100vh - 90px)',
      },

      gridColumnStart: {
        '40px': '40px',
      },

      spacing: {
        9: '2.25rem',
        11: '2.75rem',
        14: '3.5rem',
        '3px': '3px',
        '5px': '5px',
        '10px': '10px',
        '15px': '15px',
        '-15px': '-15px',
        '18px': '18px',
        '20px': '20px',
        '-20px': '-20px',
        '25px': '25px',
        '30px': '30px',
        '35px': '35px',
        '45px': '45px',
        '40px': '40px',
        '50px': '50px',
        '55px': '55px',
        '60px': '60px',
        '70px': '70px',
        '80px': '80px',
        '90px': '90px',
        '95px': '95px',
        '100px': '100px',
        '105px': '105px',
        '110px': '110px',
        '120px': '120px',
        '140px': '140px',
        '160px': '160px',
        '320px': '320px',
        '360px': '360px',
        '400px': '400px',
        '480px': '480px',
        '500px': '500px',
        '650px': '650px',
        '690px': '690px',
        '1440px': '1440px',
      },

      inset: {
        8: '2rem',
        9: '2.25rem',
        14: '3.5rem',
        half: '50%',
        '10px': '10px',
        '15px': '15px',
        '20px': '20px',
        '25px': '25px',
        '30px': '30px',
        '40px': '40px',
        '60px': '60px',
        '62px': '62px',
        '90px': '90px',
      },

      borderRadius: {
        default: '6px',
        '4px': '4px',
        '8px': '8px',
        '10px': '10px',
        '12px': '12px',
        '20px': '20px',
        '30px': '30px',
        pill: '9999px',
      },

      borderWidth: {
        '3px': '3px',
      },

      borderColor: (theme) => ({
        ...theme('colors'),
        default: theme('colors.gray.300', 'currentColor'),
      }),

      transitionDuration: {
        150: '150ms',
        250: '250ms',
        350: '350ms',
      },

      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'bounce-sm': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      letterSpacing: {
        'wide-sm': '0.03em',
        'wide-md': '0.06em',
        'wide-lg': '0.12em',
      },
    },

    container: {},
  },

  // Variants
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
    padding: ['responsive, odd, even'],
  },
};
