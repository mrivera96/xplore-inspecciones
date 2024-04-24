import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import SignaturePad from 'signature_pad';
import { InspectionsService } from 'src/app/shared/services/inspections.service';

@Component({
  selector: 'app-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class SigningComponent implements OnInit {
  //inyeccion de servicios
  inspectionsService = inject(InspectionsService);

  @ViewChild('canvas') canvasref!: ElementRef<HTMLCanvasElement>;
  canvas: HTMLCanvasElement | undefined = undefined;
  signaturePad: SignaturePad | undefined = undefined;

  @ViewChild('signContainer') signContainer!: ElementRef<HTMLElement>;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.canvas = this.canvasref.nativeElement;

    //const parentWidth = this.signContainer.nativeElement.offsetWidth;

    this.canvas.width = window.innerWidth * 0.7;
    // console.log(parentWidth);

    this.signaturePad = new SignaturePad(this.canvas, {
      backgroundColor: 'white',
    });
  }

  onClean() {
    this.signaturePad?.clear();
  }
}
