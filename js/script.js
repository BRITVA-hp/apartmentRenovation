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
    tabs('[data-sumTab]', '[data-sumTabsContent]', 'active');

          // ?????????????? ????????????????
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
    
            // ?????????????????????????? ?????????????????????????? ???????????? ???????? ??????????????
    
            field_.style.width = `${cardWidth * cards_.length + (margin * (cards_.length - 1))}px`;
            field_.style.marginLeft = 'auto';
            field_.style.marginRight = 'auto';

            // ?????? ???????????? ???? ????????????

            function slideName () {
                sliderSlideName_.forEach((item, index) => {
                    if (index == sliderCounter) {
                        sliderName_.textContent = item.textContent;
                    }
                });
            }
    
            // ?????????? ??????????????????
    
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
    
            // ?????????? ????????????????????
    
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
    
            // ???????????? ??????????
    
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
    
            // ???????????????????????? ???? ??????????????
    
            arrowPrev_.addEventListener('click', () => {
                slidePrev();
            });
    
            arrowNext_.addEventListener('click', () => {
                slideNext();
            });
    
            // ?????????? ?????????????? ??????-??????????????????
    
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

    // slider in sum

    function sliderSum (cards, window, field, prevButton, nextButton, activeClass, inActiveButton, sliderName, slideName) {
        const _cards = document.querySelectorAll(cards),
              _window = document.querySelector(window),
              _field = document.querySelector(field),
              _prevButton = document.querySelector(prevButton),
              _nextButton = document.querySelector(nextButton),
              _sliderName = document.querySelector(sliderName),
              _slideName = document.querySelectorAll(slideName);

        let counter = 0,
            startPoint,
            swipeAction,
            endPoint,
            opacity;

        function slideNameDynamic () {
            _slideName.forEach((item, index) => {
                if (index == counter) {
                    _sliderName.textContent = item.textContent;
                }
            });
        }

        function slideShow(prev = true) {
            clearActiveClass (_cards, activeClass)
            prev ? counter-- : counter++;
            _cards.forEach((item, index) => {
                if (index === counter) {
                    item.classList.add(activeClass)
                }
            });
            switch (counter) {
                case 0:
                    _prevButton.classList.add(inActiveButton);
                    break;
                case _cards.length - 1:
                    _nextButton.classList.add(inActiveButton);
                    break;
            
                default:
                    _prevButton.classList.remove(inActiveButton);
                    _nextButton.classList.remove(inActiveButton);
                    break;
            }
            slideNameDynamic ();
        }

        _prevButton.addEventListener('click', () => {
            if (counter === 0) {
                return
            } else {
                slideShow();
            }
        });
        _nextButton.addEventListener('click', () => {
            if (counter === _cards.length - 1) {
                return
            } else {
                slideShow(false);
            }
        });

        _window.addEventListener('touchstart', (e) => {
            startPoint = e.changedTouches[0].pageX;
        });

        _window.addEventListener('touchmove', (e) => {
            swipeAction = e.changedTouches[0].pageX - startPoint;
            opacity = 1 - Math.abs(swipeAction) * 0.003;
            _field.style.transform = `translateX(${swipeAction}px)`;
            _field.style.opacity = `${opacity < 0.65 ? 0.65 : opacity}`;
        });

        _window.addEventListener('touchend', (e) => {
            endPoint = e.changedTouches[0].pageX;
            _field.style.transform = 'none';
            _field.style.opacity = '1';
            if (Math.abs(startPoint - endPoint) > 70) {
                if (endPoint < startPoint) {
                    if (counter === _cards.length - 1) {
                        return
                    } else {
                        slideShow(false);
                    }
                } else {
                    if (counter === 0) {
                        return
                    } else {
                        slideShow();
                    }
                }
            }
        });
    }

    sliderSum('[data-sumSlide]', '[data-sumWindow]', '[data-sumField]', '[data-sumPrev]', '[data-sumNext]', 'active', 'inActive', '[data-sumSliderName]', '[data-sumSlideName]');

    
    // ?????????????? ?????? ??????????????

    function calcScroll() {
        let div = document.createElement('div');
        
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        
        document.body.appendChild(div);
        let scarollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        
        return scarollWidth;
    }

    let scrollWidth = calcScroll();

    function modal(modal, modalActiveClass, triggers, modalClose) {
        const triggers_ = document.querySelectorAll(triggers),
                modal_ = document.querySelector(modal),
                modalClose_ = document.querySelector(modalClose);

        if (triggers_.length > 0) {
            triggers_.forEach(item => {
                item.addEventListener('click', () => {
                    modal_.classList.add(modalActiveClass);
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scrollWidth}px`;
                });
            });

            modalClose_.addEventListener('click', () => {
                modal_.classList.remove(modalActiveClass);
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            });
    
            modal_.addEventListener('click', (e) => {
                if (e.target.classList.contains(modal.replace(/\./, ''))) {
                    modal_.classList.remove(modalActiveClass);
                    document.body.style.overflow = '';
                    document.body.style.marginRight = '0px';
                }
            });
        }
    }

    modal('.modal-main', 'modal--active', '[data-modal]', '.modal-main__close');

      //Scrolling with raf

    let links = document.querySelectorAll('[href^="#"]'),
    speed = 0.25;

    links.forEach(link => {
    link.addEventListener('click', function(event) {
    event.preventDefault();

    let widthTop = document.documentElement.scrollTop,
        hash = this.hash,
        toBlock =document.querySelector(hash).getBoundingClientRect().top,
        start = null;

    requestAnimationFrame(step);

    function step(time) {
        if (start === null) {
        start = time;
        }

        let progress = time - start,
            r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));

        document.documentElement.scrollTo(0, r);
        if (r != widthTop + toBlock) {
        requestAnimationFrame(step);
        } else {
        location.hash = hash;
        }
    }
    });
    });

    // ?????????? ?????? ?????? ??????????????

    function stringVision (string, quiz, footer, inActiveClass) {
        const _string = document.querySelector(string),
              _quiz = document.querySelector(quiz),
              _footer = document.querySelector(footer);

        document.addEventListener('scroll', () => {
            if (_quiz.getBoundingClientRect().top <= 500 && _quiz.getBoundingClientRect().top > -400 || _footer.getBoundingClientRect().top - document.documentElement.clientHeight <= 0) {
                _string.classList.add(inActiveClass);
            } else {
                _string.classList.remove(inActiveClass);
            }
        });

    }

    stringVision('.main__footer', '.quiz', '.footer', 'main__footer--inActive');

});