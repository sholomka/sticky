let App = React.createClass({
    componentDidMount: function() {
        let container = document.querySelector('.container'),
            sticky = document.querySelectorAll('.bar');

        Array.prototype.forEach.call(sticky, (item, index) => {
            let div = null,
                position = 0;

            window.addEventListener('scroll', () => {
                if (div == null) {
                    let stickyStyles = getComputedStyle(item, ''), divStyles = '';

                    for (let i = 0, count = stickyStyles.length; i < count; i++) {
                        if (stickyStyles[i].indexOf('overflow') == 0 || 
                            stickyStyles[i].indexOf('height') == 0 ||
                            stickyStyles[i].indexOf('padding') == 0 ||
                            stickyStyles[i].indexOf('border') == 0 ||
                            stickyStyles[i].indexOf('outline') == 0 ||
                            stickyStyles[i].indexOf('box-shadow') == 0 ||
                            stickyStyles[i].indexOf('background') == 0) {
                                divStyles += stickyStyles[i] + ': ' +stickyStyles.getPropertyValue(stickyStyles[i]) + '; '
                        }
                    }

                    div = document.createElement('div');
                    div.style.cssText = divStyles + ' box-sizing: border-box; width: ' + item.offsetWidth + 'px;';
                    item.appendChild(div);
                    item.style.height = div.getBoundingClientRect().height + 'px';
                    item.style.padding = '0';
                    item.style.border = '0';
                }

                let coords = item.getBoundingClientRect(),
                    distance,
                    coordsHeight = coords.top + div.getBoundingClientRect().height;

                if (sticky[index+1] != undefined) {
                    distance = Math.round(coordsHeight - sticky[index+1].getBoundingClientRect().top + 5);
                } else {
                    distance = Math.round(coordsHeight - container.getBoundingClientRect().bottom + parseFloat(getComputedStyle(container, '').paddingBottom.slice(0, -2)));
                }

                if ((coords.top - position) <= 0) {
                    if ((coords.top - position) <= distance) {
                        div.className = 'relative';
                        div.style.top = - distance +'px';
                    } else {
                        div.className = 'sticky';
                        div.style.top = position + 'px';
                    }
                } else {
                    div.className = 'relative';
                    div.style.top = '0';
                }
                window.addEventListener('resize', function() {
                    item.children[0].style.width = getComputedStyle(item, '').width
                }, false);
            });
        });
    },

    render: () => (
        <div className="container">
            <div className="placeholder"></div>
            <div className="bar"></div>
            <div className="placeholder"></div>
            <div className="bar"></div>
            <div className="placeholder"></div>
            <div className="placeholder"></div>
            <div className="placeholder"></div>
            <div className="placeholder"></div>
        </div>
    )
});

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
