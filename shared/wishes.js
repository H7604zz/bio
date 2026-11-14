// Đọc file txt (mỗi dòng một lời; bỏ dòng trống và dòng bắt đầu bằng #), hiện lần lượt từng lời, từng chữ một.
// Tải lại file sau mỗi vòng nên sửa file là thấy. Tốc độ: 70 (ms/chữ), 3500 (thời gian đọc), 1200 (nghỉ giữa hai lời).
function startWishes(box, url, fallback) {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    async function load() {
        try {
            const r = await fetch(url + '?t=' + Date.now(), { cache: 'no-store' });
            if (!r.ok) throw 0;
            const lines = (await r.text()).split(/\r?\n/).map(s => s.trim()).filter(s => s && !s.startsWith('#'));
            if (lines.length) return lines;
        } catch {}
        return [fallback];   // dự phòng khi không đọc được file (vd. mở thẳng bằng file://)
    }
    (async () => {
        for (;;) {
            for (const line of await load()) {
                let i = 0;
                box.replaceChildren(...line.split(' ').flatMap(word => {
                    const w = document.createElement('span');
                    w.className = 'w';
                    for (const ch of word) {
                        const c = document.createElement('span');
                        c.className = 'c';
                        c.textContent = ch;
                        c.style.animationDelay = i++ * 70 + 'ms';
                        w.append(c);
                    }
                    return [w, ' '];
                }));
                box.classList.add('show');
                await sleep(i * 70 + 3500);
                box.classList.remove('show');
                await sleep(1200);
            }
        }
    })();
}
