from fastapi import FastAPI


app = FastAPI()

@app.get('/test')
def testing():
    return {
        "messages": "TESTING"
    }