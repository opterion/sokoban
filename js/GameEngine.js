import { CELL_TYPES as CT, SokobanLevel } from './Level';


export default class SokobanGameEngine {
	constructor(level, renderFn, finishFn) {
		this.level = new SokobanLevel(level);

		this.renderFn = renderFn;
		this.finishFn = finishFn;
	}

	moveDone() {
		this.renderFn();

		if(this.level.isFinished()) {
			this.finishFn();
		}
	}

	goLeft() {
		this.level.goLeft() + this.moveDone();
	}
	goUp() {
		this.level.goUp() + this.moveDone();
	}
	goRight() {
		this.level.goRight() + this.moveDone();
	}
	goDown() {
		this.level.goDown() + this.moveDone();
	}

	exitGame() {}
}