# RetroRADtv Version 3

Based on GitHub backup RatroRADtv_ver-2.0_GitHub_2026-11-07_11-12-29_IST, commit fa631feebbb0cd7ccabb15ab4290cb35fb5a3789.

Radio and TV each support 50 saved presets. The limits apply to initial loading, adding favorites, preset pages, carousels and remote quick presets. Recent history and online search results are not saved presets and retain their separate limits. Previous saved selections are imported into separate v3 preset storage; overflow is preserved in browser storage before limiting to 50.

Admin HTML, scripts, seven-tap activation and admin link are removed from this distribution. The bundled Radio and TV lists and their preset order are defined only in preset-defaults.js. It contains the 38 Radio and 44 TV presets exported from the browser on 19 November 2026.

Upload the contents of this folder, including data. If replacing an existing deployed app, also delete old admin.html, admin.js and admin-entry.js from the repository: uploading new files alone does not remove old files. No desktop OAuth app is required.

JavaScript syntax and source assertions passed. Browser/device playback verification remains required. Version 2 and its backup are unchanged.


## Stream recovery and GitHub Pages

Upload this folder to a GitHub Pages repository and select the repository branch
and root folder in Pages settings. No build command or package installation is needed.
Keep the assets folder and supporting scripts with the entry files.

- `index.html`: player interface and accessible hide/restore buttons in Settings.
- `123index.html`: optional compact Lite receiver. Use the **Lite version** link in the
  full player to open it in the same tab; use **Full version** or browser Back to return.
- `styles.css`: canonical stylesheet; `style.css` is an older-link compatibility shim.
- `app.js`: station selection, player adapters, discovery and local preferences.
- preset-defaults.js is the single bundled default list for direct file opening and web hosting. Genre filters use the saved presets.
- `stream-recovery.js`: shared, commented eight-second native audio/video watchdog.

Connecting, errors, stalls and buffering receive an eight-second deadline. Successful
playback cancels it; failures advance through the current preset/country list once.
When every candidate fails, playback stops rather than looping forever. Autoplay
permission failures and offline devices do not mark stations dead. Settings offers
Hide current radio, Hide current TV and Restore hidden. Hiding is device-local and
never deletes catalogue entries. Automatic failures do not permanently hide stations.
Embedded YouTube retains its separate Retry/Skip interface.

Verification: JavaScript syntax checks and simulated timer/event checks cover bounded
skipping, stalled recovery, playback cancellation, autoplay blocking, pause, offline
and stop. Live stream availability depends on the broadcaster and network.
