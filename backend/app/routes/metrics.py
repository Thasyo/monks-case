from fastapi import APIRouter, Depends, Query 
from sqlalchemy.orm import Session
from app import db, auth
from app.models.Metric import Metric

router = APIRouter()

@router.get("/")
def get_metrics(
    database: Session = Depends(db.get_db),
    user: dict = Depends(auth.get_current_user),
    order_by: str = None,
    start_date: str = None,
    end_date: str = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=1000)
):
    
    query = database.query(Metric)

    if start_date and end_date:
        query = query.filter(Metric.date.between(start_date,end_date))
    
    if order_by:
        query = query.order_by(getattr(Metric, order_by))
    
    query = query.offset(skip).limit(limit) # aplicando paginação.

    results = query.all()

    if user["role"] != "admin":
        for r in results:
            delattr(r, "cost_micros")

    return results
