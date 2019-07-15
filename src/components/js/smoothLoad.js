window.addEventListener('load', () => {
    document.querySelector('.loader').classList.add('fadeOut');
    document.querySelector('#root').classList.remove('hidden');
    setTimeout(() => {
        document.querySelector('.loader').remove();
        document.querySelector('#root').classList.add('fadeIn');
    }, 500);
});