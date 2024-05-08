import Swal from 'sweetalert2';

const actionTextMap = {
  add: 'registro',
  update: 'actualizo',
  delete: 'elimino',
  deleteMany: 'eliminaron',
  repair: 'reparo',
};

export const showAlert = (message: string) => {
  Swal.fire({
    html: message,
    icon: 'info',
    confirmButtonText: 'Ok',
  });
};

export const showError = (message: string) => {
  Swal.fire({
    title: 'Oops',
    html: message,
    icon: 'error',
    confirmButtonText: 'Ok',
  });
};

type showErrorProps = {
  obj: string;
  error?: any;
  action: 'add' | 'update' | 'delete' | 'deleteMany' | 'repair';
};

export const showErrorMessage = ({ obj, error, action }: showErrorProps) => {
  const actionText = actionTextMap[action];
  const message = `Algo anda mal, no se ${actionText} el ${obj}.<br> ${error}`;
  showError(message);
};

type showSuccessMessageProps = {
  obj: string;
  action: 'add' | 'update' | 'delete' | 'deleteMany';
};

export const showSuccessMessage = ({
  obj,
  action,
}: showSuccessMessageProps) => {
  const actionText = actionTextMap[action];
  Swal.fire({
    text: `¡${obj} se ${actionText} con éxito!`,
    icon: 'success',
  });
};
