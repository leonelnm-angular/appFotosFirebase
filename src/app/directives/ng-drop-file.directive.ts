import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../components/clases/file-item';

@Directive({
  selector: '[appNgDropFile]'
})
export class NgDropFileDirective {

  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any) {
    this.mouseSobre.emit( true );
    this.preventStop( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any) {
    this.mouseSobre.emit( false );
    this.preventStop( event );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any) {

    const transferencia = this.getTransferencia( event );

    if ( !transferencia ) {
      return;
    }

    this.extractFiles( transferencia.files );
    this.preventStop( event );

    this.mouseSobre.emit( false );
  }


  private getTransferencia( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extractFiles( archivosLista: FileList ) {

    for (const img of Object.getOwnPropertyNames( archivosLista )) {
      const temp = archivosLista[img];

      if (this.archivoPuedeSerCargado( temp )) {
        this.archivos.push(new FileItem( temp ));
      }
    }


    // console.log( this.archivos );
  }


  // Validations
  private archivoPuedeSerCargado( archivo: File ): boolean {
    if ( !this.fileDropped( archivo.name ) && this.isImage( archivo.type ) ) {
      return true;
    } else {
      return false;
    }
  }

  private preventStop( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private fileDropped( nombreArchivo: string ): boolean {
    for (const archivo of this.archivos) {
      if ( archivo.nombreArchivo === nombreArchivo ) {
        console.log('El archivo ' + nombreArchivo + ' ya existe');
        return true;
      }
    }

    return false;
  }

  private isImage( tipoArchivo: string ): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image');
  }

}
