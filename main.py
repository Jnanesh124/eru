
#!/usr/bin/env python3
"""
Universal Code Generator - Python Server
Serves the web interface and handles API requests
"""
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import sys

class CodeGeneratorHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def run_server(port=5000):
    server_address = ('0.0.0.0', port)
    httpd = HTTPServer(server_address, CodeGeneratorHandler)
    
    print(f"🚀 Universal Code Generator starting...")
    print(f"🌐 Server running on http://0.0.0.0:{port}")
    print(f"🔗 Access your app at: http://localhost:{port}")
    print(f"📝 Ready to generate code in 900+ programming languages!")
    print(f"⭐ Features:")
    print(f"   - Multi-language code generation")
    print(f"   - Language combination support") 
    print(f"   - Live executable code")
    print(f"   - Web scraping, games, APIs, and more!")
    print(f"\n✨ Press Ctrl+C to stop the server")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print(f"\n🛑 Server stopped by user")
        httpd.server_close()

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    run_server(port)
