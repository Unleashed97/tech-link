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

export const handleForm = () => {
    const formList = document.querySelectorAll('.form')

    if (formList.length) {
        formList.forEach((form) => {
            const formSubmitBtn = form.querySelector('.form__btn')

            formSubmitBtn.addEventListener('click', (e) => {
                e.preventDefault()

                let errors = formValidate(form)

                if (errors === 0) {
                    const modal = form.closest('.modal')

                    modal.classList.remove('active')

                    const body = document.body
                    const scrollY = body.style.top
                    body.style.position = ''
                    window.scrollTo(0, parseInt(scrollY || '0') * -1)

                    alert('Форма отправлена')
                }
            })
        })

        function formValidate(form) {
            let error = 0
            let requiredFields = form.querySelectorAll('[required]')

            requiredFields.forEach((field) => {
                formRemoveError(field)

                if (
                    field.getAttribute('type') === 'checkbox' &&
                    field.checked === false
                ) {
                    formAddError(field)
                    error++
                } else {
                    if (field.value === '') {
                        formAddError(field)
                        error++
                    }
                }
            })

            return error
        }

        function formAddError(field) {
            if (field.type === 'checkbox') {
                const label = field.closest('.form__label')

                label.querySelector('.form__check-field').classList.add('error')
            }

            field.classList.add('error')
            const fieldParentBlock = field.closest('.form__group')
            fieldParentBlock.classList.add('error')
        }
        function formRemoveError(field) {
            if (field.type === 'checkbox') {
                const label = field.closest('.form__label')

                label
                    .querySelector('.form__check-field')
                    .classList.remove('error')
            }

            field.classList.remove('error')
            const fieldParentBlock = field.closest('.form__group')
            fieldParentBlock.classList.remove('error')
        }

        const fileBlock = document.querySelector('.file')

        if (fileBlock) {
            const filePlaceholder = fileBlock.querySelector(
                '.file__content-block',
            )

            const filePreview = fileBlock.querySelector('.file__preview')

            const fileInput = fileBlock.querySelector('.form__file')
            const fileBufferBtn = fileBlock.querySelector('.file__btn-buffer')
            const fileAddImgBtn = fileBlock.querySelector('.file__btn-add')
            const fileLabel = fileBlock.querySelector('#file-label')

            const files = []

            fileLabel.addEventListener('drop', handleDrop, false)

            function handleDrop(e) {
                let dt = e.dataTransfer
                files = dt.files

                filePlaceholder.classList.add('hide')
                uploadFiles(fileInput.files)
            }

            fileAddImgBtn.addEventListener('click', () => {
                fileInput.click()
            })

            window.addEventListener('paste', (e) => {
                fileInput.files = e.clipboardData.files

                console.log(e.clipboardData.files)

                filePlaceholder.classList.add('hide')
                uploadFiles(fileInput.files)
            })

            fileBufferBtn.addEventListener('click', async () => {
                const clipboardContents = await navigator.clipboard.read()
                for (const item of clipboardContents) {
                    if (!item.types.includes('image/png')) {
                        throw new Error('Clipboard contains non-image data.')
                    }
                    const blob = await item.getType('image/png')

                    fileInput.files = new File(
                        URL.createObjectURL(blob),
                        'filename',
                    )
                }

                console.log(clipboardContents)
                fileInput.files = clipboardContents

                // filePlaceholder.classList.add('hide')
                // uploadFiles(fileInput.files)
            })

            fileInput.addEventListener('change', () => {
                filePlaceholder.classList.add('hide')
                uploadFiles(fileInput.files)
            })

            function uploadFiles(filesList) {
                files.push(...filesList)
                updateThumbnails()
            }

            function removeFile(name) {
                const index = files.findIndex((file) => file.name === name)
                if (index === -1) return
                files.splice(index, 1)

                updateThumbnails()
            }

            function makeThumbnail(file) {
                return new Promise((resolve) => {
                    const reader = new FileReader()

                    function onLoad(event) {
                        filePreview.classList.add('show')
                        const fileImage = `<div class="image__wrapper">
                                <button type="button" data-target="${file.name}" class="btn btn-remove-file">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="8" fill="#F67F29"/>
                                        <path d="M5.17188 10.8284L10.8287 5.17158" stroke="white"/>
                                        <path d="M5.17188 5.17157L10.8287 10.8284" stroke="white"/>
                                    </svg>
                                </button>
                                <img src="${event.target.result}" alt="${file.name}">`
                        filePreview.insertAdjacentHTML('beforeend', fileImage)

                        const btn = filePreview.querySelectorAll('.btn')
                        btn.forEach((btn) =>
                            btn.addEventListener('click', () =>
                                removeFile(btn.getAttribute('data-target')),
                            ),
                        )
                    }

                    reader.onload = onLoad
                    reader.onerror = () => resolve(null)

                    reader.readAsDataURL(file)
                })
            }

            function removeChildren(node) {
                while (node.lastChild) node.lastChild.remove()
                return node
            }

            function updateThumbnails() {
                const thumbnails = document.querySelector('.file__preview')
                thumbnails.innerHTML = ''
                const input = document.querySelector('.form__file')
                input.value = ''

                // files.map(file => {})
                if (files.length) {
                    Promise.all(files.map(makeThumbnail))
                        .then((images) => {
                            images.filter((img) => img !== null)
                        })
                        .then((images) =>
                            removeChildren(thumbnails).append(...images),
                        )
                } else {
                    thumbnails.classList.remove('show')
                    filePlaceholder.classList.remove('hide')
                }
            }

            // function removeFile(e) {
            //     ;`   `
            //     console.log(e)
            // }

            // function uploadFile(files) {
            //     Object.keys(files).forEach((i) => {
            //         const file = files[i]
            //         const reader = new FileReader()
            //         reader.onload = (e) => {
            //             filePreview.classList.add('show')
            //             filePreview.innerHTML += `<div class="image__wrapper">
            //             <button type="button" class="btn btn-remove-file" onclick="removeFile()">
            //                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            //                     <circle cx="8" cy="8" r="8" fill="#F67F29"/>
            //                     <path d="M5.17188 10.8284L10.8287 5.17158" stroke="white"/>
            //                     <path d="M5.17188 5.17157L10.8287 10.8284" stroke="white"/>
            //                 </svg>
            //             </button>
            //             <img src="${e.target.result}" alt="Фото">
            //         </div>`
            //         }
            //         reader.readAsDataURL(file)
            //     })
            // }
        }
    }
}
