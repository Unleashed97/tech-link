export const handleBurger = () => {
    const headerInner = document.querySelector('.header__inner')
    const burger = document.querySelector('.burger')

    if (burger && headerInner) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active')
            headerInner.classList.toggle('active')
        })

        window.addEventListener('resize', (e) => {
            // while resize if width more than md css var
            if (e.target.outerWidth > 768) {
                burger.classList.remove('active')
                headerInner.classList.remove('active')
            }
        })
    }
}

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

export const handleAccordion = () => {
    const accordion = document.querySelector('.accordion')

    if (accordion) {
        const accordionBtns = accordion.querySelectorAll('.accordion__item-btn')

        accordionBtns.forEach((btn) =>
            btn.addEventListener('click', () => {
                const accordionItem = btn.closest('.accordion__item')
                const accordionCollapse = accordionItem.querySelector(
                    '.accordion__item-collapse',
                )

                accordionCollapse.classList.toggle('active')
                btn.classList.toggle('active')
            }),
        )
    }
}

export const handleTabs = () => {
    const tabs = document.querySelector('.tabs')
    const tabsContent = document.querySelector('.tabs__content')
    if (tabs && tabsContent) {
        const tabsBtns = tabs.querySelectorAll('.tabs__nav-btn')

        const tabsPanes = tabsContent.querySelectorAll('.tabs__pane')

        tabsBtns.forEach((btn) =>
            btn.addEventListener('click', () => {
                tabsPanes.forEach((pane) => pane.classList.remove('active'))
                tabsBtns.forEach((btn) => btn.classList.remove('active'))

                const targetId = btn.getAttribute('data-target')

                btn.classList.toggle('active')
                tabsContent
                    .querySelector(`${targetId}`)
                    .classList.toggle('active')
            }),
        )
    }
}
