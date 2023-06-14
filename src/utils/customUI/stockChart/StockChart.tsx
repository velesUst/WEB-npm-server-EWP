import React, { Component } from 'react';
import CanvasJSReact from './lib/canvasjs.stock.react';


const StockChart: React.FC<{ inputData: any }> = ( {inputData} ) => {
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
  
      const containerProps = {
        width: "80%",
        height: "450px",
        margin: "auto"
      };

      return (
        <div>
          <CanvasJSStockChart
            options={inputData}
            containerProps = {containerProps}
          />
        </div>
      );
    }

    
export default StockChart;
