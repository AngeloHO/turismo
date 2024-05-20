window.addEventListener("scroll", function () {
    var header = this.document.querySelector('#header')
    header.classList.toggle('rolagem', this.window.scrollY > 0)
})