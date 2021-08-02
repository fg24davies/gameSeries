class Maze {
  constructor(maze) {
    this.maze = maze;
  }

  isStartPoint = (element) => element == 2;

  // returns the position in the maze in the form of a tuple
  startingPosition = () => {
    //console.log(this.maze[0]);
    for (const point of this.maze) {
      let startPointJ = point.findIndex(this.isStartPoint);
      if (startPointJ > -1) {
        return [this.maze.indexOf(point), startPointJ];
      }
    }
  };

  // takes a direction (string) and position (tuple) and returns new position (tuple)
  newPosition = (direction, position) => {
    if (Array.isArray(position) && position.length === 2) {
      switch (direction) {
        case "E":
          return [position[0], position[1] + 1];
        case "W":
          return [position[0], position[1] - 1];
        case "N":
          return [position[0] - 1, position[1]];
        case "S":
          return [position[0] + 1, position[1]];
      }
    } else {
      throw new Error("Position must be a tuple");
    }
  };

  // calculates the outcome at the maze position
  result = (position) => {
    const mazePoint = this.maze[position[0]][position[1]];
    console.log("mazepoint", mazePoint);

    if (mazePoint === 0 || mazePoint === 2) {
      return "Lost";
    } else if (mazePoint === 1) {
      return "Dead";
    } else if (mazePoint === 3) {
      return "Finish";
    }
  };

  attemptWith = (directions) => {
    let position = this.startingPosition();
    let moveNumber = 0;
    for (const direction of directions) {
      console.log("first position", position);

      position = this.newPosition(direction, position);

      if (position.includes(this.maze.length) || position.includes(-1)) {
        return "Dead";
      }

      let outcome = this.result(position);
      console.log("outcome", outcome);

      moveNumber++;

      if (outcome === "Dead" || outcome === "Finish") {
        return outcome;
      } else if (outcome === "Lost" && moveNumber === directions.length) {
        return "Lost";
      }

      console.log("number of directions", directions.length);
      console.log("movenumber", moveNumber);
      console.log("next position", position);
    }
  };
}

module.exports = Maze;
