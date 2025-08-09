
class CodeGenerator {
    constructor() {
        this.languages = [
            'javascript', 'python', 'java', 'cpp', 'csharp', 'go', 'rust', 'typescript',
            'php', 'ruby', 'swift', 'kotlin', 'dart', 'scala', 'haskell', 'clojure',
            'elixir', 'erlang', 'fsharp', 'ocaml', 'perl', 'lua', 'r', 'matlab',
            'julia', 'groovy', 'cobol', 'fortran', 'pascal', 'delphi', 'vbnet',
            'assembly', 'c', 'objective-c', 'shell', 'bash', 'powershell', 'sql',
            'html', 'css', 'xml', 'json', 'yaml', 'toml', 'ini', 'dockerfile',
            'makefile', 'cmake', 'gradle', 'maven', 'npm', 'yarn', 'pip',
            'solidity', 'vyper', 'move', 'cairo', 'clarity', 'scilla',
            'racket', 'scheme', 'lisp', 'prolog', 'mercury', 'curry',
            'agda', 'coq', 'lean', 'isabelle', 'idris', 'purescript',
            'elm', 'reason', 'rescript', 'nim', 'crystal', 'zig', 'vlang',
            'odin', 'carbon', 'mojo', 'gleam', 'grain', 'roc', 'unison',
            'ada', 'modula', 'oberon', 'eiffel', 'smalltalk', 'forth',
            'factor', 'joy', 'concatenative', 'stack', 'postscript',
            'tcl', 'tk', 'expect', 'awk', 'sed', 'grep', 'regex',
            'verilog', 'vhdl', 'systemverilog', 'chisel', 'bluespec',
            'apl', 'j', 'k', 'q', 'kdb', 'numpy', 'pandas', 'scipy'
        ];
        
        this.initializeEventListeners();
        this.addWelcomeMessage();
    }

    initializeEventListeners() {
        const sendBtn = document.getElementById('sendBtn');
        const userInput = document.getElementById('userInput');
        
        sendBtn.addEventListener('click', () => this.handleSend());
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });
    }

    addWelcomeMessage() {
        const welcomeText = `Welcome to Universal Code Generator! 🚀

I can help you create code in any programming language or combination of languages. Just describe what you want, and I'll generate comprehensive solutions.

Examples:
• "Create a web scraper in Python and JavaScript"
• "Build a REST API using multiple languages"
• "Create a game engine with C++, Lua scripting, and Python tools"
• "Design a full-stack application with React, Node.js, and Python backend"

Available languages: ${this.languages.slice(0, 20).join(', ')} and 880+ more!`;

        this.addMessage(welcomeText, 'assistant');
    }

    async handleSend() {
        const userInput = document.getElementById('userInput');
        const sendBtn = document.getElementById('sendBtn');
        const query = userInput.value.trim();
        
        if (!query) return;

        // Disable input while processing
        sendBtn.disabled = true;
        userInput.disabled = true;

        // Add user message
        this.addMessage(query, 'user');
        
        // Clear input
        userInput.value = '';

        // Show loading
        const loadingMessage = this.addMessage('Generating your code...', 'assistant', true);

        try {
            // Get selected languages
            const primaryLangs = Array.from(document.getElementById('primaryLang').selectedOptions)
                .map(option => option.value);
            const additionalLangs = document.getElementById('additionalLangs').value
                .split(',').map(lang => lang.trim()).filter(lang => lang);
            const combineLangs = document.getElementById('combineLangs').checked;
            const liveCode = document.getElementById('liveCode').checked;

            // Generate response
            const response = await this.generateCode(query, primaryLangs, additionalLangs, combineLangs, liveCode);
            
            // Remove loading message
            loadingMessage.remove();
            
            // Add response
            this.addMessage(response, 'assistant');
            
        } catch (error) {
            loadingMessage.remove();
            this.addMessage('Sorry, there was an error generating your code. Please try again.', 'assistant');
        }

        // Re-enable input
        sendBtn.disabled = false;
        userInput.disabled = false;
        userInput.focus();
    }

    async generateCode(query, primaryLangs, additionalLangs, combineLangs, liveCode) {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        const allLangs = [...primaryLangs, ...additionalLangs].filter(lang => lang);
        const selectedLangs = allLangs.length > 0 ? allLangs : ['python', 'javascript'];

        let response = `Here's your solution`;
        
        if (combineLangs && selectedLangs.length > 1) {
            response += ` combining ${selectedLangs.join(', ')}`;
        }
        
        response += `:\n\n`;

        // Generate code for each language
        for (const lang of selectedLangs) {
            const code = this.generateCodeForLanguage(query, lang, liveCode);
            response += `## ${this.getLanguageName(lang)}\n\n`;
            response += `\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
        }

        // Add integration example if combining languages
        if (combineLangs && selectedLangs.length > 1) {
            response += `## Integration Example\n\n`;
            response += this.generateIntegrationCode(query, selectedLangs);
        }

        // Add execution instructions
        if (liveCode) {
            response += `## How to Run\n\n`;
            response += this.generateExecutionInstructions(selectedLangs);
        }

        return response;
    }

    generateCodeForLanguage(query, language, liveCode) {
        const templates = this.getCodeTemplates();
        const template = templates[language] || templates['python'];
        
        // Customize based on query
        let code = template.base;
        
        if (query.toLowerCase().includes('game')) {
            code = template.game || code;
        } else if (query.toLowerCase().includes('web') || query.toLowerCase().includes('api')) {
            code = template.web || code;
        } else if (query.toLowerCase().includes('data') || query.toLowerCase().includes('analyze')) {
            code = template.data || code;
        }
        
        return code;
    }

    generateIntegrationCode(query, languages) {
        const integrationExamples = {
            'python_javascript': `# Python backend (app.py)
from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

@app.route('/api/process')
def process_data():
    # Run JavaScript processing
    result = subprocess.run(['node', 'processor.js'], capture_output=True, text=True)
    return jsonify({'result': result.stdout})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

// JavaScript processor (processor.js)
const processData = (data) => {
    // Processing logic here
    return { processed: true, data: data };
};

console.log(JSON.stringify(processData('sample data')));`,
            
            'cpp_python': `// C++ performance module (processor.cpp)
#include <Python.h>
#include <iostream>

extern "C" {
    int fast_computation(int n) {
        // High-performance computation
        int result = 0;
        for(int i = 0; i < n; i++) {
            result += i * i;
        }
        return result;
    }
}

# Python interface (main.py)
import ctypes
import os

# Load C++ library
lib = ctypes.CDLL('./processor.so')
lib.fast_computation.argtypes = [ctypes.c_int]
lib.fast_computation.restype = ctypes.c_int

def compute(n):
    return lib.fast_computation(n)

print(f"Result: {compute(1000000)}")`,
            
            default: `# Multi-language integration example
# This shows how different languages can work together
# in a microservices or modular architecture.

# Each language handles what it does best:
# - Python: Data processing, AI/ML
# - JavaScript: Web interfaces, real-time features  
# - Go: High-performance services
# - Rust: System-level operations
# - Java: Enterprise applications`
        };
        
        const key = languages.slice(0, 2).sort().join('_');
        return integrationExamples[key] || integrationExamples.default;
    }

    generateExecutionInstructions(languages) {
        const instructions = languages.map(lang => {
            const commands = {
                'python': 'python3 main.py',
                'javascript': 'node main.js',
                'typescript': 'tsc main.ts && node main.js',
                'java': 'javac Main.java && java Main',
                'cpp': 'g++ -o main main.cpp && ./main',
                'go': 'go run main.go',
                'rust': 'cargo run',
                'php': 'php main.php',
                'ruby': 'ruby main.rb',
                'csharp': 'dotnet run'
            };
            return `**${this.getLanguageName(lang)}**: \`${commands[lang] || `# Run ${lang} code`}\``;
        }).join('\n');
        
        return instructions + `\n\n**Note**: Make sure you have the required runtimes installed for each language.`;
    }

    getCodeTemplates() {
        return {
            python: {
                base: `#!/usr/bin/env python3
"""
Universal Python Solution
"""
import os
import sys
import json
from typing import Any, Dict, List

class UniversalProcessor:
    def __init__(self):
        self.config = self.load_config()
    
    def load_config(self) -> Dict[str, Any]:
        """Load configuration"""
        return {
            'version': '1.0.0',
            'debug': True
        }
    
    def process(self, data: Any) -> Any:
        """Main processing function"""
        print(f"Processing data: {data}")
        
        # Your custom logic here
        result = {
            'input': data,
            'processed': True,
            'timestamp': __import__('time').time()
        }
        
        return result
    
    def run(self):
        """Main execution"""
        sample_data = "Hello from Python!"
        result = self.process(sample_data)
        print(json.dumps(result, indent=2))

if __name__ == "__main__":
    processor = UniversalProcessor()
    processor.run()`,
                
                web: `#!/usr/bin/env python3
"""
Python Web Application
"""
from flask import Flask, request, jsonify, render_template_string
import json
import os

app = Flask(__name__)

# HTML template
HTML_TEMPLATE = '''
<!DOCTYPE html>
<html>
<head>
    <title>Python Web App</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
        button { padding: 10px 20px; background: #007bff; color: white; border: none; cursor: pointer; }
        input { padding: 10px; margin: 5px; width: 300px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Python Web Application</h1>
        <input type="text" id="input" placeholder="Enter your data">
        <button onclick="processData()">Process</button>
        <div id="result"></div>
    </div>
    <script>
        async function processData() {
            const input = document.getElementById('input').value;
            const response = await fetch('/api/process', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({data: input})
            });
            const result = await response.json();
            document.getElementById('result').innerHTML = '<pre>' + JSON.stringify(result, null, 2) + '</pre>';
        }
    </script>
</body>
</html>
'''

@app.route('/')
def home():
    return render_template_string(HTML_TEMPLATE)

@app.route('/api/process', methods=['POST'])
def process_api():
    data = request.json.get('data', '')
    
    # Process the data
    result = {
        'original': data,
        'processed': data.upper(),
        'length': len(data),
        'words': len(data.split()) if data else 0
    }
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)`,
                
                game: `#!/usr/bin/env python3
"""
Python Game Engine
"""
import random
import time
import os
import sys

class GameEngine:
    def __init__(self):
        self.running = True
        self.score = 0
        self.level = 1
        
    def clear_screen(self):
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def display_intro(self):
        print("=" * 50)
        print("🎮 UNIVERSAL GAME ENGINE 🎮")
        print("=" * 50)
        print("A simple text-based adventure game")
        print("Type 'help' for commands")
        print()
    
    def display_status(self):
        print(f"Score: {self.score} | Level: {self.level}")
        print("-" * 30)
    
    def process_command(self, command):
        command = command.lower().strip()
        
        if command == 'help':
            print("Commands: explore, fight, rest, status, quit")
        elif command == 'explore':
            self.explore()
        elif command == 'fight':
            self.fight()
        elif command == 'rest':
            self.rest()
        elif command == 'status':
            self.display_status()
        elif command == 'quit':
            self.running = False
        else:
            print("Unknown command. Type 'help' for available commands.")
    
    def explore(self):
        events = [
            "You found a treasure chest! +100 points",
            "You discovered a secret passage! +50 points",
            "You met a friendly NPC! +25 points",
            "You found nothing interesting..."
        ]
        event = random.choice(events)
        print(f"🗺️  {event}")
        if "points" in event:
            points = int(event.split("+")[1].split(" ")[0])
            self.score += points
    
    def fight(self):
        enemy_hp = random.randint(50, 100)
        player_damage = random.randint(20, 40)
        
        print(f"⚔️  You encounter an enemy with {enemy_hp} HP!")
        
        while enemy_hp > 0:
            damage = random.randint(15, player_damage)
            enemy_hp -= damage
            print(f"You deal {damage} damage! Enemy HP: {max(0, enemy_hp)}")
            
            if enemy_hp <= 0:
                reward = random.randint(75, 150)
                self.score += reward
                print(f"🏆 Victory! You gained {reward} points!")
                if self.score > self.level * 500:
                    self.level += 1
                    print(f"🌟 Level up! You are now level {self.level}!")
                break
            
            time.sleep(1)
    
    def rest(self):
        print("😴 You rest and recover your energy...")
        time.sleep(2)
        print("You feel refreshed!")
    
    def run(self):
        self.clear_screen()
        self.display_intro()
        
        while self.running:
            self.display_status()
            command = input("What would you like to do? ").strip()
            print()
            
            if command:
                self.process_command(command)
                print()
        
        print("Thanks for playing! 🎮")
        print(f"Final Score: {self.score}")

if __name__ == "__main__":
    game = GameEngine()
    game.run()`
            },
            
            javascript: {
                base: `/**
 * Universal JavaScript Solution
 */
class UniversalProcessor {
    constructor() {
        this.config = this.loadConfig();
    }
    
    loadConfig() {
        return {
            version: '1.0.0',
            debug: true
        };
    }
    
    async process(data) {
        console.log('Processing data:', data);
        
        // Your custom logic here
        const result = {
            input: data,
            processed: true,
            timestamp: Date.now()
        };
        
        return result;
    }
    
    async run() {
        const sampleData = "Hello from JavaScript!";
        const result = await this.process(sampleData);
        console.log(JSON.stringify(result, null, 2));
    }
}

// Execute if running directly
if (require.main === module) {
    const processor = new UniversalProcessor();
    processor.run().catch(console.error);
}

module.exports = UniversalProcessor;`,
                
                web: `/**
 * JavaScript Web Application (Node.js + Express)
 */
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// HTML template
const htmlTemplate = \`
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Web App</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
        button { padding: 10px 20px; background: #28a745; color: white; border: none; cursor: pointer; border-radius: 5px; }
        input { padding: 10px; margin: 5px; width: 300px; border: 1px solid #ccc; border-radius: 5px; }
        #result { margin-top: 20px; padding: 10px; background: #f8f9fa; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 JavaScript Web Application</h1>
        <input type="text" id="input" placeholder="Enter your data">
        <button onclick="processData()">Process</button>
        <div id="result"></div>
    </div>
    <script>
        async function processData() {
            const input = document.getElementById('input').value;
            try {
                const response = await fetch('/api/process', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({data: input})
                });
                const result = await response.json();
                document.getElementById('result').innerHTML = 
                    '<h3>Result:</h3><pre>' + JSON.stringify(result, null, 2) + '</pre>';
            } catch (error) {
                document.getElementById('result').innerHTML = 
                    '<h3>Error:</h3><p style="color: red;">' + error.message + '</p>';
            }
        }
    </script>
</body>
</html>
\`;

// Routes
app.get('/', (req, res) => {
    res.send(htmlTemplate);
});

app.post('/api/process', (req, res) => {
    const { data } = req.body;
    
    // Process the data
    const result = {
        original: data,
        processed: data ? data.toUpperCase() : '',
        reversed: data ? data.split('').reverse().join('') : '',
        length: data ? data.length : 0,
        words: data ? data.split(' ').length : 0,
        timestamp: new Date().toISOString()
    };
    
    res.json(result);
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(\`🌐 Server running on http://0.0.0.0:\${PORT}\`);
    console.log(\`🔗 Access your app at: http://localhost:\${PORT}\`);
});`,

                game: `/**
 * JavaScript Game Engine (Browser-based)
 */
class GameEngine {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameState = {
            running: false,
            score: 0,
            level: 1,
            player: { x: 50, y: 50, size: 20, speed: 5 }
        };
        this.enemies = [];
        this.init();
    }
    
    init() {
        // Create HTML structure
        document.body.innerHTML = \`
            <div style="text-align: center; font-family: Arial, sans-serif;">
                <h1>🎮 JavaScript Game Engine</h1>
                <canvas id="gameCanvas" width="800" height="600" style="border: 2px solid #333; background: #f0f0f0;"></canvas>
                <div style="margin: 10px;">
                    <button onclick="game.start()">Start Game</button>
                    <button onclick="game.stop()">Stop</button>
                    <span style="margin-left: 20px;">Score: <span id="score">0</span> | Level: <span id="level">1</span></span>
                </div>
                <div style="margin: 10px;">
                    <p>Use WASD or Arrow Keys to move. Avoid the red enemies!</p>
                </div>
            </div>
        \`;
        
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.setupControls();
        this.spawnEnemies();
    }
    
    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.gameState.running) return;
            
            const { player } = this.gameState;
            const speed = player.speed;
            
            switch(e.key.toLowerCase()) {
                case 'w':
                case 'arrowup':
                    player.y = Math.max(0, player.y - speed);
                    break;
                case 's':
                case 'arrowdown':
                    player.y = Math.min(this.canvas.height - player.size, player.y + speed);
                    break;
                case 'a':
                case 'arrowleft':
                    player.x = Math.max(0, player.x - speed);
                    break;
                case 'd':
                case 'arrowright':
                    player.x = Math.min(this.canvas.width - player.size, player.x + speed);
                    break;
            }
        });
    }
    
    spawnEnemies() {
        for (let i = 0; i < 5; i++) {
            this.enemies.push({
                x: Math.random() * (this.canvas.width - 30),
                y: Math.random() * (this.canvas.height - 30),
                size: 15 + Math.random() * 15,
                speedX: (Math.random() - 0.5) * 4,
                speedY: (Math.random() - 0.5) * 4,
                color: \`hsl(\${Math.random() * 360}, 70%, 50%)\`
            });
        }
    }
    
    updateEnemies() {
        this.enemies.forEach(enemy => {
            enemy.x += enemy.speedX;
            enemy.y += enemy.speedY;
            
            // Bounce off walls
            if (enemy.x <= 0 || enemy.x >= this.canvas.width - enemy.size) {
                enemy.speedX *= -1;
            }
            if (enemy.y <= 0 || enemy.y >= this.canvas.height - enemy.size) {
                enemy.speedY *= -1;
            }
            
            // Keep in bounds
            enemy.x = Math.max(0, Math.min(this.canvas.width - enemy.size, enemy.x));
            enemy.y = Math.max(0, Math.min(this.canvas.height - enemy.size, enemy.y));
        });
    }
    
    checkCollisions() {
        const { player } = this.gameState;
        
        for (let enemy of this.enemies) {
            const dx = player.x - enemy.x;
            const dy = player.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < (player.size + enemy.size) / 2) {
                this.gameOver();
                return;
            }
        }
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw player
        const { player } = this.gameState;
        this.ctx.fillStyle = '#007bff';
        this.ctx.fillRect(player.x, player.y, player.size, player.size);
        
        // Draw enemies
        this.enemies.forEach(enemy => {
            this.ctx.fillStyle = enemy.color;
            this.ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
        });
        
        // Update UI
        document.getElementById('score').textContent = this.gameState.score;
        document.getElementById('level').textContent = this.gameState.level;
    }
    
    gameLoop() {
        if (!this.gameState.running) return;
        
        this.updateEnemies();
        this.checkCollisions();
        this.render();
        
        // Increase score
        this.gameState.score += 1;
        
        // Level up
        if (this.gameState.score > 0 && this.gameState.score % 1000 === 0) {
            this.gameState.level++;
            this.spawnEnemies(); // Add more enemies
        }
        
        requestAnimationFrame(() => this.gameLoop());
    }
    
    start() {
        this.gameState.running = true;
        this.gameState.score = 0;
        this.gameState.level = 1;
        this.enemies = [];
        this.spawnEnemies();
        this.gameLoop();
        console.log('🎮 Game started!');
    }
    
    stop() {
        this.gameState.running = false;
        console.log('⏹️ Game stopped!');
    }
    
    gameOver() {
        this.gameState.running = false;
        alert(\`Game Over! Final Score: \${this.gameState.score}\`);
        console.log(\`💀 Game Over! Final Score: \${this.gameState.score}\`);
    }
}

// Initialize game when page loads
const game = new GameEngine();
console.log('🚀 JavaScript Game Engine loaded!');`
            },
            
            java: {
                base: `/**
 * Universal Java Solution
 */
import java.util.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class UniversalProcessor {
    private Map<String, Object> config;
    
    public UniversalProcessor() {
        this.config = loadConfig();
    }
    
    private Map<String, Object> loadConfig() {
        Map<String, Object> config = new HashMap<>();
        config.put("version", "1.0.0");
        config.put("debug", true);
        return config;
    }
    
    public Map<String, Object> process(Object data) {
        System.out.println("Processing data: " + data);
        
        Map<String, Object> result = new HashMap<>();
        result.put("input", data);
        result.put("processed", true);
        result.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        
        return result;
    }
    
    public void run() {
        String sampleData = "Hello from Java!";
        Map<String, Object> result = process(sampleData);
        
        System.out.println("Result:");
        result.forEach((key, value) -> 
            System.out.println("  " + key + ": " + value)
        );
    }
    
    public static void main(String[] args) {
        UniversalProcessor processor = new UniversalProcessor();
        processor.run();
    }
}`
            },
            
            cpp: {
                base: `/**
 * Universal C++ Solution
 */
#include <iostream>
#include <string>
#include <map>
#include <any>
#include <chrono>
#include <iomanip>
#include <sstream>

class UniversalProcessor {
private:
    std::map<std::string, std::any> config;
    
    void loadConfig() {
        config["version"] = std::string("1.0.0");
        config["debug"] = true;
    }
    
public:
    UniversalProcessor() {
        loadConfig();
    }
    
    std::map<std::string, std::any> process(const std::any& data) {
        std::cout << "Processing data..." << std::endl;
        
        std::map<std::string, std::any> result;
        result["input"] = data;
        result["processed"] = true;
        
        // Get current timestamp
        auto now = std::chrono::system_clock::now();
        auto time_t = std::chrono::system_clock::to_time_t(now);
        
        std::stringstream timestamp;
        timestamp << std::put_time(std::localtime(&time_t), "%Y-%m-%d %H:%M:%S");
        result["timestamp"] = timestamp.str();
        
        return result;
    }
    
    void run() {
        std::string sampleData = "Hello from C++!";
        auto result = process(sampleData);
        
        std::cout << "Result:" << std::endl;
        for (const auto& [key, value] : result) {
            std::cout << "  " << key << ": ";
            
            // Handle different types
            try {
                std::cout << std::any_cast<std::string>(value);
            } catch (const std::bad_any_cast& e) {
                try {
                    std::cout << std::any_cast<bool>(value);
                } catch (const std::bad_any_cast& e) {
                    std::cout << "[complex value]";
                }
            }
            std::cout << std::endl;
        }
    }
};

int main() {
    UniversalProcessor processor;
    processor.run();
    return 0;
}`
            }
        };
    }

    getLanguageName(lang) {
        const names = {
            'javascript': 'JavaScript',
            'python': 'Python',
            'java': 'Java',
            'cpp': 'C++',
            'csharp': 'C#',
            'go': 'Go',
            'rust': 'Rust',
            'typescript': 'TypeScript',
            'php': 'PHP',
            'ruby': 'Ruby',
            'swift': 'Swift',
            'kotlin': 'Kotlin'
        };
        return names[lang] || lang.charAt(0).toUpperCase() + lang.slice(1);
    }

    addMessage(content, sender, isLoading = false) {
        const messagesContainer = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        if (isLoading) {
            messageDiv.innerHTML = `
                <div class="message-content loading">
                    ${content}
                </div>
            `;
        } else {
            const processedContent = this.formatMessage(content);
            messageDiv.innerHTML = `
                <div class="message-content">
                    ${processedContent}
                </div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Highlight code blocks
        if (!isLoading) {
            setTimeout(() => {
                if (window.Prism) {
                    Prism.highlightAllUnder(messageDiv);
                }
            }, 100);
        }
        
        return messageDiv;
    }

    formatMessage(content) {
        // Convert markdown-style code blocks to HTML
        content = content.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, lang, code) => {
            const language = lang || 'text';
            const copyBtn = `<button class="copy-btn" onclick="navigator.clipboard.writeText(\`${code.replace(/`/g, '\\`')}\`)">Copy</button>`;
            return `
                <div class="code-block">
                    <div class="code-header">
                        <span>${this.getLanguageName(language)}</span>
                        ${copyBtn}
                    </div>
                    <div class="code-content">
                        <pre><code class="language-${language}">${this.escapeHtml(code)}</code></pre>
                    </div>
                </div>
            `;
        });
        
        // Convert markdown headers
        content = content.replace(/^## (.+)$/gm, '<h3>$1</h3>');
        content = content.replace(/^# (.+)$/gm, '<h2>$1</h2>');
        
        // Convert line breaks
        content = content.replace(/\n/g, '<br>');
        
        return content;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new CodeGenerator();
});
