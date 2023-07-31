import React from "react";
import Graph from "react-graph-vis";
import { useRef } from "react";
import { useSelector } from "react-redux";
function GraphComponent() {
  const graphRef = useRef();

  const saveGraphAsFile = () => {
    if (!graphRef.current) {
      console.error("Unable to access the graph.");
      return;
    }

    const networkInstance = graphRef.current.Network;
    const canvas = networkInstance.canvas.frame.canvas;

    const dataUrl = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "graph-content.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const graph = useSelector(state=>state.job_result)

  

  const options = {
    layout: {
      hierarchical: false,
    },
    nodes: {
      shape: "box",
    },
    edges: {
      color: "#000000",

      smooth: {
        enabled: true,
      },
    },
    height: "500px",
    autoResize: true,

    width: "100%",
    physics: {
      enabled: false,
    },
  };

  const events = {
    selectNode: function (event) {
      const { nodes } = event;
      console.log("Selected nodes:");
      console.log(nodes);
    },
  };

  return (
    <>
      <Graph graph={graph} options={options} events={events} ref={graphRef} />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        onClick={saveGraphAsFile}
      >
        Save Graph as Image
      </button>
    </>
  );
}

export default GraphComponent;
