export const handleModal = () => {
    const modal = document.querySelector('.modal')

    if (modal) {
        const modalCloseBtn = modal.querySelector('.modal__close')

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                modal.classList.remove('active')
            })
        }
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active')
            }
        })
    }
}
