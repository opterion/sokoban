import SokobanBaseRenderer from './BaseRenderer';
import { CELL_TYPES as CT } from '../Level';


const iSkin = {
    [CT.EMPTY]: 'img/i0.gif',
    [CT.OUT_SPACE]: 'img/i1.gif',
    [CT.WALL]: 'img/i2.gif',
    [CT.TARGET]: 'img/i3.gif',
    [CT.BOX_ON_EMPTY]: 'img/i4.gif',
    [CT.BOX_ON_TARGET]: 'img/i5.gif',
    [CT.PLAYER_ON_EMPTY]: 'img/i6.gif',
    [CT.PLAYER_ON_TARGET]: 'img/i7.gif'
}

const styles = `
    .sokoban-base-renderer tr,
    .sokoban-base-renderer td {
        padding: 0;
        line-height: 0;
    }
`;

export default class SokobanHTMLTableRenderer
    extends SokobanBaseRenderer {
        constructor($element, level) {
            super(...arguments);

            this.$el = $element;
            this.level = level;

            this.injectStyles();
            this.render();
        }

        injectStyles() {
            const $style = document.createElement('style');
            $style.innerHTML = styles;

            document.head.appendChild($style);
        }

        render() {
            let rows = '';
            for(let row of this.level) {
                rows += this.row(row);
            }

            this.$el.innerHTML = `
                <table
                    class="sokoban-base-renderer"
                    cellpadding="0"
                    cellspacing="0"
                 >${rows}</table>`;
        }

        row(row) {
            let cells = '';
            for(let cell of row) {
                cells += this.cell(cell);
            }

            return `<tr>${cells}</tr>`;
        }

        cell(cnum) {
            return `<td><img src="${iSkin[cnum]}"></td>`;
        }

        finishGame() {
            this.$el.innerHTML += `
                <h1>Congratulations!</h1>
            `;
        }
    }