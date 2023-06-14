import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect
} from "react";
import styled, { DefaultTheme } from "styled-components";
import { Button, Grid, IconButton } from "@material-ui/core";
import { makeStyles, createStyles } from "@mui/styles";
import { selectedTreeNodeContext } from "../d3Tree";

import CheckCircleOutlineSharpIcon from "@material-ui/icons/CheckCircleOutlineSharp";
import PagesIcon from "@material-ui/icons/Pages";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";

import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";

import { Transition, motion } from "framer-motion";
import { IDataNodeType } from "../Globals/data/Interfaces/GOTElementInterfaces";
import { DataNodeAttributeType } from "../Globals/data/Types/GOTTreeElementTypes";
import {
  AgileRProgressState,
  AgileRVelocityIndicatorState
} from "../Globals/Enums/unitsOfProcess";
import { GOTElementType } from "../Globals/Enums/GOTElements";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      flexGrow: 1,
      width: "100%"
    },
    themedContainer: {
      display: "flex",
      flexDirection: "row",
      flexGrow: 1
    },
    middleIcon: {
      marginRight: "5px",
      marginLeft: "5px",
      fill: "white",
      strokeWidth: 0,
      width: "24px",
      height: "24px",
      VerticalAlign: "center",
      marginTop: "auto",
      marginBottom: "auto"
    },
    expandIcon: {
      verticalAlign: "middle",
      alignSelf: "center",
      margin: "auto",
      transform: "rotate(-90deg)",
      fill: "white",
      strokeWidth: 0
    },
    expandOuterButton: {
      "&.Mui-selected": {
        backgroundColor: "purple"
      }
    }

    // actionListItem: (props: DefaultTheme) => ({
    //   height: "50px",
    //   maxHeight: "50px",
    //   padding: "0px",
    //   marginBottom: "5px",

    //   "&.Mui-selected": {
    //     backgroundColor: "#A9DAFC33"
    //   },

    //   backgroundColor: "#E8EDEE"

    //   // "&$selected": {
    //   //   backgroundColor: "red",
    //   //   "&:hover": {
    //   //     backgroundColor: "orange",
    //   //   },
    //   // },
    // })
  })
);

interface InnerRoundExpand_Props {
  className?: any
  onClick?: any
  component?: any
  variants?: any
  animate?: any
  transition?: any
}

const OuterElementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;

  /* background-color: lightgray; */
  /* width: 300px; */
  /* height: 100px; */
  overflow: none;
`;

const TopContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;

  /* background-color: pink; */
  /* width: 100%; */
  /* height:30px;   */
  font-family: "poppins";
  font-weight: 300;
  font-size: 16px;
`;

const TopContainerElement = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 0;

  width: auto;
  font-family: "poppins";
  font-weight: 300;
  font-size: 16px;
  /* background-color: lightgreen;  */
  text-transform: capitalize;
  margin-right: 5px;
`;

const BottomContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  overflow: none;

  /* background-color: lightblue; */
  /* width: 100%; */
  /* margin:10px; */
`;

const OuterRoundElement = styled.div`
  display: flex;
  /* position: absolute; */

  /* width: 300px; */
  /* height: 70px; */
  /* margin: 10px; */
  margin-right: 5px;

  /* background-color: lightgrey; */
  border: 2px solid green;
  border-radius: 35px;
  z-index: 1;
  box-shadow: 5px 3px 10px #4255638c;
`;

const InnerRoundElement = styled(Button)`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-self: center;
  vertical-align: middle;
  margin: 5px;
  padding: 0px;

  min-width: 250px;
  height: 50px;

  border-radius: 35px;
  cursor: pointer;
  outline: none;
  text-transform: capitalize;
`;

const InnerTextWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  vertical-align: center;
  /* background-color: lightblue; */
  align-self: center;
`;

const InnerTextElement = styled.div`
  flex-grow: 1;
  /* This can be set to any small amount to create the ellipse style */
  width: 10px;
  /* The 3 props must be set for ellipses */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  vertical-align: middle;
  line-height: 25px;
  text-align: left;
  margin-left: 5px;
  font-family: "poppins";
  font-weight: 300;
  font-size: 16px;
  color: white;
`;

const InnerRoundExpandButtonElement = styled(Button)<InnerRoundExpand_Props>`
  display: flex;
  align-self: flex-end;
  vertical-align: middle;

  background-color: #e8edee80;
  min-width: 50px;
  height: 50px;

  /* margin:auto; */
  padding: 0px;
  margin-right: 0px;

  border: 1px solid #76869280;
  border-radius: 25px;
  cursor: pointer;
  outline: none;
`;

/* #region  ANIMATIONS */

const MotionsContainerTransition: Transition = {
  ease: "easeInOut",
  duration: 0.5
};

const variants = {
  rotateExpand: {
    rotate: [-180, 0, 0],
    transition: { duration: 0.5 }
  },
  rotateCollapsed: {
    rotate: [0, 0, 180],
    transition: { duration: 0.5 }
  },
  // You can do whatever you want here, if you just want it to stop completely use `rotate: 0`
  stop: {
    rotate: 0
  }
};

/* #endregion */
export interface PayloadType {
  payload: string;
}

interface HeaderProps {
  nodePayload: PayloadType;
  nodeDatum: IDataNodeType[];
  nodeKey: string;
  toggleNode(): void;
  onClick(nodeKey: string, data: DataNodeAttributeType): void;
}

function GOTElementDetailsTree(props: HeaderProps) {
  //const themeContext = useContext(ThemeContext);
  const classes = useStyles();

  const [currentExpandedState, setCurrentExpandedState] = useState(true);
  const [currentSelectedState, setCurrentSelectedState] = useState(false);

  const treeNodeContext = useContext(selectedTreeNodeContext);
  const [nodeSelectedColor, setNodeSelectedColor] = useState("red");

  const [payload, setPayload] = useState({} as DataNodeAttributeType);

  const deserialisePayload = (jsonVal: PayloadType) => {
    
    var myPayload: DataNodeAttributeType = JSON.parse(jsonVal.payload);

    console.log("data expanded", myPayload.displayLabel);
    setPayload(myPayload);
  };

  useLayoutEffect(() => {
    if (props.nodePayload === undefined) {
      return;
    }
    console.log("In effect =>", props.nodePayload);
    deserialisePayload(props.nodePayload);
  }, []);

  const handleExpandClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    //e.preventDefault();
    e.stopPropagation();

    setCurrentExpandedState(!currentExpandedState);
    props.toggleNode();
  };

  const handleNodeClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      //e.preventDefault();
      e.stopPropagation();

      setCurrentSelectedState(!currentSelectedState);
      props.onClick(props.nodeKey, payload);
    },
    [setCurrentSelectedState, currentSelectedState, props, payload]
  );

  useEffect(() => {
    if (payload === undefined) {
      return;
    }

    if (props.nodeKey !== undefined) {
      if (props.nodeKey === treeNodeContext) {
        setNodeSelectedColor("#00A305");
        console.log("Node Selected and set ", props.nodeKey);
        return;
      }
    }

    if (payload !== undefined) {
      switch (payload.elementType) {
        case GOTElementType.GOAL:
          setNodeSelectedColor("#2E5C7D");
          return;
        case GOTElementType.OBJECTIVE:
          setNodeSelectedColor("#4182B0");
          return;
        case GOTElementType.TASK:
          setNodeSelectedColor("#7698B0");
          return;
        default:
          setNodeSelectedColor("#7698B0");
          return;
      }
    }
  }, [payload, props.nodeKey, treeNodeContext]);

  if (payload === undefined) {
    return <div></div>;
  }

  const getStateDisplayLabel = (): string => {
    if (payload === undefined) {
      return "unknown";
    }

    if (payload.taskVelocity === AgileRVelocityIndicatorState.BLOCKED) {
      return "Blocked";
    }

    if (payload.taskVelocity === AgileRVelocityIndicatorState.DELAYED) {
      return "Delayed";
    }

    switch (payload.tasProgressState) {
      case AgileRProgressState.DRAFT:
        return "Draft";
      case AgileRProgressState.NOT_STARTED:
        return "Not Started";
      case AgileRProgressState.IN_PROGRESS:
        return "In Progress";
      case AgileRProgressState.COMPLETE:
        return "Complete";

      default:
        return "unknown";
    }
  };

  const buildBoxShadow = (): string => {
    var newBox = "5px 3px 6px ";

    var boxColor =
      payload.taskVelocity === AgileRVelocityIndicatorState.BLOCKED ||
      payload.taskVelocity === AgileRVelocityIndicatorState.DELAYED
        ? "#FF000040"
        : payload.tasProgressState === AgileRProgressState.COMPLETE
        ? "#00A30540"
        : payload.tasProgressState === AgileRProgressState.IN_PROGRESS
        ? "#FF800040"
        : payload.tasProgressState === AgileRProgressState.DRAFT
        ? "#2E5C7D40"
        : "#3699FF40"; // not started

    return newBox + boxColor;
  };

  return (
    <OuterElementWrapper>
      <TopContainerWrapper>
        <TopContainerElement
          style={{
            alignSelf: "flex-start"
          }}
        >
          {payload.displayLabel}
        </TopContainerElement>

        {/* {!payload.isRootElement && ( */}
        <TopContainerElement
          style={{
            alignSelf: "end",
            color:
              payload.taskVelocity === AgileRVelocityIndicatorState.BLOCKED ||
              payload.taskVelocity === AgileRVelocityIndicatorState.DELAYED
                ? "#FF0000"
                : payload.tasProgressState === AgileRProgressState.COMPLETE
                ? "#00A305"
                : payload.tasProgressState === AgileRProgressState.IN_PROGRESS
                ? "#FF8000"
                : payload.tasProgressState === AgileRProgressState.DRAFT
                ? "#2E5C7D"
                : "#3699FF" // not started
          }}
        >
          {getStateDisplayLabel()}
        </TopContainerElement>
        {/* )} */}
      </TopContainerWrapper>

      <BottomContainerWrapper>
        {payload.isRootElement ? (
          <OuterRoundElement
            style={{
              borderColor:
                payload.taskVelocity === AgileRVelocityIndicatorState.BLOCKED ||
                payload.taskVelocity === AgileRVelocityIndicatorState.DELAYED
                  ? "#FF0000"
                  : payload.tasProgressState === AgileRProgressState.COMPLETE
                  ? "#00A305"
                  : payload.tasProgressState === AgileRProgressState.IN_PROGRESS
                  ? "#FF8000"
                  : payload.tasProgressState === AgileRProgressState.DRAFT
                  ? "#2E5C7D"
                  : "#3699FF", // not started

              boxShadow: buildBoxShadow()
            }}
          >
            <InnerRoundElement   
              onClick={(e:any) => handleNodeClick(e)}
              style={{
                backgroundColor: "#FF8000"
              }}
            >
              {payload.elementType === GOTElementType.GOAL ? (
                <PagesIcon className={classes.middleIcon} />
              ) : payload.elementType === GOTElementType.OBJECTIVE ? (
                <GpsFixedIcon className={classes.middleIcon} />
              ) : (
                <CheckCircleOutlineSharpIcon className={classes.middleIcon} />
              )}

              <InnerTextWrapper>
                <InnerTextElement>{payload.elementNameLabel}</InnerTextElement>
              </InnerTextWrapper>
              {/*props.nodeDatum !== undefined &&
                props.nodeDatum.length > 0 &&
                props.nodeDatum[0].children !== undefined && (
                  <InnerRoundExpandButtonElement
                    className={classes.expandOuterButton}
                    onClick={(e:any) => handleExpandClick(e)}
                    component={motion.div}
                    variants={variants}
                    animate={
                      currentExpandedState ? "rotateExpand" : "rotateCollapsed"
                    }
                    transition={MotionsContainerTransition}
                  >
                    <DoubleArrowIcon className={classes.expandIcon} />
                  </InnerRoundExpandButtonElement>
                  )*/}
            </InnerRoundElement>
          </OuterRoundElement>
        ) : (
          <OuterRoundElement
            style={{
              borderColor:
                payload.taskVelocity === AgileRVelocityIndicatorState.BLOCKED ||
                payload.taskVelocity === AgileRVelocityIndicatorState.DELAYED
                  ? "#FF0000"
                  : payload.tasProgressState === AgileRProgressState.COMPLETE
                  ? "#00A305"
                  : payload.tasProgressState === AgileRProgressState.IN_PROGRESS
                  ? "#FF8000"
                  : payload.tasProgressState === AgileRProgressState.DRAFT
                  ? "#2E5C7D"
                  : "#3699FF", // not started

              boxShadow: buildBoxShadow()
            }}
          >
            <InnerRoundElement
              onClick={(e:any) => handleNodeClick(e)}
              style={{
                backgroundColor: nodeSelectedColor
              }}
            >
              {payload.elementType === GOTElementType.GOAL ? (
                <PagesIcon className={classes.middleIcon} />
              ) : payload.elementType === GOTElementType.OBJECTIVE ? (
                <GpsFixedIcon className={classes.middleIcon} />
              ) : (
                <CheckCircleOutlineSharpIcon className={classes.middleIcon} />
              )}

              <InnerTextWrapper>
                <InnerTextElement>{payload.elementNameLabel}</InnerTextElement>
              </InnerTextWrapper>

              {props.nodeDatum !== undefined && props.nodeDatum.length > 0 && (
                <InnerRoundExpandButtonElement
                  className={classes.expandOuterButton}
                  onClick={(e:any) => handleExpandClick(e)}
                  component={motion.div}
                  variants={variants}
                  animate={
                    currentExpandedState ? "rotateExpand" : "rotateCollapsed"
                  }
                  transition={MotionsContainerTransition}
                >
                  <DoubleArrowIcon className={classes.expandIcon} />
                </InnerRoundExpandButtonElement>
              )}
            </InnerRoundElement>
          </OuterRoundElement>
        )}
      </BottomContainerWrapper>
    </OuterElementWrapper>
  );
}

export default GOTElementDetailsTree;
