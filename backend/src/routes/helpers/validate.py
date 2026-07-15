from fastapi import status, HTTPException


def validate_non_negative_num(num: str) -> int:
    try:
        int_num = int(num)
    except (TypeError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail=f"{num} needs to be a number.",
        )
    if int_num < 0:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail=f"{num} must be greater than or equal to 0.",
        )
    return int_num
