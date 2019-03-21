import { Component, OnInit } from '@angular/core';
import { FileItem } from '../clases/file-item';
import { LoadImagesService } from 'src/app/providers/load-images.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];
  isOverElement = false;

  constructor( public loadImagesService: LoadImagesService ) { }

  ngOnInit() {
  }


  loadImages() {
    this.loadImagesService.loadImages( this.archivos );
  }

  cleanFiles() {
    this.archivos = [];
  }
}
