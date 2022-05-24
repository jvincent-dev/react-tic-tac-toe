import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useEffect } from "react";

function updateCellColors(event, bgColor, textColor) {
  const currentCell = event.target.parentNode;
  const currentRow = currentCell.parentNode;
  const rows = [...currentRow.parentNode.children]; // board row
  const rowChildNodes = [...currentRow.children]; // make into iterable array
  let cellChildIndex = -1;

  for (let i = 0; i < event.target.parentNode.parentNode.children.length; i++) {
    const child = event.target.parentNode.parentNode.children[i];

    if (child.children[0] === event.target) {
      cellChildIndex = i;
    }
  }

  rowChildNodes.forEach(rowChildNode => { // update row
    rowChildNode.children[0].style.backgroundColor = bgColor;
    rowChildNode.children[0].style.color = textColor;
  });
  rows.forEach(row => { // update col
    row.children[cellChildIndex].children[0].style.backgroundColor = bgColor;
    row.children[cellChildIndex].children[0].style.color = textColor;
  });
}

function CellButton({ children, onClick, isLoading }) {
  return (
    <Button
      className="w-100 m-1 p-4 rounded-0 board-cell"
      variant="outline-dark"
      size="lg"
      disabled={isLoading}
      onClick={onClick}
    >
      {
        isLoading ?
          <Spinner
            as="span"
            animation="border"
            size="sm"
          /> :
          children
      }
    </Button>
  )
}

export default function Board({ boardMatrix = [[]], isLoading = false, onClickCell = () => { } }) {
  useEffect(() => { // highlight row and col of hovered cell
    const bootstrapBlack = "#212529";
    const handleHover = (event) => {
      updateCellColors(event, bootstrapBlack, "white");
    }
    const handleHoverOut = (event) => {
      updateCellColors(event, "white", bootstrapBlack);
    }

    const boardCells = [...document.getElementsByClassName("board-cell")];

    boardCells.forEach(el => {
      el.addEventListener("mouseover", handleHover)
      el.addEventListener("mouseout", handleHoverOut);
    });

    return () => {
      boardCells.forEach(el => {
        el.removeEventListener("mouseover", handleHover)
        el.removeEventListener("mouseout", handleHoverOut);
      });
    }
  }, [boardMatrix])

  return (
    boardMatrix.map((row, rowIndex) => {
      return (
        <Row key={rowIndex} className="board-row">
          {
            row.map((col, colIndex) => {
              return (
                <Col key={"" + rowIndex + colIndex} className="p-1">
                  <CellButton
                    isLoading={isLoading}
                    onClick={() => onClickCell(rowIndex, colIndex)}
                  >
                    {col || "_"}
                  </CellButton>
                </Col>
              );
            })
          }
        </Row>
      );
    })
  );
}