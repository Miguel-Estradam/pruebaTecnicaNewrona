import { inject, Injectable } from '@angular/core';
import {
  Auth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  user,
  UserCredential,
} from '@angular/fire/auth';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { User } from '../../dashboard/interfaces/users.interface';
import { Router } from '@angular/router';
import { showErrorMessage } from '../../../common/serviceMessages';

const PATH = 'Users';

const obj = 'Usuario';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);

  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  constructor(private router: Router) {}

  // función para obtener la referencia de un documento en la base de datos
  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }

  //formato de tipos de errores que pueden salir al consultar el usuario
  formatError(errorMessage: string): void {
    switch (errorMessage) {
      case 'auth/user-not-found':
        // 'Email already exists';
        Swal.fire('Oops', 'Usuario no encontrado.', 'error');

        break;
      case 'auth/wrong-password':
        // 'Invalid Password';
        Swal.fire({
          title: 'Oops',
          text: 'Contraseña incorrecta.',
          icon: 'error',
          confirmButtonText: 'Intentar otra vez!',
        });

        break;
      case 'auth/invalid-credential':
        // 'Invalid User';

        Swal.fire({
          title: 'Oops',
          text: 'Correo y/o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Intentar otra vez!',
        });

        break;
      case 'SOMETHING_IS_WRONG':
        Swal.fire({
          title: 'Oops',
          text: 'Algo anda mal por favor contacta con el administrador de la página',
          icon: 'error',
          confirmButtonText: 'Intentar otra vez!',
        });

        break;
      default:
        break;
    }
  }

  async login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        //Verificar que el usuario este dentro de la colección o ha sido eliminado
        const extraData = await this.getUser(userCredential.user.uid);
        if (Object.keys(extraData).length === 0) {
          this.formatError('auth/user-not-found');
          this.signOut();
          throw new Error();
        }
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        this.formatError(error.code);
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          errorCode: error.code,
          errorMessage: error.message,
        });
      });
  }

  async getUser(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as User;
    } catch (error) {
      //catch error
      return {};
    }
  }

  async signOut(): Promise<void> {
    await this.auth.signOut().then(() => this.router.navigate(['/login']));
  }
  async restorePassword(email: string) {
    const snapshot = await getDocs(
      query(this._collection, where('email', '==', email))
    );
    //verificar si existe el usuario
    if (snapshot.docs.length == 0) {
      Swal.fire({
        title: 'Oops',
        html: 'Correo electrónico invalido',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return Promise.reject();
    }
    await sendPasswordResetEmail(this.auth, email)
      .then(() => {
        Swal.fire({
          title: '¡Correo enviado!',
          text: 'por favor revisa también la bandeja de SPAM',
          icon: 'success',
        });
      })
      .catch((error) => {
        const errorMessage =
          error.code === 'auth/user-not-found'
            ? 'Usuario no encontrado en nuestra base de datos, si desea registrarse en nuestra plataforma llámenos o escríbenos por WhatsApp<br>+57 3028619748'
            : `Por favor intenta nuevamente (${error.message})`;
        Swal.fire({
          title: '¡Ocurrió un error!',
          icon: 'error',
          html: errorMessage,
        });
      });
  }
}
