import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  doc,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc,
  where,
  query,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Worker, WorkerForm } from '../interfaces/workers.interface';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../common/serviceMessages';

// nombre de la colección
const PATH = 'Workers';

// variable que se envía a serviceMessange para identificar la sección donde se genera la alerta
const obj = 'Operario';
@Injectable({
  providedIn: 'root',
})
export class WorkersService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  constructor() {}

  // función para obtener la referencia de un documento en la base de datos
  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }

  //obtener operarios
  getWorkers() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<
      Worker[]
    >;
  }
  //crear operarios
  async createWorker(worker: WorkerForm) {
    try {
      const createdAt = serverTimestamp();
      const snapshot = await getDocs(
        query(this._collection, where('cedula', '==', worker.cedula))
      );
      //verificar si existe el operario
      if (snapshot.docs.length > 0) {
        showErrorMessage({
          obj,
          error: 'El operario con esa cédula ya existe ',
          action: 'add',
        });
        return Promise.reject();
      }
      await addDoc(this._collection, { ...worker, createdAt });

      showSuccessMessage({ obj, action: 'add' });
      return true;
    } catch (error) {
      showErrorMessage({ obj, error, action: 'add' });
      return Promise.reject();
    }
  }
  //actualizar operarios
  async updateWorker(id: string, workerData: WorkerForm) {
    try {
      await updateDoc(this.document(id), { ...workerData });

      showSuccessMessage({ obj, action: 'update' });
    } catch (error) {
      showErrorMessage({ obj, error, action: 'update' });
      return Promise.reject();
    }
  }
  //eliminar operarios
  async deleteWorker(id: string) {
    try {
      await deleteDoc(this.document(id));
      showSuccessMessage({ obj, action: 'delete' });
    } catch (error) {
      showErrorMessage({ obj, error, action: 'delete' });
      return Promise.reject();
    }
  }
}
