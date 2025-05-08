from pydantic import BaseModel

class SignUpForm(BaseModel):
    username: str
    password: str
    email: str

class SignInForm(BaseModel):
    username: str
    password: str