from sqlalchemy import Column, Integer, Float, Date
from app.db import Base

class Metric(Base):
    __tablename__ = "metrics"
    id = Column(Integer, primary_key=True, autoincrement=True)
    account_id = Column(Float)
    campaign_id = Column(Float)
    cost_micros = Column(Float)
    clicks = Column(Float)
    conversions = Column(Float)
    impressions = Column(Float)
    interactions = Column(Float)
    date = Column(Date)
