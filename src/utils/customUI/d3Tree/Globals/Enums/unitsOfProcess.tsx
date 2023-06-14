//NOTE: These enums are mapped to DRF.GLOBAL.ENUMS.UnitsOfProcess
//Keep them in sync and only add new entries to the end of enums

export enum AgileRPublishState {
  NONE = 0,
  DRAFT,
  PUBLISHED,
  ARCHIVED,
  DEEP_ARCHIVE //Not in use at the moment, but will be used for moving stuff into blob storage archiving
}

export enum AgileRDisplayStates {
  NONE = 0,
  LESS_THAN_EXPECTED, // lightblue color
  SUCCESS, //green
  WARNING, //orange
  ALERT //red
}

export enum ShowHideState {
  NONE = 0,
  SHOW,
  HIDE
}

export enum AgileRProgressState {
  NONE = 0,
  DRAFT,
  NOT_STARTED,
  IN_PROGRESS,
  COMPLETE
}

export enum AgileRVelocityIndicatorState {
  NONE = 0,
  DELAYED,
  BLOCKED,
  SLOW,
  NORMAL,
  FAST
}

export enum AgileRAssignedState {
  NONE = 0,
  UN_ASSIGNED,
  AWAITING_ACCEPTENCE,
  ASSIGNED
}

export enum AgileRPriorityLevel {
  NONE = 0,
  HIGH,
  MEDIUM,
  LOW
}

export enum ElementLinkState {
  NONE = 0,
  NOT_LINKED,
  PENDING_LINK,
  LINKED,
  BROKEN_LINK
}
