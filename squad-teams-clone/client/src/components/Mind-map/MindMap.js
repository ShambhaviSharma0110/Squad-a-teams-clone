import React, { useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
} from "react-flow-renderer";
import { Link } from "react-router-dom";
import "./MindMap.scss"

const initialElements = [
  {
    id: "1",
    type: "input",
    data: { label: "Central theme/application" },
    position: { x: 0, y: 0 },
  },
];
const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const MindMap = () => {
  const [elements, setElements] = useState(initialElements);
  const [name, setName] = useState("");

  const addNode = () => {
    setElements((e) =>
      e.concat({
        id: (e.length + 1).toString(),
        data: { label: `${name}` },
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      })
    );
  };

  const onConnect = (params) => setElements((e) => addEdge(params, e));

  return (
    <div className="graph-wrap">
      <ReactFlow
        elements={elements}
        onLoad={onLoad}
        style={{ width: "100%", height: "90vh" }}
        onConnect={onConnect}
        connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
        connectionLineType="bezier"
        snapToGrid={true}
        snapGrid={[16, 16]}
      >
        {/* For the background setup */}
        <Background color="#885ebb" gap={10} />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === "input") return "purple";

            return "#885ebb";
          }}
        />
        <Controls />
      </ReactFlow>

      <div>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          name="title"
        />
        {/* Button to add a feature or event */}
        <button className="btn" onClick={addNode}>
          Add bubble
        </button>
        {/* Link to head back home */}
        <Link to="/">
          <button className="btn-home">Head back home</button>
        </Link>
      </div>
    </div>
  );
};

export default MindMap;
