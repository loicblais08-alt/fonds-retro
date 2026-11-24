import type { Register, ThemeSetArgs, EngineInterface } from 'claude-code'

import { makeColors } from './make-colors.js'
import { PIXEL_OCEAN, SYNTHWAVE, TERMINAL, VAPORWAVE } from './scenes'
import { FORET, FORET_NOEL } from './pixel-scenes'

type LookName = 'foret' | 'noel' | 'pixel' | 'synthwave' | 'windows95' | 'terminal'

// ---------- Foret de nuit (sombre) ----------
const foretColors = makeColors({
  label: 'Forêt de nuit',
  only: 'dark',
  roles: { accent: '#3cf2a0', danger: '#ff6b6b', success: '#7ee08a', warning: '#ffe66b', pro: '#8fb8ff' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#07121c',
        'surface-1': '#0b1924',
        'surface-2': '#0f202c',
        'surface-3': '#132734',
        'text-primary': '#eef6f2',
        'text-secondary': '#c4d6cf',
        'text-muted': '#9fb5ad',
      },
    },
  },
})

const foret: ThemeSetArgs = {
  colors: foretColors.theme,
  overrideColorScheme: 'dark',
  backdrop: { scene: 'retro-foret', glass: { blur: 12, tint: '#07121c', opacity: 0.55 } },
  style: {
    Heading: { color: '#ffe66b', fontWeight: 'bold' },
    UserMessage: {
      backgroundColor: '#0f2a2af2',
      color: '#eef6f2',
      borderColor: '#2f7a62',
      borderWidth: 1,
      radius: 10,
      padding: 12,
    },
    AssistantMessage: { backgroundColor: '#07121cd9', color: '#eef6f2', radius: 10, padding: 12 },
    ToolUse: { color: '#9fb5ad', backgroundColor: '#07121ce6', radius: 6, paddingX: 8 },
  },
}

// ---------- 0. Abysses pixel (sombre) ----------
const pixelColors = makeColors({
  label: 'Abysses pixel',
  only: 'dark',
  roles: { accent: '#3fd3c3', danger: '#ff6b7a', success: '#5fe0a0', warning: '#f2a65a', pro: '#a594ff' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0b1233',
        'surface-1': '#10183f',
        'surface-2': '#151f4a',
        'surface-3': '#1a2654',
        'text-primary': '#eef1ff',
        'text-secondary': '#c6cdee',
        'text-muted': '#a0a9d2',
      },
    },
  },
})

const pixel: ThemeSetArgs = {
  colors: pixelColors.theme,
  overrideColorScheme: 'dark',
  backdrop: { scene: 'retro-pixel', glass: { blur: 12, tint: '#0b1233', opacity: 0.5 } },
  style: {
    UserMessage: {
      backgroundColor: '#1a2554f2',
      color: '#eef1ff',
      borderColor: '#34458f',
      borderWidth: 1,
      radius: 10,
      padding: 12,
    },
    ToolUse: { color: '#a0a9d2', backgroundColor: '#0b1233e6', radius: 6, paddingX: 8 },
  },
}

// ---------- 1. Synthwave 80s (sombre) ----------
const synthColors = makeColors({
  label: 'Synthwave 80s',
  only: 'dark',
  roles: { accent: '#ff2fb5', danger: '#ff4d6d', success: '#2de2a6', warning: '#ffb347', pro: '#2de2e6' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#120427',
        'surface-1': '#1a0835',
        'surface-2': '#220b42',
        'surface-3': '#2a0f4f',
        'text-primary': '#f6ecff',
        'text-secondary': '#d6c4ee',
        'text-muted': '#b4a0d0',
      },
    },
  },
})

const synthwave: ThemeSetArgs = {
  colors: synthColors.theme,
  overrideColorScheme: 'dark',
  backdrop: { scene: 'retro-synthwave', glass: { blur: 10, tint: '#120427', opacity: 0.55 } },
  style: {
    Text: { color: '#f6ecff', fontSize: 15, lineHeight: 24 },
    Heading: { color: '#ffe45e', fontWeight: 'bold', letterSpacing: 1 },
    UserMessage: {
      backgroundColor: '#3a0c4ef2',
      color: '#ffe3f5',
      borderColor: '#ff2fb5',
      borderWidth: 2,
      radius: [16, 16, 4, 16],
      padding: 14,
      shadow: { x: 0, y: 0, blur: 16, color: '#ff2fb588' },
    },
    AssistantMessage: {
      backgroundColor: '#0d0221f0',
      color: '#dffcff',
      borderColor: '#2de2e6',
      borderWidth: 2,
      radius: [16, 16, 16, 4],
      padding: 14,
      shadow: { x: 0, y: 0, blur: 16, color: '#2de2e666' },
    },
    ToolUse: { color: '#dffcff', backgroundColor: '#0d0221e6', radius: 8, paddingX: 10, borderColor: '#7a3fbf', borderWidth: 1 },
  },
}

// ---------- 6. Windows 95 / Vaporwave (clair) ----------
const winColors = makeColors({
  label: 'Windows 95 Vaporwave',
  only: 'light',
  roles: { accent: '#000080', danger: '#c0102a', success: '#1e7b34', warning: '#9a6a00', pro: '#008080' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#d6d6dd',
        'surface-1': '#e0e0e6',
        'surface-2': '#ececf0',
        'surface-3': '#ececf0',
        'text-primary': '#000000',
        'text-secondary': '#1f1f2a',
        'text-muted': '#3a3a48',
      },
    },
  },
})

const windows95: ThemeSetArgs = {
  colors: winColors.theme,
  overrideColorScheme: 'light',
  backdrop: { scene: 'retro-windows95', glass: { blur: 6, tint: '#e0e0e6', opacity: 0.45 } },
  style: {
    Text: { color: '#000000', fontFamily: ['sans'], fontSize: 15, lineHeight: 23 },
    Heading: { color: '#000080', fontWeight: 'bold' },
    UserMessage: {
      backgroundColor: '#ffffe1',
      color: '#000000',
      borderColor: '#000000',
      borderWidth: 1,
      radius: 0,
      padding: 12,
      shadow: { x: 3, y: 3, blur: 0, color: '#00000066' },
    },
    AssistantMessage: {
      backgroundColor: '#ffffff',
      color: '#000000',
      borderColor: '#000080',
      borderWidth: 2,
      radius: 0,
      paddingX: 14,
      paddingY: 12,
      paddingTop: 34,
      fill: {
        vector: {
          viewBox: 64,
          slice: 30,
          paths: [
            { d: 'M0 0H64V64H0Z', color: '#000080' },
            { d: 'M2 26H62V62H2Z', color: '#ffffff' },
            { d: 'M48 6H58V20H48Z', color: '#c0c0c0' },
          ],
        },
      },
      shadow: { x: 3, y: 3, blur: 0, color: '#00000066' },
    },
    ToolUse: { color: '#000000', backgroundColor: '#c0c0c0', radius: 0, paddingX: 8, borderColor: '#404040', borderWidth: 2 },
  },
}

// ---------- 2. Terminal vert (sombre) ----------
const termColors = makeColors({
  label: 'Terminal vert',
  only: 'dark',
  codeTheme: { dark: 'monokai' },
  roles: { accent: '#39ff6a', danger: '#ff5f56', success: '#39ff6a', warning: '#ffb000', pro: '#7dffb0' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#020a04',
        'surface-1': '#06140a',
        'surface-2': '#0a1c0f',
        'surface-3': '#0e2414',
        'text-primary': '#9dffb5',
        'text-secondary': '#6fe08c',
        'text-muted': '#55b86e',
      },
    },
  },
})

const terminal: ThemeSetArgs = {
  colors: termColors.theme,
  overrideColorScheme: 'dark',
  backdrop: { scene: 'retro-terminal', glass: { blur: 4, tint: '#020a04', opacity: 0.6 } },
  style: {
    Text: { color: '#9dffb5', fontFamily: ['mono'], fontSize: 16, lineHeight: 25 },
    Heading: { color: '#ffb000', fontWeight: 'bold', letterSpacing: 1 },
    UserMessage: {
      backgroundColor: '#03120af0',
      color: '#c8ffd6',
      borderColor: '#39ff6a',
      borderWidth: 1,
      radius: 0,
      padding: 12,
    },
    AssistantMessage: {
      backgroundColor: '#020a04e6',
      color: '#9dffb5',
      radius: 0,
      padding: 12,
    },
    ToolUse: { color: '#ffb000', fontFamily: ['mono'], backgroundColor: '#020a04f0', radius: 0, paddingX: 8 },
  },
}

const noel: ThemeSetArgs = {
  ...foret,
  backdrop: { scene: 'retro-noel', glass: { blur: 12, tint: '#07121c', opacity: 0.55 } },
  style: {
    Heading: { color: '#ff6b78', fontWeight: 'bold' },
    UserMessage: {
      backgroundColor: '#3a1218f2',
      color: '#fff4f4',
      borderColor: '#c8323a',
      borderWidth: 1,
      radius: 10,
      padding: 12,
    },
    AssistantMessage: { backgroundColor: '#07121cd9', color: '#eef6f2', radius: 10, padding: 12 },
    ToolUse: { color: '#9fb5ad', backgroundColor: '#07121ce6', radius: 6, paddingX: 8 },
  },
}

const LOOKS: Record<LookName, { args: ThemeSetArgs; label: string; problems: string[] }> = {
  noel: { args: noel, label: 'Forêt de Noël', problems: foretColors.problems },
  foret: { args: foret, label: 'Forêt de nuit', problems: foretColors.problems },
  pixel: { args: pixel, label: 'Abysses pixel', problems: pixelColors.problems },
  synthwave: { args: synthwave, label: 'Synthwave 80s', problems: synthColors.problems },
  windows95: { args: windows95, label: 'Windows 95 / Vaporwave', problems: winColors.problems },
  terminal: { args: terminal, label: 'Terminal vert', problems: termColors.problems },
}

const ALIASES: Record<string, LookName> = {
  noel: 'noel', 'noël': 'noel', 'foret-noel': 'noel', neige: 'noel', christmas: 'noel',
  foret: 'foret', 'forêt': 'foret', forest: 'foret', nuit: 'foret',
  pixel: 'pixel', abysses: 'pixel', ocean: 'pixel', marine: 'pixel',
  '1': 'synthwave', synthwave: 'synthwave', synth: 'synthwave',
  '6': 'windows95', windows95: 'windows95', windows: 'windows95', win95: 'windows95', vaporwave: 'windows95', vapor: 'windows95',
  '2': 'terminal', terminal: 'terminal', vert: 'terminal', crt: 'terminal',
}

const SCENES: Record<string, string> = {
  'retro-foret': FORET,
  'retro-noel': FORET_NOEL,
  'retro-pixel': PIXEL_OCEAN,
  'retro-synthwave': SYNTHWAVE,
  'retro-windows95': VAPORWAVE,
  'retro-terminal': TERMINAL,
}

async function apply($: EngineInterface, name: LookName) {
  const look = LOOKS[name]
  const unpainted = look.problems.find(line => line.startsWith("Desktop won't paint"))
  if (unpainted !== undefined) $.ui.log(`${look.label}: ${unpainted}`)
  try {
    return await $.theme.set(look.args)
  } catch (error) {
    // Version de l'app qui ne prend pas `style` : on garde couleurs + decor.
    $.ui.log(String(error))
    const { style: _style, ...rest } = look.args
    return await $.theme.set(rest)
  }
}

async function saved($: EngineInterface): Promise<LookName> {
  const value = await $.store.get('look')
  return typeof value === 'string' && value in LOOKS ? (value as LookName) : 'foret'
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'retro',
      description: 'Changer le fond : foret, noel, pixel, synthwave, windows95 ou terminal',
    })
    const set = await apply($, await saved($))
    if (!set.isDrawn) $.ui.status(set.reason)
    return next(e)
  })

  on('command.run', { command: 'retro' }, async ($, e) => {
    const asked = e.args.trim().toLowerCase()
    let name: LookName
    if (asked === '') {
      // Sans argument : passe au thème suivant.
      const order: LookName[] = ['foret', 'noel', 'pixel', 'synthwave', 'windows95', 'terminal']
      name = order[(order.indexOf(await saved($)) + 1) % order.length] ?? 'synthwave'
    } else if (ALIASES[asked] !== undefined) {
      name = ALIASES[asked] ?? 'synthwave'
    } else {
      return { text: 'Thème inconnu. Essaie : /retro foret, /retro noel, /retro pixel, /retro synthwave, /retro windows95 ou /retro terminal' }
    }
    await $.store.set('look', name)
    const set = await apply($, name)
    const note = set.isDrawn ? '' : ` (pas affiché ici : ${set.reason})`
    return { text: `Thème « ${LOOKS[name].label} » activé${note}.` }
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    const scene = e.props.scene
    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || scene === undefined || SCENES[scene] === undefined) {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)
    const alt =
      scene === 'retro-noel'
        ? 'Forêt de sapins enneigés la nuit, avec neige qui tombe et sapins décorés de lumières'
        : scene === 'retro-foret'
        ? 'Forêt de sapins la nuit avec aurores boréales, lune et lucioles'
        : scene === 'retro-pixel'
        ? 'Fond bleu marine avec une méduse et un cristal en pixel art qui flottent'
        : scene === 'retro-synthwave'
        ? 'Coucher de soleil néon avec grille rose qui défile et palmiers'
        : scene === 'retro-windows95'
          ? 'Ciel pastel, plancher en damier, colonnes grecques et dauphin, style Windows 95'
          : 'Vieil écran cathodique vert avec lignes de balayage'
    return <Svg source={SCENES[scene]} alt={alt} isInteractive />
  })
}
