import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from '../components/clases/file-item';

@Injectable({
  providedIn: 'root'
})
export class LoadImagesService {

  private FOLDER_IMG = 'img';

  constructor(private db: AngularFirestore) { }

  loadImages( imgs: FileItem[] ) {
    console.log(imgs);
  }

  private saveImage( img: { nombre: string, url: string } ) {
    this.db.collection(`/${ this.FOLDER_IMG }`)
      .add( img );
  }
}
