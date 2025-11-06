from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/hello':
            message = "Hello from Python backend on Vercel!"
        else:
            message = f"Path not found: {self.path}"

        self.send_response(200)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(message.encode())
