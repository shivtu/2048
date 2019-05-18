import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { RecordsService } from './records.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fade', [
      transition('void=>*', [
        style({ backgroundColor : 'steelblue', color: '#097054'}),
        // animate(500, style({backgroundColor : 'red'}))
        animate(500)
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  constructor(private records: RecordsService) {}

  mainboard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  moveNumber = 0;
  gameStatus = true;


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.gameStatus) {
      switch (event.key) {
        case 'ArrowUp':
        this.userArrowUp();
        this.moveNumber++;
        break;
        case 'ArrowDown':
        this.userArrowDown();
        this.moveNumber++;
        break;
        case 'ArrowLeft':
        this.userArrowLeft();
        this.moveNumber++;
        break;
        case 'ArrowRight':
        this.userArrowRight();
        this.moveNumber++;
        break;
        default:
        break;
      }
    }
  }

  ngOnInit(): void {
    this.records.populateRandom(this.mainboard);
    this.records.populateRandom(this.mainboard);
  }

  userArrowRight() {
    const boardState = this.records.shiftHorizontal('right', this.mainboard, this.moveNumber);
    boardState.mainboardState = this.mainboard;
    this.moveNumber = boardState.move;
    this.gameStatus = this.records.populateRandom(this.mainboard);
  }

  userArrowLeft() {
    const boardState = this.records.shiftHorizontal('left', this.mainboard, this.moveNumber);
    boardState.mainboardState = this.mainboard;
    this.moveNumber = boardState.move;
    this.gameStatus = this.records.populateRandom(this.mainboard);
  }

  userArrowDown() {
    const boardState = this.records.shiftVertical('down', this.mainboard, this.moveNumber);
    boardState.mainboardState = this.mainboard;
    this.moveNumber = boardState.move;
    this.gameStatus = this.records.populateRandom(this.mainboard);
    // console.table('new state', this.mainboard);
  }

  userArrowUp() {
    const boardState = this.records.shiftVertical('up', this.mainboard, this.moveNumber);
    boardState.mainboardState = this.mainboard;
    this.moveNumber = boardState.move;
    this.gameStatus = this.records.populateRandom(this.mainboard);
  }

  newGame() {
    this.gameStatus = true;
    this.moveNumber = 0;
    this.mainboard = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    this.records.populateRandom(this.mainboard);
    this.records.populateRandom(this.mainboard);
  }
}
