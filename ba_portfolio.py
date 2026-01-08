#!/usr/bin/env python3
"""
Simple HTTP server for previewing the architecture portfolio website locally.
Run this script to start a local web server and view your portfolio.
"""

import http.server
import socketserver
import webbrowser
import os
from pathlib import Path

PORT = 8000

def start_server():
    """Start a simple HTTP server to preview the portfolio website."""
    
    # Change to the script's directory
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    Handler = http.server.SimpleHTTPRequestHandler
    
    # Custom handler to set proper MIME types
    Handler.extensions_map.update({
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.pdf': 'application/pdf',
    })
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            url = f"http://localhost:{PORT}"
            print("=" * 60)
            print("🏛️  Architecture Portfolio Server")
            print("=" * 60)
            print(f"\n✓ Server running at: {url}")
            print(f"✓ Serving from: {script_dir}")
            print("\n📝 Press Ctrl+C to stop the server\n")
            print("=" * 60)
            
            # Open browser automatically
            webbrowser.open(url)
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped. Goodbye!")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"\n❌ Error: Port {PORT} is already in use.")
            print(f"   Try closing other applications or use a different port.\n")
        else:
            print(f"\n❌ Error: {e}\n")

if __name__ == "__main__":
    start_server()

