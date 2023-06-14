import { GOTElementType } from "../Enums/GOTElements";
import {
  AgileRProgressState,
  AgileRVelocityIndicatorState
} from "../Enums/unitsOfProcess";
import { IDataNodeType } from "./Interfaces/GOTElementInterfaces";

export const TestData: IDataNodeType = {
  name: "CEO",
  __rd3t: {
    collapsed: false,
    depth: 0,
    id: "0"
  },
  id: "0",
  attributes: {
    payload: JSON.stringify({
      isSelected: true,
      showElementState: true,
      isRootElement: true,
      elementType: GOTElementType.GOAL,
      displayLabel: "Goal",
      elementNameLabel: "This is the root goal",
      taskVelocity: AgileRVelocityIndicatorState.BLOCKED,
      tasProgressState: AgileRProgressState.IN_PROGRESS
    })
  },
  children: [
    {
      name: "Manager",
      __rd3t: {
        collapsed: false,
        depth: 0,
        id: "1"
      },
      id: "1",
      attributes: {
        payload: JSON.stringify({
          isSelected: false,
          showElementState: true,
          isRootElement: false,
          elementType: GOTElementType.OBJECTIVE,
          displayLabel: "Objective",
          elementNameLabel: "This is the parent objective",
          taskVelocity: AgileRVelocityIndicatorState.NORMAL,
          tasProgressState: AgileRProgressState.IN_PROGRESS
        })
      },
      children: [
        {
          name: "Foreman",
          __rd3t: {
            collapsed: false,
            depth: 0,
            id: "2"
          },
          id: "2",
          attributes: {
            payload: JSON.stringify({
              isSelected: false,
              showElementState: true,
              isRootElement: false,
              elementType: GOTElementType.TASK,
              displayLabel: "Task",
              elementNameLabel: "This is a task",
              taskVelocity: AgileRVelocityIndicatorState.NORMAL,
              tasProgressState: AgileRProgressState.COMPLETE
            })
          },
          children: [
            {
              name: "Worker",
              __rd3t: {
                collapsed: false,
                depth: 0,
                id: "3"
              },
              id: "3",
              attributes: {
                payload: JSON.stringify({
                  isSelected: false,
                  showElementState: true,
                  isRootElement: false,
                  elementType: GOTElementType.TASK,
                  displayLabel: "Task",
                  elementNameLabel: "This is a child task",
                  taskVelocity: AgileRVelocityIndicatorState.SLOW,
                  tasProgressState: AgileRProgressState.DRAFT
                })
              },
              children: undefined
            }
          ]
        },
        {
          name: "Foreman",
          __rd3t: {
            collapsed: false,
            depth: 0,
            id: "4"
          },
          id: "4",
          attributes: {
            payload: JSON.stringify({
              isSelected: false,
              showElementState: true,
              isRootElement: false,
              elementType: GOTElementType.TASK,
              displayLabel: "Task",
              elementNameLabel: "This is a child task",
              taskVelocity: AgileRVelocityIndicatorState.FAST,
              tasProgressState: AgileRProgressState.IN_PROGRESS
            })
          },
          children: [
            {
              name: "Worker",
              __rd3t: {
                collapsed: false,
                depth: 0,
                id: "5"
              },
              id: "5",
              attributes: {
                payload: JSON.stringify({
                  isSelected: false,
                  showElementState: true,
                  isRootElement: false,
                  elementType: GOTElementType.TASK,
                  displayLabel: "Task",
                  elementNameLabel: "This is a child task",
                  taskVelocity: AgileRVelocityIndicatorState.NORMAL,
                  tasProgressState: AgileRProgressState.NOT_STARTED
                })
              },
              children: undefined
            }
          ]
        }
      ]
    }
  ]
};
