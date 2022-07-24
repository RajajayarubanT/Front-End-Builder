
class UserMessageUiController {

    constructor(globalstore) {
        this.globalstore = globalstore
        this.projectContainer = document.querySelector('.project-canvus-section')

        this.container = this.makeContainer()
    }

    makeContainer() {
        let container = document.createElement('div')

        container.classList.add('user-message-container')

        container.style.top = '10px'
        container.style.left = 250

        container.innerHTML = `
        <div class="user-message-container-item"></div>
        <i class='user-message-container-cancel bx bx-x'></i>
        `
        return container;
    }
    show(message = undefined) {

        message = message || 'Notification'

        this.container.style.display = 'flex'
        this.container.children[0].innerHTML = message

        this.projectContainer.appendChild(this.container)

        this.container.style.left = `${(innerWidth / 2) - this.container.offsetWidth / 2}px`

        this.container.children[1].addEventListener('click', (e) => this.hide())
    }

    hide() {

        this.container.style.display = 'none'
        this.container.children[1].innerHTML = ``

        this.projectContainer.removeChild(this.container)

    }
}

export default UserMessageUiController;