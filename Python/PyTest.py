import pytest
import json
from server import app

#Fixture - to create a test client for the Flask backend app
@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

#Main page test case
def test_main_page(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b"Homepage" in response.data

#Test case for successful image uplaod
def test_upload_file_success(client):
    # Assuming a sample image file exists in the same directory as the test file
    with open('imagecheck1.png', 'rb') as f:
        response = client.post('/upload', data={'file': (f, 'imagecheck1.png')})
        assert response.status_code == 201
        data = json.loads(response.data)
        assert data['message'] == 'File successfully uploaded'
        assert data['status'] == 'success'

#Test case for image upload function when no file is given
def test_upload_file_fail(client):
    response = client.post('/upload')
    assert response.status_code == 400
    data = json.loads(response.data)
    assert data['message'] == 'No file part in the request'
    assert data['status'] == 'failed'

#Test case for "/me" endpoint
def test_me_endpoint(client):
    response = client.get('/me')
    assert response.status_code == 200
    assert b"me" in response.data

#Test case for getting response for the AI assistant
def test_get_bot_response(client):
    response = client.get('/get?msg=Hello')
    assert response.status_code == 200
    assert b"bot response" in response.data

#Test case for business endpoint
def test_business_endpoint(client):
    response = client.get('/business')
    assert response.status_code == 200
    assert b"bot response" in response.data

#Test case for posting user input
def test_user_input_endpoint(client):
    data = {'data': 'some user input data'}
    response = client.post('/userinput', json=data)
    assert response.status_code == 200
    assert b"JSON data saved successfully" in response.data

#Test case for business mode AI response
def test_get_bot_response2(client):
    response = client.get('/get2?msg=Hello')
    assert response.status_code == 200
    assert b"bot response" in response.data