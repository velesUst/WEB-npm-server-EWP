import * as React from "react";
import {
  Box,
  Card,
  CardContent
} from '@material-ui/core';
import D3Tree from "../../utils/customUI/d3Tree/d3Tree";

const PatternHierarchy: React.FC<any> = (props) => {

  return (
    <Card {...props}>
      <CardContent
                sx={{
                  height: '100%'
                }}
      >
        <D3Tree />
      </CardContent>
    </Card>
  );

};
export default PatternHierarchy;
