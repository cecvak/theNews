$('body').scrollspy({ target: '#navbarSupportedContent' })

Vue.use(VueLazyload, {
    // error: 'https://image.flaticon.com/icons/png/512/8/8798.png'
    // error: '../assets/images/no-image-icon.jpg'


})

const app = new Vue({
    el: '#vue-app1',
    data: {
        isActive: false,
        articles: [],

        numberOfResults: '',
        phrase: '',

        selected_category: '',
        categories: [
            { text: 'All', value: ''},
            { text: 'Business', value: 'business'},
            { text: 'Entertainment', value: 'entertainment'},
            { text: 'General', value: 'general'},
            { text: 'Health', value: 'health'},
            { text: 'Science', value: 'science'},
            { text: 'Sports', value: 'sports'},
            { text: 'Technology', value: 'technology'}
        ],
        selected_country: 'us',
        countries: [
            { text: 'All', value: ''},
            { text: 'United Arab Emirates', value: 'ae'},
            { text: 'Argentina', value: 'ar'},
            { text: 'Austria', value: 'at'},
            { text: 'Australia', value: 'au'},
            { text: 'Belgium', value: 'be'},
            { text: 'Bulgaria', value: 'bg'},
            { text: 'Brazil', value: 'br'},
            { text: 'Canada', value: 'ca'},
            { text: 'Switzerland', value: 'ch'},
            { text: 'People\'s Republic of China', value: 'cn'},
            { text: 'Colombia', value: 'co'},
            { text: 'Cuba', value: 'cu'},
            { text: 'Czech Republic', value: 'cz'},
            { text: 'Germany', value: 'de'},
            { text: 'Egypt', value: 'eg'},
            { text: 'France', value: 'fr'},
            { text: 'United Kingdom', value: 'gb'},
            { text: 'Greece', value: 'gr'},
            { text: 'Hong Kong', value: 'hk'},
            { text: 'Hungary', value: 'hu'},
            { text: 'Indonesia', value: 'id'},
            { text: 'Ireland', value: 'ie'},
            { text: 'Israel', value: 'il'},
            { text: 'India', value: 'in'},
            { text: 'Italy', value: 'it'},
            { text: 'Japan', value: 'jp'},
            { text: 'Korea, Republic of', value: 'kr'},
            { text: 'Lithuania', value: 'lt'},
            { text: 'Latvia', value: 'lv'},
            { text: 'Morocco', value: 'ma'},
            { text: 'Mexico', value: 'mx'},
            { text: 'Malaysia', value: 'my'},
            { text: 'Nigeria', value: 'ng'},
            { text: 'Netherlands', value: 'nl'},
            { text: 'Norway', value: 'no'},
            { text: 'New Zealand', value: 'nz'},
            { text: 'Philippines', value: 'ph'},
            { text: 'Poland', value: 'pl'},
            { text: 'Portugal', value: 'pt'},
            { text: 'Romania', value: 'ro'},
            { text: 'Serbia', value: 'rs'},
            { text: 'Russian Federation', value: 'ru'},
            { text: 'Sadui Arabia', value: 'sa'},
            { text: 'Sweden', value: 'se'},
            { text: 'Singapore', value: 'sg'},
            { text: 'Slovenia', value: 'si'},
            { text: 'Slovakia', value: 'sk'},
            { text: 'Thailand', value: 'th'},
            { text: 'Turkey', value: 'tr'},
            { text: 'Taiwan', value: 'tw'},
            { text: 'Ukraine', value: 'ua'},
            { text: 'United States', value: 'us'},
            { text: 'Venezuela', value: 've'},
            { text: 'South Africa', value: 'za'},
        ],

    },
    computed: {

        updateArray: function() {
            return this.articles.map( (a) => {
                let updated = {};
                updated.title = a.title;
                updated.author = a.author;
                if (a.source.name.startsWith("Www")) {
                    updated.source = a.source.name.replace('W', 'w');
                }
                    else (updated.source = a.source.name);
                updated.descr = a.description;
                updated.url = a.url;

                if (a.urlToImage == null) {
                    // updated.image = 'https://image.flaticon.com/icons/png/512/8/8798.png';
                    updated.image = '../assets/images/no-image-icon.jpg';
                }
                else {
                    updated.image = a.urlToImage;
                }
                
                updated.date = a.publishedAt.replace(/T|Z/g,' ');
                let newDate = moment.utc(updated.date).format('YYYY-MM-DD HH:mm:ss');
                let newDateUtc = moment.utc(newDate).toDate();
                let localDate = moment(newDateUtc).local().format('YYYY-MM-DD HH:mm:ss');
                updated.date = localDate;
                return updated;
            })
        },
        sortedCountries: function() {
            function compare(a, b) {
                if (a.text < b.text)
                    return -1;
                if (a.text > b.text)
                    return 1;
                return 0;
            }
            return this.countries.sort(compare)
        
        },
    },
    methods: {
        filter() {
            let searchPhrase = this.phrase;
            let filterCategory = this.selected_category;
            let filterCountry = this.selected_country;

            fetch ('https://newsapi.org/v2/top-headlines?q=' +searchPhrase 
                                                            +'&category=' +filterCategory 
                                                            +'&country=' +filterCountry
                                                            +'&pageSize=20'
                                                            +'&apiKey=50dce6ab2c4f473d968a3208f0ec52ca')
            .then(response =>  response.json())
            .then(searchResp => {
                if (searchResp.code == "parametersMissing") {
                    // alert('Please enter a search phrase, or a category/country to search.');
                    this.isActive = true;
                }
                else {
                    this.articles = searchResp.articles;
                    this.numberOfResults = searchResp.totalResults;
                    this.isActive = false;
                }  
                    })
        },
        errorImage(event) {
            // event.target.src = 'https://image.flaticon.com/icons/png/512/8/8798.png'
            event.target.src = '../assets/images/no-image-icon.jpg';

        },
    },

    mounted: function() {
        this.filter();
        // fetch('http://newsapi.org/v2/top-headlines?' +
        // 'country=' +this.selected_country
        // +'&pageSize=20'
        // +'&apiKey=50dce6ab2c4f473d968a3208f0ec52ca')
        // .then(response => response.json())
        // .then(articlesResp => {
        //     this.articles = articlesResp.articles;
        // })
    },

})
