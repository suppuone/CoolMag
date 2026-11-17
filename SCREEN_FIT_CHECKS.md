# Version 4.0.2 — screen-fitting console

Implemented in index.html and styles.css only. Original application folder and copied playback/data/service-worker files remain untouched.

## Layout

- Wide screens: bounded 1.79:1 chassis, 1.08:1 monitor/receiver columns, all 50 keys.
- Portrait phones/tablets: CRT above VFD, rotary deck and a ten-preset bank. Five labelled banks retain access to all 50 keys.
- Small landscape phones also use bank selection.
- Viewport grid tracks use min-height:0; the listening console has no page/horizontal scroll.
- Secondary station options, fine volume and original TV remote controls remain in an overlay drawer.
- Existing library/settings remain accessible. Their long lists/dialogs can scroll independently.

## Verification

- All 92 original static IDs preserved.
- All 77 original controls, form and audio/video elements preserved with original tag types and hook attributes.
- All existing name/data hooks preserved.
- All eight protected playback/data/cache sources byte-identical to the originals.
- HTML nesting and CSS brace checks passed; stylesheet has no external imports/assets.
- Inline adapter syntax and bank paging checked separately.

## Limits

Actual browser rendering could not be verified: the installed headless browser exits before rendering in this environment. Pixel accuracy, stream playback and physical-phone interaction are not claimed as tested. Existing stream recovery remains ten seconds. Tone processing remains radio-only.


## UI 4.0.4 update

- Fixed top Radio/TV label alignment and the rocker/mute label wrapping.
- Enlarged desktop station/VFD/navigation/control typography.
- Language/genre filters now operate in the current console, with AND combination across language and genre. Tapping an active filter clears it.
- Matching keys are sorted alphabetically and presented six per page, with sequence numbers and station names. Pagination preserves original station button objects/listeners/data indices.
- Unknown language metadata is not guessed. Declared language takes priority over old preset labels.
- Tested matching, combined filters, empty results, six-item pagination, reset and stale-metadata precedence against the catalogue. All original playback files remain unchanged.
- Visual browser testing remains unavailable in this environment.


## UI 4.0.5 — automatic radio artwork

COOL stations take precedence and display a cassette, music stations display a rotating LP, and FM/public/live stations display a transmission mast. Name and existing logo appear on each model. Classification uses saved station identity/genre metadata; unknown types use the tower. The LP disc rotates below a legible centre label, cassette reels turn, and tower waves pulse. Animations pause with playback/buffering and page visibility, and respect reduced motion. No stream, audio-processing or recovery logic changed. Sixteen classification cases and inline syntax passed; protected file comparisons and original DOM-hook checks passed. Browser rendering remains unverified.


## UI 4.0.6 — visualizer default and LP cueing

The visualizer is switched Off once before app initialization for this edition; later changes remain remembered. A storage-blocked fallback updates the existing Settings control after initialization. For LP artwork, the pickup moves from its rest position onto the grooves; after 850ms the disc, station logo and printed label revolve together. Pause/buffering returns the arm and stops the rotation. Hidden pages pause the artwork, and reduced-motion preferences disable rotation. The animation timer has no media playback or station-changing actions. Default migration and cueing-state checks passed; all protected engine/data files remain byte-identical. Visual rendering remains unverified.


## UI 4.0.8 — cassette and tower motion correction

Extended the LP CSS motion correction to cassette spools and tower waves. Each animation explicitly wins over the earlier generic reduced-motion cancellation, retaining playback-controlled pause/resume. Staggered wave delays are explicitly restored after the animation shorthand so three wave fronts remain separated. Added a visible rotating dot to each reel and an antenna beacon pulse. Scoped animation precedence, wave delay, CSS balance and protected-source comparisons passed; inline JavaScript syntax passes. Actual browser rendering remains unverified.


## UI 4.0.9 — red/green VFD signal tracks

Added two horizontal dashed tracks in the existing Radio and TV station-information meter space. Their varying lengths/brightness follow actual playback state and stop/dim on pause, buffering, error and hidden pages. This is a decorative playback indicator, not measured sound amplitude, and does not create an audio analyser or enable the main visualizer. CSS overrides old global motion cancellation for these explicitly requested indicators. All protected sources remain unchanged. Inline syntax, track counts, CSS brace and playback-state checks performed. Browser visual verification remains unavailable.


## UI 4.0.10 — cassette opening and playback head

Cassette shell is masked with a genuine transparent reel-bay cutout; the printed label ends above it. Spoke openings and a thin tape path remain visible. A separate chrome playback-head carriage rises from below into the exposed bottom tape slot while playing and retracts on pause/buffering. Reels begin after the 550ms engagement motion; LP pickup timing remains 850ms. Constant markup nesting, required model parts, CSS mask/brace checks and protected-source comparisons pass. Presentation state tests verify both cue delays and pause cancellation. Visual browser verification remains pending.


## UI 4.0.12 — station tuner

Radio launch volume is set to 25% through the original volume input/setter. Existing Options drawers move to the monitor bottom-left. The radio's lower-right named-card grid is hidden and replaced by a large station tuning dial; the same filtered station buttons remain intact behind the presentation. The upper-right VFD gains a station ribbon that translates behind a fixed red centre needle. Dial drag previews continuously; release, deliberate key/wheel input or explicit station-card selection commits through the original button handler. Filtering, rerendering and resizing never select a station. Existing language/genre keys remain and filter the tuner ribbon in place. TV channel selection is unchanged.

Checks: tuner clamping, centre position, preview-versus-commit behavior, no duplicate active-station restart, empty filter results, original DOM IDs/hook attributes, 25% values and eight protected source-file comparisons passed. Inline syntax and CSS brace checks pass. Browser visual verification remains unavailable.


## UI 4.0.13
- Enlarged fixed-needle tuning windows; matching independent Radio and TV tuner controllers.
- Removed duplicate VFD name/status presentation and dashed animation from view; retained original hooks.
- Mobile monitor gains 50–60px from a smaller control rack; genre keys retained.
- Original ID/tag and data/name hook checks, protected engine byte comparison, CSS brace checks and inline JS syntax passed. Browser rendering not verified.


## UI 4.0.14
- Enlarged both tuning dials within the same shared rack layout.
- TV-only numbered 12-position bank scale and raised selector grip; drag previews snap to whole-channel detents, release selects. Radio preview remains continuous.
- Preserved original IDs and data/name hooks; protected engine files byte-identical; CSS brace and inline JS syntax checks passed. Browser appearance not verified.


## UI 4.0.90 — lazy curated genre catalogue
Removed Trinitron wording. Added 29 radio / 24 TV curated session-only genre entries, shared click-only loader with retry, request-generation protection, language/genre metadata and regional priority. Default presets are not overwritten. Tests: loader deduplication and zero eager loads; default-list restoration; language/genre combinations and Nepali coverage; original IDs/data hooks retained; JS syntax and catalogue validation. No live stream playback verified. See GENRE_CATALOGUE.md.

## UI 4.0.91 - independent genre selection
Replaced AIR-heavy radio catalogue with 26 services, including eleven researched additions. Four AIR services retained: Gangtok, Kurseong, FM Gold Chennai and Vividh Bharati. Independent music/news selections rank first. Default presets remain separate; catalogue still loads only after filter click. Node syntax checks, filter combinations/default restoration and lazy-load reuse checks passed. All catalogue stream addresses HTTPS; six protected engine files unchanged. Live stream playback and regional availability not verified in this environment. Details and source links: GENRE_CATALOGUE.md.
