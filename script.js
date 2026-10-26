const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}

document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(button.dataset.copy);
            showToast(`Đã copy: ${button.dataset.copy}`);
            button.classList.add('copied');
            setTimeout(() => button.classList.remove('copied'), 1500);
        } catch {
            showToast('Không thể copy. Vui lòng thử lại!');
        }
    });
});
