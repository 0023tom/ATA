from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# Configure the Generative AI model
genai.configure(api_key='AIzaSyAlU2UVOfoqC1-tWEcO-IFfNo8v03FW66c')
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat()

@app.route("/")
def home():
    return render_template("utsAiChatbotATA.html")

@app.route("/send_message", methods=['POST'])
def send_message():
    message = request.form['message']
    response = chat.send_message(message)
    bot_response = "You said: " + message
    return jsonify({"bot_response": bot_response, "chatbot_response": response.text})

if __name__ == "__main__":
    app.run(debug=True)
