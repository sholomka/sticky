class Stiky {
    constructor() {
        this.container = document.querySelector('.container');
        this.sticky = document.querySelectorAll('.bar');

        Array.prototype.forEach.call(this.sticky, (a, index) => {
            let b = null, P = 0;

            window.addEventListener('scroll', () => {
              

                if (b == null) {
                    let Sa = getComputedStyle(a, ''), s = '';
                    
                    for (let i = 0, count = Sa.length; i < count; i++) {
                        if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
                            s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
                        }
                    }

                    b = document.createElement('div');
                    b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';

                    a.insertBefore(b, a.firstChild);

                    for (let i = 1, l = a.childNodes.length; i < l; i++) {
                        b.appendChild(a.childNodes[1]);
                    }

                    a.style.height = b.getBoundingClientRect().height + 'px';
                    a.style.padding = '0';
                    a.style.border = '0';
                }

                let Ra = a.getBoundingClientRect(), R, Rh = Ra.top + b.getBoundingClientRect().height;

                if (this.sticky[index+1] != undefined) {
                    R = Math.round(Rh - this.sticky[index+1].getBoundingClientRect().top + 5);  // расстояние между блоками, чтобы плавающие элементы не прижимались вплотную друг к другу
                } else {
                    R = Math.round(Rh - this.container.getBoundingClientRect().bottom + parseFloat(getComputedStyle(this.container, '').paddingBottom.slice(0, -2)));
                }

                if ((Ra.top - P) <= 0) {
                    if ((Ra.top - P) <= R) {
                        b.className = 'stop';
                        b.style.top = - R +'px';
                    } else {
                        b.className = 'sticky';
                        b.style.top = P + 'px';
                    }
                } else {
                    b.className = 'stop';
                    b.style.top = '0';
                }
                window.addEventListener('resize', function() {
                    a.children[0].style.width = getComputedStyle(a, '').width
                }, false);
            }, false);
        });
    }
}

new Stiky();