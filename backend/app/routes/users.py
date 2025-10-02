from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import db
from app.models.User import User
from app.auth import create_token, verify_password

router = APIRouter()

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(db.get_db)):
    email = form_data.username.lower().strip()
    password = form_data.password.strip()
    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(password, user.password): 
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Usuário Inválido!", 
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    token = create_token(
        {"sub": user.email, 
        "role": user.role}    
    )
    
    return {"access token": token, "token_type": "bearer"}