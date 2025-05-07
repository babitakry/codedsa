from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.orm import Session
from ..schema import SignUpForm, SignInForm
from ..models import User
from .. import database, models, hashing

router = APIRouter()

# 1. /signup
@router.post("/signup")
async def signup(data: SignUpForm, db: Session = Depends(database.get_db)):
    # 1. Check whether user exist in db or not
    user_exist = db.query(User).filter_by(username = data.username).first()

    # 2. if exist
    if user_exist:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail="User Already Exist !!")
    
    # 3. if not exist then create new user
    new_user = models.User(username = data.username, password = hashing.Hash.bcrypt(data.password), email = data.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # 4. return the success message
    return {
        "message": "Signup Successfully! Please Login"
    }

    

# 2. /login
@router.post("/signin")
async def signin(request: SignInForm, db: Session = Depends(database.get_db)):
    # 1. Chech username is exits in the db or not
    user_exist = db.query(User).filter_by(username = request.username).first()

    # 2. if not exist:
    if not user_exist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User Does Not Exist !!")
    
    # 3. if exist then match the password
    if not hashing.Hash.verify(user_exist.password, request.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Password")

    return {
        "message": "Login Successfully !!"
    }

