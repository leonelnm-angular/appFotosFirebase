import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { FileItem } from '../components/clases/file-item';

@Injectable({
  providedIn: 'root'
})
export class LoadImagesService {

  private FOLDER_IMG = 'img';

  constructor(private db: AngularFirestore) { }

  loadImages( images: FileItem[] ) {
    const storageRef = firebase.storage().ref();

    for (const item of images) {
      item.estaSubiendo = true;
      if ( item.progess >= 100 ) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${ this.FOLDER_IMG }/${ item.nombreArchivo }`)
        .put( item.archivo );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progess = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
        (error) => console.error('Error al subir', error),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(( downloadURL ) => {
            // console.log('Imagen cargada correctamente');
            item.url = downloadURL;
            item.estaSubiendo = false;
            this.saveImage( { nombre: item.nombreArchivo, url: item.url } );
          });
        });

    }
  }

  private saveImage( img: { nombre: string, url: string } ) {
    this.db.collection(`/${ this.FOLDER_IMG }`)
      .add( img );
  }
}
