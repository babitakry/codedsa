from .database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.types import JSON
from sqlalchemy import Enum
import enum


class DifficultyLevel(enum.Enum):
    easy = "easy"
    medium = "medium"
    hard = "hard"



class User(Base):
    __tablename__ = 'user'

    userid = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    solved_no_questions = Column(Integer, default=0)
    social_links = Column(JSON) 
    skills = Column(JSON)
    total_submission = Column(Integer, default=0)

class Submission(Base):
    __tablename__ = 'submission'

    submission_id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, nullable=False)
    user_id = Column(Integer, ForeignKey('user.userid'), nullable=False)
    code = Column(Text, nullable=False)
    code_language = Column(String, nullable=False)
    test_cases = Column(JSON)
    submission_status = Column(String, nullable=False)
    failed_reason = Column(JSON)

class Problem(Base):
    __tablename__ = 'problem'

    problem_id = Column(Integer, primary_key=True, index=True)
    problem_name = Column(String)
    difficulty = Column(Enum(DifficultyLevel), nullable=False)
    topic = Column(String)
    description = Column(String)
    


