# Version 4.0 — preserved DOM and JavaScript contract

Baseline: current build 3.0.163. Only index.html and styles.css are redesigned. All other copied app files remain byte-for-byte identical.

## Every existing DOM ID

| Element | ID |
|---|---|
| `section` | `welcome-splash-v2` |
| `h1` | `tuning-title` |
| `button` | `tuning-enter` |
| `time` | `clock` |
| `button` | `install-app` |
| `button` | `settings-open` |
| `span` | `mode-label` |
| `div` | `outer-panel-clock` |
| `span` | `radio-clock-day` |
| `strong` | `radio-clock-time` |
| `small` | `radio-clock-meridiem` |
| `time` | `radio-clock-date` |
| `section` | `radio-screen` |
| `button` | `radio-star` |
| `select` | `radio-country` |
| `div` | `radio-art` |
| `div` | `radio-station-strip` |
| `div` | `radio-news-track` |
| `div` | `equalizer` |
| `audio` | `radio-audio` |
| `input` | `radio-bass` |
| `output` | `radio-bass-value` |
| `button` | `radio-prev` |
| `div` | `radio-volume-dial` |
| `button` | `radio-play` |
| `input` | `radio-volume-knob` |
| `output` | `radio-volume-knob-value` |
| `button` | `radio-next` |
| `input` | `radio-treble` |
| `output` | `radio-treble-value` |
| `p` | `tone-status` |
| `label` | `radio-volume-track` |
| `input` | `radio-volume` |
| `b` | `volume-number` |
| `div` | `radio-status` |
| `section` | `tv-screen` |
| `button` | `tv-star` |
| `select` | `tv-country` |
| `button` | `tv-prev-name` |
| `b` | `tv-prev-name-text` |
| `h1` | `tv-title` |
| `p` | `tv-subtitle` |
| `button` | `tv-next-name` |
| `b` | `tv-next-name-text` |
| `div` | `tv-fullscreen-shell` |
| `article` | `tv-display` |
| `b` | `fullscreen-channel-name` |
| `span` | `fullscreen-channel-country` |
| `video` | `tv-video` |
| `div` | `tv-placeholder` |
| `div` | `tv-rail` |
| `button` | `tv-prev` |
| `button` | `tv-toggle` |
| `button` | `tv-next` |
| `select` | `remote-channel-select` |
| `output` | `tv-volume-number` |
| `output` | `tv-channel-number` |
| `button` | `remote-main-play` |
| `button` | `remote-favorite` |
| `div` | `remote-presets` |
| `section` | `presets-screen` |
| `div` | `preset-priority-control` |
| `small` | `preset-selection-label` |
| `b` | `preset-radio-count` |
| `b` | `preset-tv-count` |
| `div` | `preset-grid` |
| `p` | `preset-footnote` |
| `button` | `clear-recent` |
| `section` | `explore-screen` |
| `b` | `explore-radio-count` |
| `b` | `explore-tv-count` |
| `input` | `explore-search` |
| `select` | `explore-language` |
| `select` | `explore-country` |
| `select` | `explore-genre` |
| `select` | `explore-sort` |
| `div` | `online-search-row` |
| `button` | `discover-online` |
| `span` | `discovery-status` |
| `p` | `browser-summary` |
| `div` | `explore-results` |
| `dialog` | `settings-dialog` |
| `input` | `legacy-theme-enabled` |
| `input` | `theme-switch-enabled` |
| `select` | `theme-choice` |
| `select` | `visualizer-choice` |
| `button` | `export-curated-presets` |
| `button` | `hide-radio-channel` |
| `button` | `hide-tv-channel` |
| `button` | `restore-hidden-channels` |
| `input` | `remote-track-enabled` |
| `div` | `toast` |

## Every existing data attribute hook

| Element | Attribute | Value |
|---|---|---|
| `button` | `data-mode-screen` | `radio-screen` |
| `button` | `data-mode-screen` | `tv-screen` |
| `input` | `data-tone` | `bass` |
| `input` | `data-tone` | `treble` |
| `button` | `data-radio-volume-action` | `mute` |
| `button` | `data-radio-volume-action` | `up` |
| `button` | `data-fullscreen-action` | `zoom` |
| `button` | `data-fullscreen-action` | `normal` |
| `button` | `data-fullscreen-action` | `home` |
| `button` | `data-fullscreen-action` | `previous` |
| `button` | `data-fullscreen-action` | `play` |
| `button` | `data-fullscreen-action` | `next` |
| `button` | `data-fullscreen-action` | `vol-down` |
| `button` | `data-fullscreen-action` | `vol-up` |
| `button` | `data-fullscreen-action` | `mute` |
| `button` | `data-remote` | `power` |
| `button` | `data-remote` | `vol-up` |
| `button` | `data-remote` | `vol-down` |
| `button` | `data-remote` | `vol-up` |
| `button` | `data-remote` | `channel-down` |
| `button` | `data-remote` | `play-pause` |
| `button` | `data-remote` | `channel-up` |
| `button` | `data-remote` | `vol-down` |
| `button` | `data-remote` | `channel-up` |
| `button` | `data-remote` | `channel-down` |
| `button` | `data-remote` | `mute` |
| `button` | `data-remote` | `favorite` |
| `button` | `data-remote` | `fullscreen` |
| `button` | `data-preset-mode` | `radio` |
| `button` | `data-preset-mode` | `tv` |
| `button` | `data-preset-mode` | `recent` |
| `button` | `data-browser-source` | `library` |
| `button` | `data-browser-source` | `online` |
| `button` | `data-browser-kind` | `radio` |
| `button` | `data-browser-kind` | `tv` |
| `button` | `data-screen` | `radio-screen` |
| `button` | `data-screen` | `tv-screen` |
| `button` | `data-screen` | `presets-screen` |
| `button` | `data-screen` | `explore-screen` |

## Class and structural contracts

- `.screen.active`, `.nav-item`, `.mode-tab`, `.selected`, `.playing`, `.saved`, `.muted` remain usable by the existing scripts.
- `.tone-control`, `.tone-dial`, `.tone-face`, `.tone-input`, `.volume-dial`, `.volume-knob-face`, and their CSS angle variables remain intact.
- Radio station cards, TV cards, numbered remote presets, saved presets and Explore results retain all dynamically generated classes and data hooks.
- `.tv-picture` can move into `.tv-video-card`; `#tv-fullscreen-shell` can move to document.body and return.
- `.cinema-mode`, `.landscape-fallback`, `.is-playing`, `.is-muted`, `.tv-zoomed`, fullscreen controls and viewport variables remain supported.
- All existing buttons, selects, inputs, audio/video nodes, form semantics, script order and source files are preserved.
- Existing theme/legacy selectors, onboarding, splash `.leaving`, `.tuning-returning`, news ticker, drag/drop classes and hidden attributes remain supported.

## Deliberate compatibility limits

The existing recovery timer is 10 seconds, not the 8 seconds mentioned in the design prompt. A small inline adapter mirrors station names, channel numbers, volume and media events. Its segmented buffering animation uses the existing 10-second window and does not control recovery. Five functional filter shortcuts open the existing filtered Explore library. Arrow keys navigate the preset matrix. Fullscreen OSD fades after four seconds and returns on hover/focus. TV tone trim faces are decorative and labelled RADIO ONLY; no new TV audio processing is introduced. Existing HLS and onboarding integrations are retained; this redesign adds no dependencies.


## Final validation

- All 92 original static IDs and 77 original interactive/media/form elements preserved, with their original tag types and hooked attributes.
- All original data and name hooks preserved (39 data attributes; 47 combined data/name hooks).
- All 138 project files copied. Every copied file except index.html and styles.css is byte-identical to its original.
- HTML tag balance passes; the inline adapter passes node --check.
- The replacement CSS has no imports or external asset URLs. Existing HLS and third-party playback integration scripts are retained.
- Desktop/mobile breakpoint rules and fullscreen reparenting selectors are implemented, but visual accuracy and hardware playback remain unverified: both browser preview access attempts timed out.
- Test server stopped after checks. Original application files were not edited.
