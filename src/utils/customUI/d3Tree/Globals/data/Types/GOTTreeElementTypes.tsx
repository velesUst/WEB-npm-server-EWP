import { GOTElementType } from "../../Enums/GOTElements";
import {
  AgileRVelocityIndicatorState,
  AgileRProgressState
} from "../../Enums/unitsOfProcess";

export type DataNodeAttributeType = {
  isSelected: boolean;
  showElementState: boolean;
  isRootElement: boolean;

  elementType: GOTElementType;
  displayLabel?: string;
  elementNameLabel?: string;

  taskVelocity?: AgileRVelocityIndicatorState;
  tasProgressState?: AgileRProgressState;
};
