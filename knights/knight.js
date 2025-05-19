function knightMoves(start, end) {
    const directions = [
      [2, 1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];
  
    const isValid = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;
  
    const queue = [[start, [start]]];
    const visited = new Set();
    visited.add(start.toString());
  
    while (queue.length > 0) {
      const [current, path] = queue.shift();
      const [x, y] = current;
  
      if (x === end[0] && y === end[1]) {
        console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
        path.forEach(pos => console.log(pos));
        return path;
      }
  
      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        const newPos = [newX, newY];
  
        if (isValid(newX, newY) && !visited.has(newPos.toString())) {
          visited.add(newPos.toString());
          queue.push([newPos, [...path, newPos]]);
        }
      }
    }
  }
