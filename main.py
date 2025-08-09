
#!/usr/bin/env python3
"""
Universal Code Generator - Python Server
Serves the web interface and handles API requests
"""
import http.server
import socketserver
import os
import threading
import time

class CodeGeneratorHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='.', **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        if self.path == '/' or self.path == '':
            self.path = '/index.html'
        return super().do_GET()

def run_server(port=5000):
    try:
        with socketserver.TCPServer(("0.0.0.0", port), CodeGeneratorHandler) as httpd:
            print(f"🚀 Universal Code Generator starting...")
            print(f"🌐 Server running on http://0.0.0.0:{port}")
            print(f"📝 Ready to generate code in 900+ programming languages!")
            print(f"⭐ Features:")
            print(f"   - Multi-language code generation")
            print(f"   - Language combination support") 
            print(f"   - Live executable code")
            print(f"   - Web scraping, games, APIs, and more!")
            print(f"\n✨ Server is running... Press Ctrl+C to stop")
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print(f"\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        print("💡 Trying alternative port...")
        try:
            port = 8000
            with socketserver.TCPServer(("0.0.0.0", port), CodeGeneratorHandler) as httpd:
                print(f"🌐 Server running on http://0.0.0.0:{port}")
                httpd.serve_forever()
        except Exception as e2:
            print(f"❌ Failed to start on port {port}: {e2}")

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    run_server(port)
