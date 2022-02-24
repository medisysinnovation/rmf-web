# generated by datamodel-codegen:
#   filename:  activity_discovery_request.json

from __future__ import annotations

from pydantic import BaseModel, Field
from typing_extensions import Literal


class ActivityDiscoveryRequest(BaseModel):
    type: Literal["activitiy_discovery_request"] = Field(
        ..., description="Indicate that this is an activity discovery request"
    )
