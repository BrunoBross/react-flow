import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  EdgeChange,
  Node,
  NodeChange,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { zinc } from "tailwindcss/colors";
import DefaultEdge from "./components/edges/DefaultEdge";
import { Square } from "./components/nodes/Square";
import * as Toolbar from "@radix-ui/react-toolbar";
import { motion, Variants } from "framer-motion";
import { v4 as uuid } from "uuid";
import "./global.css";
import { Circle } from "./components/nodes/Circle";

const NODE_TYPES = {
  square: Square,
  circle: Circle,
};

const EDGE_TYPES = {
  default: DefaultEdge,
};

const INITIAL_NODES = [
  // {
  //   id: crypto.randomUUID(),
  //   type: "square",
  //   position: {
  //     x: 200,
  //     y: 400,
  //   },
  //   data: {},
  // },
] satisfies Node[];

const alertVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    animationDuration: "0.5s",
    zIndex: 100,
  },
  closed: {
    opacity: 0,
    x: 300,
    zIndex: 100,
  },
};

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((edges) => addEdge(connection, edges));
  }, []);

  const handleAddSquareNode = (nodeType: string) => {
    const newNodes = [
      ...nodes,
      {
        id: uuid(),
        type: nodeType,
        position: {
          x: 200,
          y: 200,
        },
        data: { handleShowAlert },
      },
    ];

    if (newNodes) {
      setNodes(newNodes);
    }
  };

  const handleShowAlert = useCallback(() => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  }, []);

  return (
    <ReactFlowProvider>
      <div className="w-screen h-screen">
        <ReactFlow
          nodeTypes={NODE_TYPES}
          edgeTypes={EDGE_TYPES}
          nodes={nodes}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          connectionMode={ConnectionMode.Loose}
          defaultEdgeOptions={{
            type: "default",
          }}
          className="bg-zinc-900"
          onNodesDelete={(e) => console.log(e)}
        >
          <Background gap={12} size={2} color={zinc[700]} />
          <Controls />
        </ReactFlow>
        <Toolbar.Root className="fixed flex justify-center gap-10 bottom-5 left-1/2 -translate-x-1/2 bg-zinc-800 rounded-2xl shadow-lg shadow-black border border-zinc-700 px-8 h-20 w-96 overflow-hidden">
          <Toolbar.Button
            onClick={() => handleAddSquareNode("square")}
            className="w-32 h-32 bg-violet-500 mt-6 rounded transition-transform hover:-translate-y-4"
          />
          <Toolbar.Button
            onClick={() => handleAddSquareNode("circle")}
            className="w-32 h-32 bg-violet-500 mt-6 rounded-full transition-transform hover:-translate-y-4"
          />
        </Toolbar.Root>
        <motion.div
          animate={showAlert ? "open" : "closed"}
          variants={alertVariants}
          className="fixed pr-24 bottom-7 -right-20 bg-green-500 p-5 rounded-tl-lg rounded-bl-lg shadow-lg shadow-black border border-zinc-700 text-zinc-900"
        >
          <div>Bloco deletado com sucesso!</div>
        </motion.div>
        <div className="fixed bottom-0 right-0 bg-zinc-900 w-20 h-5" />
      </div>
    </ReactFlowProvider>
  );
}

export default App;
