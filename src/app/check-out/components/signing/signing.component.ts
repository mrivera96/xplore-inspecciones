import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { IonLabel, IonItem } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class SigningComponent implements OnInit {
  @ViewChild('canvas') canvasref!: ElementRef<HTMLCanvasElement>;
  canvas: HTMLCanvasElement | undefined = undefined;
  signaturePad: SignaturePad | undefined = undefined;

  @ViewChild('signContainer') signContainer!: ElementRef<HTMLElement>;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.canvas = this.canvasref.nativeElement;

    //const parentWidth = this.signContainer.nativeElement.offsetWidth;

    this.canvas.width = window.innerWidth * 0.70;
    // console.log(parentWidth);

    this.signaturePad = new SignaturePad(this.canvas, {
      backgroundColor: 'white',
    });
  }

  onClean() {
    this.signaturePad?.clear();
  }
}
