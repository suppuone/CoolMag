from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import threading
import webbrowser

APP_DIR = Path(__file__).resolve().parent

class FreshFilesHandler(SimpleHTTPRequestHandler):
    """Local tests always load current files, including after edits."""
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_GET(self):
        # Ignore conditional browser requests so changed sources return in full.
        for header in ("If-Modified-Since", "If-None-Match"):
            if header in self.headers:
                del self.headers[header]
        super().do_GET()

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=0)
    parser.add_argument("--bind", default="127.0.0.1")
    parser.add_argument("--no-browser", action="store_true")
    args = parser.parse_args()
    handler = partial(FreshFilesHandler, directory=str(APP_DIR))
    server = ThreadingHTTPServer((args.bind, args.port), handler)
    server.daemon_threads = True
    port = server.server_address[1]
    url = f"http://127.0.0.1:{port}/?local-build=3.0.162"
    print(f"RetroRadtv build 3.0.162 is running at {url}", flush=True)
    print(f"Serving folder: {APP_DIR}", flush=True)
    print("Keep this window open. Press Ctrl+C to stop.", flush=True)
    if not args.no_browser:
        threading.Timer(0.7, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("Local server stopped.")
    finally:
        server.server_close()
