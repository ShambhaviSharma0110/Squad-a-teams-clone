import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import "./Board.scss";
import { Link } from 'react-router-dom';

// code for whiteboarding

const generator = rough.generator();

const createElement = (id, x1, y1, x2, y2, type) => {
  const roughElement =
    type === "line"
      ? generator.line(x1, y1, x2, y2)
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
  return { id, x1, y1, x2, y2, type, roughElement };
};

const nearpt = (x, y, x1, y1, name) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
};

const posInElement = (x, y, element) => {
  const { type, x1, x2, y1, y2 } = element;
  if (type === "rectangle") {
    const topLeft = nearpt(x, y, x1, y1, "tl");
    const topRight = nearpt(x, y, x2, y1, "tr");
    const bottomLeft = nearpt(x, y, x1, y2, "bl");
    const bottomRight = nearpt(x, y, x2, y2, "br");
    const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
    return topLeft || topRight || bottomLeft || bottomRight || inside;
  } else {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    const start = nearpt(x, y, x1, y1, "start");
    const end = nearpt(x, y, x2, y2, "end");
    const inside = Math.abs(offset) < 1 ? "inside" : null;
    return start || end || inside;
  }
};

const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElemAtPos = (x, y, elements) => {
  return elements
    .map(element => ({ ...element, pos: posInElement(x, y, element) }))
    .find(element => element.pos !== null);
};

const adjustCoord = element => {
  const { type, x1, y1, x2, y2 } = element;
  if (type === "rectangle") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  } else {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 };
    } else {
      return { x1: x2, y1: y2, x2: x1, y2: y1 };
    }
  }
};

const PosCursor = pos => {
  switch (pos) {
    case "tl":
    case "br":
    case "start":
    case "end":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "nesw-resize";
    default:
      return "move";
  }
};

const resizedCoordinates = (clientX, clientY, pos, coordinates) => {
  const { x1, y1, x2, y2 } = coordinates;
  switch (pos) {
    case "tl":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };
    case "tr":
      return { x1, y1: clientY, x2: clientX, y2 };
    case "bl":
      return { x1: clientX, y1, x2, y2: clientY };
    case "br":
    case "end":
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return null; //should not really get here...
  }
};

const useHistory = initialState => {
  const [pointer, setPointer] = useState(0);
  const [history, setHistory] = useState([initialState]);

  const setState = (action, overwrite = false) => {
    const newState = typeof action === "function" ? action(history[pointer]) : action;
    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[pointer] = newState;
      setHistory(historyCopy);
    } else {
      const updatedState = [...history].slice(0, pointer + 1);
      setHistory([...updatedState, newState]);
      setPointer(prevState => prevState + 1);
    }
  };

  const undo = () => pointer > 0 && setPointer(prevState => prevState - 1);
  const redo = () => pointer < history.length - 1 && setPointer(prevState => prevState + 1);

  return [history[pointer], setState, undo, redo];
};

const Board = () => {
  const [elements, setElements, undo, redo] = useHistory([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("line");
  const [selectedElement, setSelectedElement] = useState(null);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  useEffect(() => {
    const undoRedoFunction = event => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };

    document.addEventListener("keydown", undoRedoFunction);
    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);

  const updateElem = (id, x1, y1, x2, y2, type) => {
    const updatedElement = createElement(id, x1, y1, x2, y2, type);

    const elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;
    setElements(elementsCopy, true);
  };

  const handleMouseDown = event => {
    const { clientX, clientY } = event;
    if (tool === "select") {
      const element = getElemAtPos(clientX, clientY, elements);
      if (element) {
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;
        setSelectedElement({ ...element, offsetX, offsetY });
        setElements(prevState => prevState);

        if (element.pos === "inside") {
          setAction("moving");
        } else {
          setAction("resizing");
        }
      }
    } else {
      const id = elements.length;
      const element = createElement(id, clientX, clientY, clientX, clientY, tool);
      setElements(prevState => [...prevState, element]);
      setSelectedElement(element);

      setAction("drawing");
    }
  };

 const handleMouseUp = () => {
    if (selectedElement) {
      const pointer = selectedElement.id;
      const { id, type } = elements[pointer];
      if (action === "drawing" || action === "resizing") {
        const { x1, y1, x2, y2 } = adjustCoord(elements[pointer]);
        updateElem(id, x1, y1, x2, y2, type);
      }
    }
    setAction("none");
    setSelectedElement(null);
  };
  const handleMouseMove = event => {
    const { clientX, clientY } = event;

    if (tool === "select") {
      const element = getElemAtPos(clientX, clientY, elements);
      event.target.style.cursor = element ? PosCursor(element.pos) : "default";
    }

    if (action === "drawing") {
      const pointer = elements.length - 1;
      const { x1, y1 } = elements[pointer];
      updateElem(pointer, x1, y1, clientX, clientY, tool);
    } else if (action === "moving") {
      const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;
      const newX1 = clientX - offsetX;
      const newY1 = clientY - offsetY;
      updateElem(id, newX1, newY1, newX1 + width, newY1 + height, type);
    } else if (action === "resizing") {
      const { id, type, pos, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = resizedCoordinates(clientX, clientY, pos, coordinates);
      updateElem(id, x1, y1, x2, y2, type);
    }
  };



  return (
    <div className="canvas-wrap">
      <div style={{ pos: "fixed" }}>
        <div className="tools">
                  
          <input
            type="radio"
            id=""
            checked={tool === "select"}
            onChange={() => setTool("select")}
          />
          <label htmlFor="select" className="select">
            Select
          </label>
          <input
            type="radio"
            id="line"
            checked={tool === "line"}
            onChange={() => setTool("line")}
          />
          <label htmlFor="line" className="line">
            Line
          </label>
          <input
            type="radio"
            id="rectangle"
            checked={tool === "rectangle"}
            onChange={() => setTool("rectangle")}
          />
          <label htmlFor="rectangle" className="rect">
            Rectangle
          </label>
        </div>
      </div>
      <div style={{ pos: "fixed", bottom: 0, padding: 10 }}>
        <button onClick={undo} className="canvas-btn-1">
          Undo
        </button>
        <button onClick={redo} className="canvas-btn-2">
          Redo
        </button>
        <Link to ='/'>
          <button className="canvas-btn-3">Head back home</button>
        </Link>
      </div>
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        Canvas
      </canvas>
    </div>
  );
};

export default Board;