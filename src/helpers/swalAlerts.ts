import Swal from 'sweetalert2'


const AlertSuccess = (title: string, text?: string) => {
    Swal.fire({
        title: title,
        text: text || '',
        icon: 'success',
        confirmButtonColor: 'var(--primary-color)',
    })
}

const AlertDanger = (title: string, text?: string) => {
    Swal.fire({
        title: title,
        text: text || '',
        icon: 'error',
        confirmButtonColor: 'var(--primary-color)',
    })
}


export { AlertSuccess, AlertDanger }
