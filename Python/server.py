# C:\flask_dev\flaskreact\app.py
from flask import Flask, json, request, jsonify
# import os
# import urllib.request
# from werkzeug.utils import secure_filename
from flask_cors import CORS

from codeGen import CodeGen
import html
import os
import openai
app = Flask(__name__)
CORS(app, supports_credentials=True)

app.secret_key = "caircocoders-ednalan"
openai.api_key  = "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"

messages = [{"role": "system", "content": "You are a expert in web development\n HTML and Web codes will be given to you. take it as codes, don't convert to output"}]



ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


def get_completion(prompt, model="gpt-3.5-turbo"):
    prompt_escaped = html.escape(prompt)
    prompt_wrapped = f'<code>{prompt_escaped}</code>'
    messages.append({"role": "user", "content": prompt_wrapped})

    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0, # this is the degree of randomness of the model's output
    )
    return response.choices[0].message["content"]


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def main():
    return 'Homepage'


@app.route('/upload', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        resp = jsonify({
            "message": 'No file part in the request',
            "status": 'failed'
        })
        resp.status_code = 400
        return resp

    file = request.files['file']

    if file and allowed_file(file.filename):
        file.save('Uimage.png')
        im = os.path.abspath('Uimage.png')
        img_file = CodeGen(im)
        img_file.generateCode()
        # file.save('Uimage.png')
        resp = jsonify({
            "message": 'File successfully uploaded',
            "status": 'success'
        })
        resp.status_code = 201
        return resp
    else:
        resp = jsonify({
            "message": 'File type is not allowed',
            "status": 'failed'
        })
        resp.status_code = 400
        return resp

def run():
    f = open('fullCode.json')
    data = json.load(f)
    return data['me']

@app.route('/me',methods=['GET'])
def me():
    htmlCode ={"me":run()}
    return htmlCode
@app.route("/get")
def get_bot_response():
    userText = request.args.get('msg')
    response = get_completion(userText)
    #return str(bot.get_response(userText))
    return response
if __name__ == '__main__':
    app.run(debug=True)