import { NodeResizer } from "@reactflow/node-resizer";
import { NodeProps, Handle, Position, useReactFlow } from "reactflow";
import * as Menubar from "@radix-ui/react-menubar";
import { motion, Variants } from "framer-motion";
import { TrashSimple } from "phosphor-react";
import "@reactflow/node-resizer/dist/style.css";
import { useEffect, useState } from "react";
import { zinc } from "tailwindcss/colors";

export const SQUARE_INITIAL_SIZE = 200;

const menuVariants: Variants = {
  open: {
    opacity: 1,
    y: 2,
    animationDuration: "0.5s",
    zIndex: -10,
  },
  closed: {
    opacity: 0,
    y: 10,
    zIndex: -10,
  },
};

export function Square(props: NodeProps) {
  const { getNodes, setNodes } = useReactFlow();
  const {
    selected,
    id: nodeId,
    data: { handleShowAlert },
  } = props;
  const [nodeColor, setNodeColor] = useState<string>("violet");

  const handleDeleteSquare = () => {
    const nodes = getNodes();
    const newNodes = nodes.filter((node) => node.id !== nodeId);

    if (newNodes) {
      setNodes(newNodes);
      localStorage.setItem("nodes", JSON.stringify(newNodes));
    }

    handleShowAlert();
  };

  return (
    <>
      <motion.div
        animate={selected ? "open" : "closed"}
        variants={menuVariants}
        className={`${!selected && "hidden"} flex justify-center `}
      >
        <Menubar.Root className="absolute -top-16  bg-zinc-800 rounded shadow-sm shadow-black border border-zinc-700">
          <Menubar.Menu>
            <Menubar.Trigger className="p-2 hover:brightness-150 hover:bg-zinc-700 transition-colors">
              <div className={`w-4 h-4 rounded-xl bg-${nodeColor}-500 `} />
            </Menubar.Trigger>
            <Menubar.Portal>
              <Menubar.Content align="center" side="top" sideOffset={10}>
                <Menubar.Item className=" bg-zinc-800 rounded shadow-sm shadow-black border border-zinc-700">
                  <div className="flex gap-1 cursor-pointer">
                    <div
                      className="p-2 hover:brightness-150 hover:bg-zinc-700 transition-colors rounded"
                      onClick={() => setNodeColor("green")}
                    >
                      <div className="w-4 h-4 rounded-xl bg-green-500 " />
                    </div>
                    <div
                      className="p-2 hover:brightness-150 hover:bg-zinc-700 transition-colors rounded"
                      onClick={() => setNodeColor("red")}
                    >
                      <div className="w-4 h-4 rounded-xl bg-red-500 " />
                    </div>
                    <div
                      className="p-2 hover:brightness-150 hover:bg-zinc-700 transition-colors rounded"
                      onClick={() => setNodeColor("yellow")}
                    >
                      <div className="w-4 h-4 rounded-xl bg-yellow-500 " />
                    </div>
                    <div
                      className="p-2 hover:brightness-150 hover:bg-zinc-700 transition-colors rounded"
                      onClick={() => setNodeColor("blue")}
                    >
                      <div className="w-4 h-4 rounded-xl bg-blue-500 " />
                    </div>
                    <div
                      className="p-2 hover:brightness-150 hover:bg-zinc-700 transition-colors rounded"
                      onClick={() => setNodeColor("violet")}
                    >
                      <div className="w-4 h-4 rounded-xl bg-violet-500 " />
                    </div>
                  </div>
                </Menubar.Item>
              </Menubar.Content>
            </Menubar.Portal>
          </Menubar.Menu>
          <Menubar.Menu>
            <Menubar.Trigger
              className="p-2 hover:brightness-150 hover:bg-zinc-700 transition-colors"
              onClick={handleDeleteSquare}
            >
              <TrashSimple size={16} weight="bold" color={zinc[200]} />
            </Menubar.Trigger>
          </Menubar.Menu>
        </Menubar.Root>
      </motion.div>
      <label htmlFor="content">
        <div
          className={`flex justify-center items-center bg-${nodeColor}-500 rounded shadow-lg w-full h-full  min-w-[100px] min-h-[100px] transition-colors`}
        >
          <input
            type="text"
            id="content"
            className="p-4 w-full h-full break-all bg-transparent border-none outline-none"
            size={1}
          />
          <NodeResizer
            minWidth={100}
            minHeight={100}
            isVisible={selected}
            lineClassName="border-blue-400"
            handleClassName="h-3 w-3 bg-white border-2 rounded border-blue-400"
          />
          <Handle
            id="right"
            type="source"
            position={Position.Right}
            className="-right-5 w-3 h-3 bg-blue-400 opacity-70 hover:opacity-100 hover:brightness-120"
          />
          <Handle
            id="left"
            type="source"
            position={Position.Left}
            className="-left-5 w-3 h-3 bg-blue-400 opacity-70 hover:opacity-100 hover:brightness-120"
          />
          <Handle
            id="top"
            type="source"
            position={Position.Top}
            className="-top-5 w-3 h-3 bg-blue-400 opacity-70 hover:opacity-100 hover:brightness-120"
          />
          <Handle
            id="bottom"
            type="source"
            position={Position.Bottom}
            className="-bottom-5 w-3 h-3 bg-blue-400 opacity-70 hover:opacity-100 hover:brightness-120"
          />
        </div>
      </label>
    </>
  );
}
