document.addEventListener('DOMContentLoaded', () => {

    // clearActiveClass

    function clearActiveClass (arr, activeClass) {
        arr.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

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

    // slider in works

    function sliderWorks (slider) {
        const _slider = document.querySelector(slider),
              slides = _slider.querySelectorAll('[data-worksSlide]'),
              prev = _slider.querySelector('[data-worksPrev]'),
              next = _slider.querySelector('[data-worksNext]'),
              slidesSrc = [];

        let startAnimation = null;
            
        const nextSlide = () => {
            slidesSrc.push(slidesSrc.shift());
            slides.forEach((item1, index1) => {
                slidesSrc.forEach((item2, index2) => {
                    if (index1 == index2) {
                        item1.setAttribute('src', item2);
                    }
                });
            });
        };

        const prevSlide = () => {
            slidesSrc.unshift(slidesSrc.pop());
            slides.forEach((item1, index1) => {
                slidesSrc.forEach((item2, index2) => {
                    if (index1 == index2) {
                        item1.setAttribute('src', item2);
                    }
                });
            });
        };

        const step = timestamp => {
            if (!startAnimation) startAnimation = timestamp;
            let progress = timestamp - startAnimation;
            _slider.style.opacity = progress/500;
            if (progress < 500) {
                window.requestAnimationFrame(step);
            }
        }

        slides.forEach(item => {
            slidesSrc.push(`${item.getAttribute('src')}`);
        });

        if (next) {
            next.addEventListener('click', (e) => {
                e.preventDefault();
                window.requestAnimationFrame(step);
                startAnimation = null;
                nextSlide();
            });
        }
        if (prev) {
            prev.addEventListener('click', (e) => {
                e.preventDefault();
                window.requestAnimationFrame(step);
                startAnimation = null;
                prevSlide();
            });
        }
        slides.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (index === 0) {
                    return;
                }
                window.requestAnimationFrame(step);
                startAnimation = null;
                for (let i = 0; i < index; i++) {
                    nextSlide();
                }
            });
        });
    }

    sliderWorks('[data-worksSlider1]');
    sliderWorks('[data-worksSlider2]');
    sliderWorks('[data-worksSlider3]');
    sliderWorks('[data-worksSlider4]');
    sliderWorks('[data-worksSlider5]');

    sliderWorks('[data-worksSliderMin1]');
    sliderWorks('[data-worksSliderMin2]');
    sliderWorks('[data-worksSliderMin3]');
    sliderWorks('[data-worksSliderMin4]');
    sliderWorks('[data-worksSliderMin5]');

    // tabs

    function tabs (buttons, contents, activeClass) {
        const _buttons = document.querySelectorAll(buttons),
              _contents = document.querySelectorAll(contents);

        _buttons.forEach((btn, index1) => {
            btn.addEventListener('click', () => {
                clearActiveClass(_buttons, activeClass);
                clearActiveClass(_contents, activeClass);
                btn.classList.add(activeClass);
                _contents.forEach((content, index2) => {
                    if (index1 === index2) {
                        content.classList.add(activeClass);
                    }
                });
            });
        });
    }

    tabs('.works__types__item--desc', '.works__box', 'active');

          // Функция слайдера
          function slider(window, field, cards, cardWidth, margin, dotsWrap, dotClass, dotClassActive, arrowPrev, arrowNext, arrowClass, sliderName, sliderSlideName) {
            const window_ = document.querySelector(window),
                field_ = document.querySelector(field),
                cards_ = document.querySelectorAll(cards),
                arrowPrev_ = document.querySelector(arrowPrev),
                arrowNext_ = document.querySelector(arrowNext),
                sliderName_ = document.querySelector(sliderName),
                sliderSlideName_ = document.querySelectorAll(sliderSlideName);
    
            let startPoint,
                swipeAction,
                endPoint,
                sliderCounter = 0,
                dots_ = [];
    
            // Устанавливаем фиксированную ширину поля слайдов
    
            field_.style.width = `${cardWidth * cards_.length + (margin * (cards_.length - 1))}px`;
            field_.style.marginLeft = 'auto';
            field_.style.marginRight = 'auto';

            // Имя слайда на плашку

            function slideName () {
                sliderSlideName_.forEach((item, index) => {
                    if (index == sliderCounter) {
                        sliderName_.textContent = item.textContent;
                    }
                });
            }
    
            // Слайд следующий
    
            function slideNext() {
                sliderCounter++;
                arrowNext_.classList.remove(arrowClass);
                arrowPrev_.classList.remove(arrowClass);
                if (sliderCounter >= cards_.length) {
                    sliderCounter = cards_.length - 1;
                }
                if ((sliderCounter + 1) == cards_.length) {
                    arrowNext_.classList.add(arrowClass);
                }
                if (dotsWrap) {
                    dots_.forEach((item, index)=> {
                    item.classList.remove(dotClassActive);
                    if (index == sliderCounter) {
                        item.classList.add(dotClassActive);
                    }
                    });
                }
                field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
                if (sliderName_) {
                    slideName ();
                }
            }
    
            // Слайд предыдущий
    
            function slidePrev() {
                sliderCounter--;
                arrowNext_.classList.remove(arrowClass);
                arrowPrev_.classList.remove(arrowClass);
                if (sliderCounter <= 0) {
                    sliderCounter = 0;
                }
                if (sliderCounter == 0) {
                    arrowPrev_.classList.add(arrowClass);
                }
                if (dotsWrap) {
                    dots_.forEach((item, index)=> {
                        item.classList.remove(dotClassActive);
                        if (index == sliderCounter) {
                            item.classList.add(dotClassActive);
                        }
                    });
                }
                field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
                if (sliderName_) {
                    slideName ();
                }
            }
    
            // Рендер точек
    
            if (dotsWrap) {
                const dotsWrap_ = document.querySelector(dotsWrap);
        
                cards_.forEach(() => {
                    const dot = document.createElement('div');
                    dot.classList.add(dotClass);
                    dotsWrap_.appendChild(dot);
                    dots_.push(dot);
                });
                dots_[0].classList.add(dotClassActive);
                dots_.forEach((item, index) => {
                    item.addEventListener('click', () => {
                    sliderCounter = index;
                    arrowNext_.classList.remove(arrowClass);
                    arrowPrev_.classList.remove(arrowClass);
                    if (sliderCounter == 0) {
                        arrowPrev_.classList.add(arrowClass);
                    }
                    if ((sliderCounter + 1) == cards_.length) {
                        arrowNext_.classList.add(arrowClass);
                    }
                    dots_.forEach(item_ => {
                        item_.classList.remove(dotClassActive);
                    });
                    item.classList.add(dotClassActive);
                    field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
                    });
                });
            }
    
            // Переключение на стрелки
    
            arrowPrev_.addEventListener('click', () => {
                slidePrev();
            });
    
            arrowNext_.addEventListener('click', () => {
                slideNext();
            });
    
            // Свайп слайдов тач-событиями
    
            window_.addEventListener('touchstart', (e) => {
                startPoint = e.changedTouches[0].pageX;
            });
    
            window_.addEventListener('touchmove', (e) => {
                swipeAction = e.changedTouches[0].pageX - startPoint;
                field_.style.transform = `translateX(${swipeAction + (-(cardWidth + margin) * sliderCounter)}px)`;
            });
    
            window_.addEventListener('touchend', (e) => {
                endPoint = e.changedTouches[0].pageX;
                if (Math.abs(startPoint - endPoint) > 50) {
                    arrowNext_.classList.remove(arrowClass);
                    arrowPrev_.classList.remove(arrowClass);
                    if (endPoint < startPoint) {
                        slideNext();
                    } else {
                        slidePrev();
                    }
                } else {
                    field_.style.transform = `translateX(-${(cardWidth + margin) * sliderCounter}px)`;
                }
            });
        }
    
        slider(
            '.works__window',
            '.works__content__field',
            '.works__box--mobile',
            280,
            20,
            false,
            false,
            false,
            '.works__slider__button--prev--mobile',
            '.works__slider__button--next--mobile',
            'works__slider__button--inactive',
            '[data-worksSliderName]',
            '[data-worksSliderSlideName]'
        );
        slider(
            '.team__window--big',
            '.team__field--big',
            '.team__slide--big',
            1520,
            20,
            false,
            false,
            false,
            '.team__button--prev--big',
            '.team__button--next--big',
            'inactive',
        );
        slider(
            '.team__window--medium',
            '.team__field--medium',
            '.team__slide--medium',
            752,
            20,
            false,
            false,
            false,
            '.team__button--prev--medium',
            '.team__button--next--medium',
            'inactive',
        );
        slider(
            '.team__window--small',
            '.team__field--small',
            '.team__card-small',
            280,
            20,
            false,
            false,
            false,
            '.team__button--prev--small',
            '.team__button--next--small',
            'inactive',
        );

});