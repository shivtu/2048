import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor() { }

    /* shift all elements up & merge same elements;
      1 col at a time */
    shiftVertical(vShift: string, mainboard: any, moveNumber: number) {

      // console.time("setBoard");
      let q = 3;
      while (q >= 0) {

          /* Re-initialize tempArray for every col */
          let tempArray = [];

          /* Re-initialize p for every col */
          let p = 0;

          while (p <= 3) {
            tempArray.push(mainboard[p][q]);
            p++;
          }

          /* Merge cells with same values */

          for (let i = 0; i < 4; i++) {
              if ((tempArray[i] !== 0 || undefined) && tempArray[i] === tempArray[i + 1] && (i + 1 < 4)) {
                tempArray[i] = tempArray[i] * 2;
                tempArray[i + 1] = 0;
                moveNumber = moveNumber + tempArray[i];

              } else if ((tempArray[i] !== 0 || undefined) && (tempArray[i + 1] === 0 || undefined)
              && tempArray[i] === tempArray[i + 2] && (i + 2 < 4)) {
                tempArray[i] = tempArray[i] * 2;
                tempArray[i + 2] = 0;
                moveNumber = moveNumber + tempArray[i];

              } else if ((tempArray[i] !== 0 || undefined) && (tempArray[i] === tempArray[i + 3]) && (tempArray[i + 1] === 0 || undefined)
                && (tempArray[i + 2] === 0 || undefined) && (tempArray[i + 3] !== 0 || undefined) && (i + 3 < 4)) {
                  tempArray[i] = tempArray[i] * 2;
                  tempArray[i + 3] = 0;
                  moveNumber = moveNumber + tempArray[i];
              }
            }

          /* Filter all elements greater than 0 */

          tempArray = tempArray.filter(val => val);

            // debugger;

            /* Concat 0's to remaining size of the array
            and shift non zero values to the left of the array */

          let temp: number = 4 - tempArray.length;
          while (temp > 0) {
              tempArray = tempArray.concat(0);
              temp--;
            }

          /* Replace the main board values with tempArray */
          if (vShift === 'up') {
            let x = 0;
            while (x <= 3) {
              mainboard[x][q] = tempArray[x];
              x++;
              }
          } else if (vShift === 'down') {

            /* filter all elements greater than 0 */

            tempArray = tempArray.filter(val => val);
            let nextTemp = 4 - tempArray.length;

            /* Create an array with 0's (nextArray) to remaining length of the tempArray */

            let nextArray = [];
            while (nextTemp > 0) {
              nextArray = nextArray.concat(0);
              nextTemp--;
            }

            /* Concat tempArray to nextArray array */

            nextArray = nextArray.concat(tempArray);
            // break;

            /* fill the mainboard col with the new array (nextArray) */

            let t = 0;
            while (t <= 3) {
              // debugger;
              mainboard[t][q] = nextArray[t];
              t++;
            }
            // break;
          }
          q--;
      }
        // console.timeEnd("setBoard");
      return {mainboardState: mainboard, move: moveNumber};
    }



    /* shift all elements up & merge same elements;
      1 col at a time */
    shiftHorizontal(hShift: string, mainboard: any, moveNumber: number) {

      /* Merge cells with same values */


      /* Pack elements to the right of the array */

      let tempArray = [];
      let rows = 0;

      while (rows < 4) {
        for (let i = 0; i < 4; i++) {
          tempArray.push(mainboard[rows][i]);
        }
        /* Filter all elements greater than 0 */
        tempArray = tempArray.filter(val => val);
        console.log('temparray', tempArray);

        let nextTemp = 4 - tempArray.length;
        // console.log('4-tempArray length', nextTemp);
        let nextArray = [];
        while (nextTemp > 0) {
          nextArray = nextArray.concat(0);
          nextTemp--;
      }
        console.log('nextArray', nextArray);
        if (hShift === 'right') {
          tempArray = nextArray.concat(tempArray);
          for (let q = 0; q < 4; q++) {
            mainboard[rows][q] = tempArray[q];
          }
        }
        console.log('final', tempArray);
        rows++;
        tempArray = [];
      }
    }

    populateRandom(mainboard: any[][]) {
      // console.table(this.mainboard);
      const validSpot: any = [];
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (mainboard[i][j] ===  0 || mainboard[i][j] === undefined) {
            validSpot.push({x: i, y: j});
          }
        }
      }
      // console.log(validSpot.length);
      if (validSpot.length > 0) {
        const r = Math.random() < 0.5 ? 2 : 4;
        const rand = validSpot[Math.floor(Math.random() * validSpot.length)];
        mainboard[rand.x][rand.y] = r;
        return true;
      } else {
        alert('Game Over!');
        return false;
      }
    }
}
