# C:\flask_dev\flaskreact\app.py
from flask import Flask, json, request, jsonify
# import os
# import urllib.request
# from werkzeug.utils import secure_filename
from flask_cors import CORS

from codeGen import CodeGen

import os
app = Flask(__name__)
CORS(app, supports_credentials=True)

app.secret_key = "caircocoders-ednalan"


ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


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
    return data['fullCode']

@app.route('/me')
def members():
    htmlCode ={"me":run()}
    return htmlCode

if __name__ == '__main__':
    app.run(debug=True)
