export const handleModal = () => {
    const modals = document.querySelectorAll('.modal')

    const modalOpenBtns = document.querySelectorAll('.modal-open-btn')

    if (modalOpenBtns.length) {
        modalOpenBtns.forEach((btn) =>
            btn.addEventListener('click', () => {
                const modal = document.querySelector(
                    `.${btn.getAttribute('data-target')}`,
                )

                if (modal) {
                    modal.classList.add('active')
                    // document.body.classList.add('fixed')

                    const scrollY =
                        document.documentElement.style.getPropertyValue(
                            '--scroll-y',
                        )
                    modal.style.top = `${scrollY}`
                    const body = document.body
                    body.style.position = 'fixed'
                    body.style.top = `-${scrollY}`

                    const modalCloseBtn = modal.querySelector('.modal__close')

                    if (modalCloseBtn) {
                        modalCloseBtn.addEventListener('click', () => {
                            modal.classList.remove('active')
                            // document.body.classList.remove('fixed')

                            const body = document.body
                            const scrollY = body.style.top
                            body.style.position = ''
                            window.scrollTo(0, parseInt(scrollY || '0') * -1)
                        })
                    }
                    window.addEventListener('click', (e) => {
                        if (e.target === modal) {
                            modal.classList.remove('active')
                            // document.body.classList.remove('fixed')

                            const body = document.body
                            const scrollY = body.style.top
                            body.style.position = ''
                            window.scrollTo(0, parseInt(scrollY || '0') * -1)
                        }
                    })
                }
            }),
        )

        window.addEventListener('scroll', () => {
            document.documentElement.style.setProperty(
                '--scroll-y',
                `${window.scrollY}px`,
            )
        })
    }
}

export const handleFileUpload = () => {
    const fileBlock = document.querySelector('.file')
}
