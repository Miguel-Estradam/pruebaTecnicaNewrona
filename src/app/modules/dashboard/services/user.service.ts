import { Injectable, inject } from '@angular/core';
import { initializeApp } from '@angular/fire/app';

import {
  Auth,
  user,
  signInWithEmailAndPassword,
  UserCredential,
  getAuth,
  deleteUser,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { User, UserForm } from '../interfaces/users.interface';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from '@angular/fire/firestore';
import {
  showErrorMessage,
  showSuccessMessage,
} from '../../../common/serviceMessages';
import { Observable } from 'rxjs';

//nombre de la colección
const PATH = 'Users';

// variable que se envía a serviceMessange para identificar la sección donde se genera la alerta
const obj = 'Usuario';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private auth: Auth = inject(Auth);
  public user$ = user(this.auth);
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);
  constructor() {}

  // función para obtener la referencia de un documento en la base de datos
  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }

  //crear usuario en auth
  async signIn(email: string, password: string): Promise<string> {
    try {
      // Initialize Firebase app
      const secondaryApp = initializeApp(environment.firebase, 'SecondaryApp');
      const auth = getAuth(secondaryApp);

      // Crear usuario con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // cerrar sesión de usuario después de 5 segundos
      setTimeout(() => {
        auth.signOut();
      }, 5000);

      return user.uid;
    } catch (error: any) {
      // Handle error
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        title: '¡Ocurrió un error!',
        icon: 'error',
        html: `${errorCode}: ${errorMessage}`,
      });
      return Promise.reject(error);
    }
  }

  async createUser(user: UserForm): Promise<void> {
    try {
      const createdAt = serverTimestamp();
      const snapshot = await getDocs(
        query(this._collection, where('email', '==', user.email))
      );
      //verificar si existe el usuario
      if (snapshot.docs.length > 0) {
        showErrorMessage({
          obj,
          error: 'El usuario ya existe, o el correo ya esta en uso ',
          action: 'add',
        });
        return Promise.reject();
      }
      const uid = await this.signIn(user.email, user.password);
      await setDoc(this.document(uid), {
        name: user.name,
        email: user.email,
        rol: 'gerente',
        createdAt,
      });
      showSuccessMessage({ obj, action: 'add' });
    } catch (error) {
      showErrorMessage({ obj, error, action: 'add' });
      return Promise.reject();
    }
  }

  //obtener usuarios
  getUsers() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<
      Worker[]
    >;
  }

  //eliminar usuario
  async deleteUser(id: string): Promise<void> {
    try {
      await deleteDoc(this.document(id));
      // El usuario ha sido eliminado correctamente
      showSuccessMessage({ obj, action: 'delete' });
    } catch (error) {
      showErrorMessage({ obj, error, action: 'delete' });
      return Promise.reject();
    }
  }
}
