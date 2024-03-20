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

messages = [{"role": "system", "content": "You are an expert in web development"}]



ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


def get_completion(prompt, model="ft:gpt-3.5-turbo-0125:personal::91vUW2df"):
    lines = prompt.split('.')
    prompt_escaped = html.escape(prompt)
    prompt_wrapped = f'<code>{prompt_escaped}</code>'
    messages.append({"role": "user", "content": prompt_wrapped})

    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0,  # this is the degree of randomness of the model's output
    )

    bot_response = response.choices[0].message["content"]
    parsed_response = bot_response.split('\n')
    formatted_response = []
    current_explanation = None

    for line in parsed_response:
        if line.startswith("Explanation for"):
            if current_explanation:
                formatted_response.append(current_explanation)
            current_explanation = line + ":"
        else:
            if current_explanation:
                current_explanation += "\n   - " + line.strip()
            else:
                formatted_response.append(line)

    if current_explanation:
        formatted_response.append(current_explanation)

    return '\n'.join(formatted_response)


def get_completion2(prompt, model="ft:gpt-3.5-turbo-0125:personal::920n73G5"):
    #
    # prompt_escaped = html.escape(prompt)
    # prompt_wrapped = f'<code>{prompt_escaped}</code>'
    messages.append({"role": "user", "content": prompt})

    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0,  # this is the degree of randomness of the model's output
    )

    bot_response = response.choices[0].message["content"]
    parsed_response = bot_response.split('\n')
    formatted_response = []
    current_explanation = None

    for line in parsed_response:
        if line.startswith("Explanation for"):
            if current_explanation:
                formatted_response.append(current_explanation)
            current_explanation = line + ":"
        else:
            if current_explanation:
                current_explanation += "\n   - " + line.strip()
            else:
                formatted_response.append(line)

    if current_explanation:
        formatted_response.append(current_explanation)

    return '\n'.join(formatted_response)


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



# print(type(data))
# data.append(" add tailwind css to this. and make it look stunning")
# print(data)

@app.route('/me',methods=['GET'])
def me():
    htmlCode ={"me":run()}
    return htmlCode

def me2():
    data = run()
    htmlCode ={"me":data}
    return htmlCode

@app.route("/get")
def get_bot_response():
    userText = request.args.get('msg')
    response = get_completion(userText)
    #return str(bot.get_response(userText))
    return response

def get_user_input():
    with open('data.json') as file:
        d = json.load(file)
        return (d["data"])

def ai_output():
    codedata = run()
    userText = ('\n'.join(map(str, codedata))+"add tailwindcss this code")
    response = get_completion2(userText)
    # return str(bot.get_response(userText))
    return response

@app.route('/business',methods=['GET'])
def get_bot_response2():
    userInput = get_user_input()
    if (len(userInput) == 0):
        response =ai_output()
        return response
    else:
        userText = (get_user_input()+userInput)
        response = get_completion2(userText)
        # return str(bot.get_response(userText))
        return response



@app.route('/userinput',methods=['POST'])
def user_input():
    data = request.json.get('data')  # Extracting JSON data from the request
    if data:
        with open('data.json', 'w') as file:
            file.write("""{"data":"""+'"'+data+'"'+"}")
        return jsonify({'message': 'JSON data saved successfully'})
    else:
        return jsonify({'error': 'No JSON data provided'}), 400




@app.route("/get2")
def get_bot_response3():
    userText = request.args.get('msg')
    response = get_completion2(userText)
    #return str(bot.get_response(userText))
    return response

if __name__ == '__main__':
    app.run(debug=True)
