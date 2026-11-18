# Version 4.0 — preserved DOM and JavaScript contract

## Tactile deck verification

The original ID inventory below still applies. The following IDs were added after that inventory and are now part of the same contract.

| Area | Preserved IDs and hooks | Check |
|---|---|---|
| Radio playback and favourites | `radio-audio`, `radio-play`, `radio-prev`, `radio-next`, `radio-star`, `radio-station-strip` | Play, pause, tune and save. The bezel star is the original button. The legacy bezel arrows remain bound. |
| TV playback and favourites | `tv-video`, `tv-toggle`, `tv-prev`, `tv-next`, `tv-star`, `remote-presets`, `tv-fullscreen-shell`, `data-remote`, `data-fullscreen-action` | Change channels, save, enter fullscreen and return. The bezel star is the original button. |
| Radio tuning | `station-tuner-dial`, `station-tuner-input`, `station-tuner-label`, `radio-tuning-window`, `radio-tuning-track`, `data-tuner-step`, generated `data-tuner-index` | Try tap, wheel, keyboard, strip drag and fast flick. Each final detent delegates to the original station button once. |
| TV tuning | `tv-station-tuner-dial`, `tv-station-tuner-input`, `tv-station-tuner-label`, `tv-tuning-window`, `tv-tuning-track`, `data-tuner-step` | Repeat the Radio checks on TV. A cancelled gesture or mode change should not tune a channel. |
| Volume and tone | `radio-volume`, `radio-volume-knob`, `radio-volume-dial`, `v4-tv-volume`, `v4-tv-volume-dial`, `v4-tv-volume-value`, `v4-master-tone`, `v4-tone-dial`, `v4-tone-value`, `data-console-mute` | Adjust and mute each mode. Foley has a separate output gain. |
| Filtering, mode and presets | `data-console-filter`, `data-console-mode`, `data-console-power`, `data-console-info`, `data-console-hide`, `data-memory-kind`, `data-memory-bank`, `data-memory-step`, `data-player-nav`, `data-screen` | Press every steel category key and switch with the orange rocker. Open Presets and Explore, then use TUNER to return to the last player. |
| Readout and clock | `v4-radio-air`, `v4-radio-number`, `v4-radio-station`, `v4-tv-air`, `v4-tv-number`, `v4-tv-station`, `v4-osd-channel`, `epaper-calendar`, `epaper-date`, `epaper-moon-light`, `epaper-phase`, `radio-news-track` | Check live status, local time, ticker margins and counter at phone sizes. The bars reflect playback lock. |

New hooks to verify

- `RetroHardware.SoundFX` provides detent, thunk, tuning-static and lock-fade effects. Disable Mechanical sounds in Settings and verify that programme audio and volume still work.
- `RetroHardware.createFlywheel` previews motion and settles through the tuner’s existing commit path. Try a fast flick, interrupt it with a second gesture, and repeat with reduced motion enabled.
- `retro-mode-changing` triggers the CRT animation without delaying the original mode and playback callbacks. The existing media state drives the glow and the signal indicators.
- `data-sleep-open` opens the shared local countdown for both players. The settings checkbox is `hardware-sound-enabled`, and the timer uses `cabinet-sleep-dialog` and `cabinet-sleep-title`. On expiry, `retro-sleep-expired` calls the original stop handlers. The Off option clears the countdown.

### Artwork and console checks

- Open Radio favourites, TV favourites and Recent in Presets. Open My Library and Discover Online in Explore. Check for a 38 px logo badge on every result and a gold monogram on a station with missing or broken artwork. Try a favourite, an Explore result and a preset reorder to confirm that the original card actions still work.
- Tab through each console. The bezel transport cluster and tuner arrows remain available. The old bezel skip buttons, top modes and legacy navigation buttons stay out of the tab sequence. Their existing selectors and programmatic click handlers remain available.
- Press a category key, MUTE or the mode rocker. The new `SoundFX.clack()` hook plays on press, with a keyboard fallback. Toggle Mechanical sounds in Settings and check that the stream continues independently.
- Flick the dial and strip in both modes. The original detent preview and final commit handle the station change. Check the CRT beam, clock and three telemetry states, including a buffering stream. With reduced motion on, the original mode switch still works.

## Historical 4.0 baseline

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
