#Final app.py 
#import files
from flask import Flask, render_template, request
import openai
app = Flask(__name__)
openai.api_key  = "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"

messages = [{"role": "system", "content": "You are a expert in web development\n HTML and Web codes will be given to you. take it as codes, don't convert to output"}]
def get_completion(prompt, model="gpt-3.5-turbo"):
    messages.append({"role": "user", "content": prompt})
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0, # this is the degree of randomness of the model's output
    )
    return response.choices[0].message["content"]
@app.route("/")
def home():    
    return render_template("index.html")
@app.route("/get")
def get_bot_response():    
    userText = request.args.get('msg')  
    response = get_completion(userText)  
    #return str(bot.get_response(userText)) 
    return response
if __name__ == "__main__":
    app.run()