export const CELL_TYPES = {
	OUT_SPACE: 1,
	EMPTY: 2,
	WALL: 4,
	TARGET: 8,
	BOX: 16,
	PLAYER: 32
};
CELL_TYPES.BOX_ON_EMPTY =  CELL_TYPES.BOX | CELL_TYPES.EMPTY;
CELL_TYPES.BOX_ON_TARGET =  CELL_TYPES.BOX | CELL_TYPES.TARGET;
CELL_TYPES.PLAYER_ON_EMPTY =  CELL_TYPES.PLAYER | CELL_TYPES.EMPTY;
CELL_TYPES.PLAYER_ON_TARGET =  CELL_TYPES.PLAYER | CELL_TYPES.TARGET;


const DIRECTIONS = {
	LEFT: {x: -1, y: 0},
	UP: {x: 0, y: -1},
	RIGHT: {x: 1, y: 0},
	DOWN: {x: 0, y: 1}
};


export class SokobanLevel {
	constructor(level) {
		if(!level.length && !level[0].length) {
			throw new Error("Level can't be empty");
		}

		this.level = level;
		this.findPlayerPosition();
	}

	findPlayerPosition() {
		const lvl = this.level;

		for(let y = 0; y < lvl.length; y++) {
			for(let x = 0; x < lvl[y].length; x++) {
				if(lvl[y][x] & CELL_TYPES.PLAYER) {
					return this.playerPosition = {x,y};
				}
			}
		}
	}

	applyDirection(position, direction) {
		return {
			x: position.x + direction.x,
			y: position.y + direction.y
		};
	}

	isInRange(x, y) {
		return y > 0 && y < this.level.length &&
				x > 0 && x < this.level[y].length;
	}

	canIGo(direction, fromPosition, isBoxBehind) {
		const startPos = fromPosition || this.playerPosition;
		const {x, y} = this.applyDirection(startPos, direction);
		const ahead = this.level[y][x];

		if(!this.isInRange(x, y)) {
			return false;
		}
		// if wall in front
		if(ahead === CELL_TYPES.WALL) {
			return false;
		}
		// if pushing box/box on target
		if(ahead & CELL_TYPES.BOX) {
			// check if box not rest against
			return isBoxBehind ?
				false : this.canIGo(direction, {x, y}, true);
		}

		return true;
	}

	go(direction) {
		if(!this.canIGo(direction)) return false;

		let {x, y} = this.playerPosition;
		let {x: dx, y: dy} = this.applyDirection(this.playerPosition, direction);
		let {x: ddx, y: ddy} = this.applyDirection({x: dx, y: dy}, direction);

		// if box ahead then push it
		if(this.level[dy][dx] & CELL_TYPES.BOX) {
			this.level[dy][dx] ^= CELL_TYPES.BOX;
			this.level[ddy][ddx] |= CELL_TYPES.BOX;
		}

		// move player
		this.level[y][x] ^= CELL_TYPES.PLAYER;
		this.level[dy][dx] |= CELL_TYPES.PLAYER;
		this.playerPosition = {x: dx, y: dy};

		return true;
	}

	goLeft() {
		this.go(DIRECTIONS.LEFT);
	}
	goUp() {
		this.go(DIRECTIONS.UP);
	}
	goRight() {
		this.go(DIRECTIONS.RIGHT);
	}
	goDown() {
		this.go(DIRECTIONS.DOWN);
	}

	isFinished() {
		// if at least one box not on target - it is not finished
		for(let row of this.level)
			for(let cell of row)
				if(cell === CELL_TYPES.BOX_ON_EMPTY) return false;

		return true;
	}
}