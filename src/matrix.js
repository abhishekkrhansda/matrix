import React, { useState } from 'react';
import './Matrix.css';

const Matrix = () => {
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill('white')));
  const [clickSequence, setClickSequence] = useState([]);

  const handleClick = (rowIndex, colIndex) => {
    if (matrix[rowIndex][colIndex] === 'white') {
      const newMatrix = matrix.map((row, rIdx) => 
        row.map((color, cIdx) => 
          rIdx === rowIndex && cIdx === colIndex ? 'green' : color
        )
      );
      setMatrix(newMatrix);
      setClickSequence([...clickSequence, { rowIndex, colIndex }]);
      
      if (clickSequence.length === 8) {
        const sequence = [...clickSequence, { rowIndex, colIndex }];
        setTimeout(() => {
          let i = 0;
          const interval = setInterval(() => {
            const { rowIndex, colIndex } = sequence[i];
            const newMatrix = matrix.map((row, rIdx) =>
              row.map((color, cIdx) =>
                rIdx === rowIndex && cIdx === colIndex ? 'orange' : color
              )
            );
            setMatrix(newMatrix);
            i++;
            if (i === sequence.length) {
              clearInterval(interval);
            }
          }, 500);
        }, 500);
      }
    }
  };

  return (
    <div className="matrix">
      {matrix.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((color, colIndex) => (
            <div
              className="box"
              key={colIndex}
              style={{ backgroundColor: color }}
              onClick={() => handleClick(rowIndex, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Matrix;

