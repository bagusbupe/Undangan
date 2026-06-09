import Swal from 'sweetalert2';

export function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    Swal.fire({
      icon: 'success',
      title: 'Berhasil Di Copy',
      timer: 2000,
      showConfirmButton: false,
    });
  });
}
