import { store } from 'components/redux/store/mainstore';

export default function notificationCreate(text, color='error', wrapper=store.getState().notifWrap) {
    const colors = {
        'warn': { bg: '#ffc107', textColor: '#000' },
        'success': { bg: '#00e644', textColor: '#fff'},
        'error': { bg: '#dc3545', textColor: '#fff'},
        'info': { bg: '#007bff', textColor: '#fff'},
    },
        delay = 3 * 1000; // ms to hide message

    let notifWrap = wrapper,
        notif = document.createElement('div'),
        closeBtn = document.createElement('i');
    function hideNotification () {
        $(notif).slideUp({
            start: function () {
                closeBtn.remove();
            },
            always: function () {
                this.remove();
            }
        })
    }

    closeBtn.classList.add('fas', 'fa-times', 'btn-close');
    closeBtn.addEventListener('click', function () {
        this.parentNode.remove();
    });
    
    notif.textContent = text;
    notif.style.backgroundColor = colors[color].bg;
    notif.style.color = colors[color].textColor;
    notif.appendChild(closeBtn); // ору, эта строка работает только после текст контента
    notif.classList.add('notification');
    notifWrap.appendChild(notif);

    $(notif).slideDown({
        duration: "slow",
        start: function () {
            $(this).css({
                display: "flex"
            })
        }
    }).animate(
        { opacity: 1 },
        { queue: false, duration: 800 }
    );

    let pushTimer = setTimeout(hideNotification, delay);

    notif.addEventListener('mouseenter', () => clearTimeout(pushTimer));
    notif.addEventListener('mouseleave', function (){
        pushTimer = setTimeout(hideNotification, delay);
    });

}