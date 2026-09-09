from fastapi.testclient import TestClient
from app.main import app
client=TestClient(app)
def test_health(): assert client.get('/health').json()['status']=='UP'
def test_forecast():
 r=client.post('/forecast',json={'values':[10,11,12,13,14],'horizon':3}); assert r.status_code==200 and len(r.json()['forecast'])==3
def test_anomaly():
 r=client.post('/anomaly',json={'values':[10,10,11,10,50,10,11]}); assert r.status_code==200
