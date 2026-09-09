from fastapi import FastAPI
from pydantic import BaseModel, Field
import numpy as np
from sklearn.ensemble import IsolationForest

app=FastAPI(title="EcoPulse ML Service",version="1.0.0")
class Series(BaseModel): values:list[float]=Field(min_length=3,max_length=10000)
class ForecastRequest(BaseModel): values:list[float]=Field(min_length=3,max_length=10000); horizon:int=Field(default=7,ge=1,le=30)
@app.get('/health')
def health(): return {'status':'UP','service':'ecopulse-ml'}
@app.post('/anomaly')
def anomaly(req:Series):
    x=np.array(req.values,dtype=float).reshape(-1,1); model=IsolationForest(contamination='auto',random_state=42,n_estimators=100); labels=model.fit_predict(x); scores=model.decision_function(x); return {'anomalies':[i for i,v in enumerate(labels) if v==-1],'scores':[round(float(v),5) for v in scores]}
@app.post('/forecast')
def forecast(req:ForecastRequest):
    y=np.array(req.values,dtype=float); n=len(y); t=np.arange(n); coef=np.polyfit(t,y,1); future=np.arange(n,n+req.horizon); pred=np.polyval(coef,future); residual=y-np.polyval(coef,t); std=float(np.std(residual)) if n>2 else 0; return {'forecast':[round(max(0,float(v)),3) for v in pred],'lower':[round(max(0,float(v-1.96*std)),3) for v in pred],'upper':[round(float(v+1.96*std),3) for v in pred]}
