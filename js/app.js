/* ======= Model ======= */
var model = {
    currentCat: null,
    isAdmin: false,
    cats: [
        {
            clickCount: 0,
            name: "Bruce",
            imgSrc: "img/bruce.jpg"
        },
        {
            clickCount: 0,
            name: "Furball",
            imgSrc: "img/furball.jpg"
        },
        {
            clickCount: 0,
            name: "Jamie",
            imgSrc: "img/jamie.jpg"
        },
        {
            clickCount: 0,
            name: "Jetske",
            imgSrc: "img/jetske.jpg"
        },
        {
            clickCount: 0,
            name: "Winston",
            imgSrc: "img/winston.jpg"
        }
    ]
};


/* ======= Controller ======= */
var controller = {
    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },

    // get isAdmin
    getIsAdmin: function() {
        return model.isAdmin;
    },

    // set isAdmin
    setIsAdmin: function() {
        model.isAdmin = true;
        catView.render();
    },

    // update cat data
    updateCat: function() {
        // extract values from inputs
        var name = $('#cat-name-input').val();
        var url = $('#cat-img-url-input').val();
        var clickCount = $('#cat-clicks-input').val();

        // update the currentCat data
        model.currentCat.name = name;
        model.currentCat.imgSrc = url;
        model.currentCat.clickCount = clickCount;

        // remove admin status from user
        model.isAdmin = false;

        // render views to show cat data updates
        catListView.render();
        catView.render();
    }
};


/* ======= Views ======= */
var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById("cat");
        this.catNameElem = document.getElementById("cat-name");
        this.catImageElem = document.getElementById("cat-img");
        this.countElem = document.getElementById("cat-count");
        this.catNameInputElem = document.getElementById("cat-name-input");
        this.catImgUrlInputElem = document.getElementById("cat-img-url-input");
        this.catClicksInputElem = document.getElementById("cat-clicks-input");
        this.adminBtn = document.getElementById("admin-btn");
        this.catEdit = document.getElementById("cat-edit");
        this.saveElem = document.getElementById("save");

        
        // on click, increment the current cat's counter
        this.catImageElem.addEventListener("click", function(){
            controller.incrementCounter();
        });


        // when admin button is clicked set isAdmin to true
        this.adminBtn.addEventListener("click", function(){
            controller.setIsAdmin();
        });


        // when save button is clicked update the cat data
        this.saveElem.addEventListener("click", function(){
            controller.updateCat();
        });


        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = controller.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
        this.catNameInputElem.value = currentCat.name;
        this.catImgUrlInputElem.value = currentCat.imgSrc;
        this.catClicksInputElem.value = currentCat.clickCount;

        // if user is not admin hide the cat-edit element
        if(model.isAdmin == false) {
            $("#cat-edit").hide();
        }

        // if user is not admin show the cat-edit element
        if(model.isAdmin == true) {
            $("#cat-edit").show();
        }
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById("cat-list");

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we"ll be rendering from the controller
        var cats = controller.getCats();

        // empty the cat list
        this.catListElem.innerHTML = "";

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we"re currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement("li");
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener("click", (function(catCopy) {
                return function() {
                    controller.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// Make it go
controller.init();