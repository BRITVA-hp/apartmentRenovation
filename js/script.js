document.addEventListener('DOMContentLoaded', () => {

    // range

    function range (input, track, value) {
        const rangeInput = document.querySelector(input),
              rangeTrack = document.querySelector(track),
              rangeNum = document.querySelector(value);

        rangeInput.addEventListener('input', function() {
            let val = +this.value,
                min = +this.getAttribute('min'),
                max = +this.getAttribute('max'),
                step = +this.getAttribute('step'),
                position = 100 / (max - step) * (val - step);

            rangeTrack.style.width = `${position}%`;
            rangeNum.textContent = `${val}`;
            this.setAttribute('value', `${val}`);
        });
    }

    range(".price__range__input", ".price__range__track", ".price__range__track__value");

});