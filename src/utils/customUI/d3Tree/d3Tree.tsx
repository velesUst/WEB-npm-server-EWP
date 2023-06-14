import React, {
  useState,
  useContext,
  createContext,
  useRef,
  useEffect,
  useLayoutEffect
} from "react";
import Tree from "react-d3-tree";
import "./styles.css";
import { Point } from "react-d3-tree/lib/types/common";
import GOTElementDetailsTree from "./Elements/GOTElementDetailsTree";
import { IDataNodeType } from "./Globals/data/Interfaces/GOTElementInterfaces";
import { TestData } from "./Globals/data/testData";
import { DataNodeAttributeType } from "./Globals/data/Types/GOTTreeElementTypes";
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  getWorkTree,
  selectWave 
} from '../../../features/wavesForecast/wavesForecastSlice'; 
import {
  getToken
} from '../../../features/login/loginSlice'; 

const containerStyles = {
  //width: "70vw",
  height: "60vh"
};

interface svgProps {
  width: number;
  height: number;
  x: number;
  y: number;
}
export const selectedTreeNodeContext = createContext("");

const D3Tree: React.FC = () => {
  
  const dispatch = useAppDispatch();
  const forecastTree = useAppSelector(getWorkTree);
  const token = useAppSelector(getToken);
 
  const treeContext = useContext(selectedTreeNodeContext);
  //const [translate, containerRef] = useCenteredTree();
  const [translate, setTranslate] = useState<Point | undefined>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>({} as HTMLDivElement);

  const [newData, setNewData] = useState<IDataNodeType>(undefined/*TestData*/);
  const [selectedNodeId, setSelectedNodeId] = useState("");


  useEffect(() => {
    // обновление дерева
    setNewData(forecastTree);
  });

  useLayoutEffect(() => {
    if (containerRef.current !== null) {
      const { width, height } = containerRef.current.getBoundingClientRect();

      var newPoint: Point = {
        x: width / 7,
        y: height / 2
      };

      setTranslate(newPoint);
    }
  }, []);

  const nodeSize: Point = { x: 320, y: 200 };

  const foreignObjectProps: svgProps = {
    //onClick:(e,y)=> nodeChildClicked(e,y),
    width: nodeSize.x - 10,
    height: nodeSize.y,
    x: -(nodeSize.x / 2),
    y: -50
    //clicked:(e,y)=>treeChildClicked(e,y),
  };

  function updateData(root: IDataNodeType, selectedNodeId: string) {
    console.log("Checking elements=> ", root.id);

    if (root.attributes !== undefined) {
      var myPayload: DataNodeAttributeType = JSON.parse(
        root.attributes.payload
      );

      if (root.id === selectedNodeId) {
        if (root.attributes !== undefined) {
          myPayload.isSelected = true;
          console.log("Found Node=> ");
          setSelectedNodeId(root.id);
        }
      } else {
        if (root.attributes !== undefined) {
          myPayload.isSelected = false;
        }
      }

      if (root.children !== undefined) {
        root.children.forEach((element) => {
          updateData(element, selectedNodeId);
        });
      }
    }
  }

  const nodeDivClicked = (nodeKey: string, nodeData: DataNodeAttributeType) => {
    //: TreeNodeDatum - typescrpt) =>{
    //console.log("Node DIV data => ", nodeData);
    console.log("Node DIV key=> ", nodeKey);

    //This gives us information about the element graph such as the div or label that
    //was clicked on, but it doesnt tell us about the object underneath

    //We use this one to perhaps indicate that the node is selected

    var dataCopy = newData;
    if (dataCopy.children !== undefined) {
      dataCopy.children.forEach((element) => {
        updateData(element, nodeKey);
      });
    }

    //console.log("Updating data");
    setNewData(dataCopy);
    
    // - UPDATE STORE 
    dispatch(selectWave(nodeKey,token));
  };

  const renderForeignObjectNode = ({ ...props }) => (
    <g>
      {/* `foreignObject` requires width & height to be explicitly set. */}
      <foreignObject {...foreignObjectProps}>
        {/* {getDataVal(props.nodeDatum.attributes)}
        <div>
          <TestCom nodePayload={props.nodeDatum.attributes} />
          
        </div> 
        */}

        <GOTElementDetailsTree
          onClick={(e, p) => nodeDivClicked(e, p)}
          nodeKey={props.nodeDatum.id}
          nodePayload={props.nodeDatum.attributes}
          nodeDatum={props.nodeDatum.children}
          toggleNode={props.toggleNode}
        />
      </foreignObject>
    </g>
  );

  return (
    <selectedTreeNodeContext.Provider value={selectedNodeId}>
      <div style={containerStyles} ref={containerRef}>
        { newData!==undefined &&
          <Tree
            //allowForeignObjects

            data={newData}
            rootNodeClassName="node__root"
            branchNodeClassName="node__branch"
            leafNodeClassName="node__leaf"
            translate={translate}
            nodeSize={nodeSize}
            renderCustomNodeElement={(rd3tProps) =>
              renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
            }
            orientation="horizontal"
            pathFunc={"diagonal"}
            zoom={0.8}
            //enableLegacyTransitions={true}
            //transitionDuration="500"
            zoomable={true}
            //scaleExtent={{ max: 2, min: 0.1 }}
            //onClick={nodeChildClicked}
            // onNodeClick={treeChildClicked}
            // onUpdate={nodeChildUpdated}
            //useCenteredTree={true}
            //onNodeMouseOut={treeNodeMouseOut}
            //onNodeMouseOver={treeNodeMouseOut}
          />
        }
      </div>
    </selectedTreeNodeContext.Provider>
  );
}
export default D3Tree;