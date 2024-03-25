# C:\flask_dev\flaskreact\app.py
from flask import Flask, json, request, jsonify
import json
from json.decoder import JSONDecodeError
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

# Function to generate completion using OpenAI Chat API
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

# Another function to generate completion using OpenAI Chat API (presumably for different purposes)
def get_completion2(prompt, model="ft:gpt-3.5-turbo-0125:personal::95dWvD91"):
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

# Function to check if the uploaded file has an allowed extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to the homepage
@app.route('/')
def main():
    return 'Homepage'

# Route to handle file upload
@app.route('/upload', methods=['POST'])
def upload_file():
    # open('fullCode.json', 'w').close()
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

# Function to load data from a JSON file
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


# Route to get response from the chatbot
@app.route("/get")
def get_bot_response():
    userText = request.args.get('msg')
    response = get_completion(userText)
    #return str(bot.get_response(userText))
    return response


# Function to get user input from a JSON file
def get_user_input():
    json_file_path = "data2.json"  # Replace with your JSON file path
    result = is_json_null(json_file_path)
    print(result)
    if result:
            return ("")
    else:
         with open('data2.json') as file:
             d = json.load(file)
             return (d["data"])


# Function to generate AI output
def ai_output():
    codedata = run()
    if codedata is None:
        return "Error: run() returned None"

    userText = ('\n'.join(map(str, codedata))+": Update and generate the above code with tailwind css and make it look more visually appealing")
    response = get_completion2(userText)
    # return str(bot.get_response(userText))
    return response

# Function to check if a JSON file is null
def is_json_null(json_file_path):
    try:
        with open(json_file_path, 'r') as f:
            data = f.read()
            if not data.strip():  # Check if the file is empty
                return True
            else:
                json_data = json.loads(data)
                return json_data is None
    except FileNotFoundError:
        print("File not found.")
        return False
    except JSONDecodeError as e:
        if e.msg == "Expecting value" and e.doc == "":
            return True  # JSON file is empty
        else:
            print("Invalid JSON format:", e)
            return False




# Route to get response from the chatbot based on user input and JSON data
@app.route('/business',methods=['GET'])
def get_bot_response2():
    userInput = get_user_input()
    json_file_path = "data2.json"  # Replace with your JSON file path
    result = is_json_null(json_file_path)
    if result:
        print("JSON file is not null.1111")
        response = ai_output()
        return response
    else:
        print("JSON file is not null.")
        userText = (ai_output()+userInput)
        response = get_completion2(userText)
        # return str(bot.get_response(userText))
        return response


# Route to receive user input in JSON format
@app.route('/userinput',methods=['POST'])
def user_input():
    data = request.json.get('data')  # Extracting JSON data from the request
    if data:
        with open('data2.json', 'w') as file:
            file.write("""{"data":"""+'"'+data+'"'+"}")
        return jsonify({'message': 'JSON data saved successfully'})
    else:
        return jsonify({'error': 'No JSON data provided'}), 400




# Run the Flask app
if __name__ == '__main__':
    app.run(debug=False,port=8000)
