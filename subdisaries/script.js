window.addEventListener("DOMContentLoaded", () => {
    let SCROLL_LIMIT = 10;
    let navHomeBtn = document.getElementById("nav-home-btn");
    let navStatsBtn = document.getElementById("nav-stats-btn");
    let worldsBtn = document.getElementsByClassName("world");
    let paginator = document.getElementsByClassName("paginator")[0]
    let worldSection = document.getElementsByClassName("world-section__grid-container")[0]

    updateNavbarOpacity();
    updateScrollGradient();
    window.addEventListener("scroll", () => {
        updateNavbarOpacity();
        updateScrollGradient();
    })

    // These will only exist on the worlds tab.
    if (worldSection && paginator) {
        updatePaginatorOpacity();
        window.addEventListener("scroll", () => {
            updatePaginatorOpacity();
        })
    }
    
    function updateScrollGradient() {
        let bg = document.getElementsByClassName("bg");
        let degree = "107.56deg";
        let horizontalPercentage = 37.98;
        let verticalPercentage = 87.98;
        let st = document.documentElement.scrollTop || window.pageYOffset;
        Array.from(bg).forEach((e) => {
            let multiplier = (st/100) * 4;
            horizontalPercentage = 37.98 + multiplier ;
            verticalPercentage = 87.98  + multiplier;
            let gradient = "background-image:" + 'linear-gradient(' + degree +', rgba(0,0,0,0.87),' 
            + horizontalPercentage + '%, rgba(0,0,0,0) ' 
            + verticalPercentage  + "%), url('');" ;
            e.style = gradient;
        });
    }

    function updatePaginatorOpacity() {
        if (worldsSectionOverlapsPaginator()) {
            Array.from(document.getElementsByClassName("paginator__page")).forEach((e) => {
                if (e.classList.contains("paginator__page--current") || e.classList.contains("paginator__page--current-overlapped")) {
                    e.classList.remove("paginator__page--current")
                    e.classList.add("paginator__page--current-overlapped")
                } else {
                    e.classList.add("paginator__page--overlapped")
                }
            })
        } else {
            Array.from(document.getElementsByClassName("paginator__page")).forEach((e) => {
                if (e.classList.contains("paginator__page--current-overlapped")) {
                    e.classList.remove("paginator__page--current-overlapped")
                    e.classList.add("paginator__page--current")
                } {
                    e.classList.remove("paginator__page--overlapped")
                }
            })
        }
    }

    // adapted from https://stackoverflow.com/a/12067046
    function worldsSectionOverlapsPaginator() {
        let worldSectionRect = worldSection.getBoundingClientRect()
        let paginatorRect = paginator.getBoundingClientRect()
        // Because getBoundingClientRect() returns a value based off the padding and the border, we need to subtract the padding from bottom height
        let paddingSize = parseInt(window.getComputedStyle(worldSection, null).getPropertyValue('padding-bottom'))
        let offset = 20
        return !(
            paginatorRect.bottom < worldSectionRect.top || 
            paginatorRect.top > (worldSectionRect.bottom - paddingSize - offset))
    }

    function updateNavbarOpacity() {
        isScrolled = document.body.scrollTop > SCROLL_LIMIT || document.documentElement.scrollTop > SCROLL_LIMIT
        if (isScrolled) {
            document.getElementById("navbar").classList.add("scrolled")
        } else {
            document.getElementById("navbar").classList.remove("scrolled")
        }
    }

    Array.from(worldsBtn).forEach(e => {
        e.addEventListener("mouseenter", (e) => {
            e.target.children[0].classList.remove("world__play-overlay-hover--disabled")
            e.target.children[0].classList.add("world__play-overlay-hover--active")
        })
        e.addEventListener("mouseleave", (e) => {
            e.target.children[0].classList.remove("world__play-overlay-hover--active")
            e.target.children[0].classList.add("world__play-overlay-hover--disabled")
        })
    });

    navHomeBtn.addEventListener("click", (e) => {
        let statsSection = document.getElementById("stats");
        if (statsSection != null) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
    });

    navStatsBtn.addEventListener("click", (e) => {
        let statsSection = document.getElementById("stats");
        if (statsSection != null) {
            e.preventDefault();
            statsSection.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest"
            })
        }
    });
})

// Overrides the default scroll to anchor behavior.
// We use "load" isntead of "DOMContentLoaded" since it runs
// after the browser finishes scrolling to the anchor.
window.addEventListener("load", () => {
    if (window.location.hash == '#stats') {
        let statsSection = document.getElementById("stats");
        statsSection.scrollIntoView({
            block: "center",
            inline: "nearest"
        })
    }
})
