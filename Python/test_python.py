import pytest
import json
from app import app
from datetime import datetime, timezone

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# Replace datetime.datetime.utcfromtimestamp(0) with timezone-aware object
EPOCH = datetime.fromtimestamp(0, tz=timezone.utc)

def test_main_page(client):
    response = client.get('/')
    assert b'Homepage' in response.data

def test_get_bot_response(client):
    response = client.get('/get?msg=How%20are%20you?')
    assert response.status_code == 200
    expected_response = b"I'm here and ready to assist you with any questions or help you may need. How can I assist you today?"
    assert expected_response in response.data

def test_upload_file(client):
    # Test uploading a valid file
    with open('imagecheck1.png', 'rb') as f:
        data = {'file': (f, 'imagecheck1.png')}
        response = client.post('/upload', data=data, content_type='multipart/form-data')
        assert response.status_code == 201
        assert b'File successfully uploaded' in response.data

def test_me_endpoint(client):
    response = client.get('/me')
    assert response.status_code == 200
    assert b'me' in response.data  # Adjust this assertion based on your expected response

def test_user_input(client):
    data = {'data': 'test input data'}
    response = client.post('/userinput', json=data)
    assert response.status_code == 200
    assert b'JSON data saved successfully' in response.data

def test_business_endpoint(client):
    response = client.get('/business')
    assert response.status_code == 200
    expected_response = b'<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>My First HTML Page</title>\n    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">\n</head>\n<body>\n    <nav class="bg-gray-800 text-white p-4">\n        <a href="#" class="hover:underline">Link 1</a>\n        <a href="#" class="hover:underline">Link 2</a>\n        <a href="#" class="hover:underline">Link 3</a>\n        <a href="#" class="hover:underline">Link 4</a>\n        <a href="#" class="hover:underline">Link 5</a>\n    </nav>\n\n    <div class="bg-white shadow-md rounded-md p-4 m-4">\n        <h2 class="text-2xl font-bold text-gray-800">Card 1</h2>\n        <p class="text-gray-600">This is the content of Card 1.</p>\n        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">Button 1</button>\n    </div>\n\n    <div class="bg-white shadow-md rounded-md p-4 m-4">\n        <h2 class="text-2xl font-bold text-gray-800">Card 2</h2>\n        <p class="text-gray-600">This is the content of Card 2.</p>\n        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">Button 2</button>\n    </div>\n\n    <div class="bg-white shadow-md rounded-md p-4 m-4">\n        <h2 class="text-2xl font-bold text-gray-800">Card 3</h2>\n        <p class="text-gray-600">This is the content of Card 3.</p>\n        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">Button 3</button>\n    </div>\n\n    <div class="bg-white shadow-md rounded-md p-4 m-4">\n        <h2 class="text-2xl font-bold text-gray-800">Card 4</h2>\n        <p class="text-gray-600">This is the content of Card 4.</p>\n        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">Button 4</button>\n    </div>\n\n    <div class="bg-white shadow-md rounded-md p-4 m-4">\n        <h2 class="text-2xl font-bold text-gray-800">Card 5</h2>\n        <p class="text-gray-600">This is the content of Card 5.</p>\n        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">Button 5</button>\n    </div>\n\n    <footer class="bg-gray-800 text-white p-4 text-center">\xc2\xa9 2022 Your Company</footer>\n</body>\n</html>\n'
    assert expected_response in response.data

