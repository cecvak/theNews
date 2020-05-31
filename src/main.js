const app = new Vue({
    el: '#vue-app1',
    data: {
        articles: [],
        // article2: [],

        numberOfResults: '',
        phrase: '',

        // selected_categories: [],

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
        // selected_language: '',
        // languages: [
        //     { text: 'All', value: ''},
        //     { text: 'Arabic' , value: 'ar'},
        //     { text: 'German', value: 'de' },
        //     { text: 'English', value: 'en'},
        //     { text: 'Spanish', value: 'es'},
        //     { text: 'French', value: 'fr' },
        //     { text: 'Hebrew', value: 'he' },
        //     { text: 'Italian', value: 'it' },
        //     { text: 'Dutch', value: 'nl' },
        //     { text: 'Norwegian', value: 'no' },
        //     { text: 'Portuguese', value: 'pt' },
        //     { text: 'Russian', value: 'ru' },
        //     { text: 'Swedish', value: 'se' },
        //     { text: 'Urdu', value: 'ud' },
        //     { text: 'Chinese', value: 'zh' },
        // ]
    },
    computed: {
        updateArray: function() {
            // return this.articles.slice(0).reverse();
            // return this.articles.publishedAt.slice(0).reverse();
            return this.articles.map( (a) => {
                // a.changeDate = this.articles.publishedAt.replace('T', '');
                // return a
                let updated = {};
                updated.title = a.title;
                updated.author = a.author;
                // updated.source = a.source.name;
                if (a.source.name.startsWith("Www")) {
                    updated.source = a.source.name.replace('W', 'w');
                }
                    else (updated.source = a.source.name);
                updated.descr = a.description;
                updated.url = a.url;

                if (a.urlToImage == null) {
                    updated.image = 'https://image.flaticon.com/icons/png/512/8/8798.png';
                }
                else {
                    updated.image = a.urlToImage;
                }
                
                updated.date = a.publishedAt.replace(/T|Z/g,' ');
                // console.log(updated.date);
                let newDate = moment.utc(updated.date).format('YYYY-MM-DD HH:mm:ss');
                // console.log(newDate);
                let newDateUtc = moment.utc(newDate).toDate();
                // console.log(newDateUtc);
                let localDate = moment(newDateUtc).local().format('YYYY-MM-DD HH:mm:ss');
                // console.log(localDate);
                updated.date = localDate;
                return updated;
            })

            
            // return this.articles.publishedAt.replace('T, Z', '');
        },
    },
    methods: {
        filter() {
                        // console.log(this.phrase)
                        // console.log(this.selected_categories)
                        let searchPhrase = this.phrase;
                        // let searchCategory = this.selected_categories.toString();
                        // console.log(this.selected_categories)
                        let filterCategory = this.selected_category;
                        let filterCountry = this.selected_country;
                        // let filterLang = this.selected_language;
                        // for (item of this.selected_categories) {
                        //     searchCategory = item + ',';
                        // }
                        console.log(searchPhrase)
                        // console.log(searchCategory)
                        


                        fetch ('https://newsapi.org/v2/top-headlines?q=' +searchPhrase 
                                                                        +'&category=' +filterCategory 
                                                                        +'&country=' +filterCountry
                                                                        // +'&pageSize=30'
                                                                        // +'&page=2'
                                                                        // +'&language=' +filterLang
                                                                        +'&apiKey=50dce6ab2c4f473d968a3208f0ec52ca')
                        .then(response =>  response.json())
                        .then(searchResp => {
                            if (searchResp.code == "parametersMissing") {
                                alert('Please enter a search phrase, or a category/country to search.');
                            }
                            else {
                                this.articles = searchResp.articles;
                                this.numberOfResults = searchResp.totalResults;
                                // console.log(this.articles);
                            }
                       
                    })
                    },
        errorImage(event) {
            // this.articles.urlToImage = '/../assets/images/news_logo.png';
            // this.changeDate.image = 'https://www.freepik.com/free-icon/error-advice-triangle-with-exclamation-mark_703014.htm#page=1&query=error&position=35';
            // this.changeDate.image = 'https://image.flaticon.com/icons/png/512/8/8798.png';
            event.target.src = 'https://image.flaticon.com/icons/png/512/8/8798.png'
            // event.target.src = '/../assets/images/news_logo.png';
            // let image;
            // image.src = '/../assets/images/news_logo.png';
            // articles.urlToImage = image;
        }         

    },
    mounted: function() {
        // let firstCountry = 'us';
        // this.selected_country = 'us';
        // this.selected_category = '';
        // let firstCountry = this.selected_country;
        fetch('http://newsapi.org/v2/top-headlines?' +
        'country=' +this.selected_country
        +'&apiKey=50dce6ab2c4f473d968a3208f0ec52ca')
        .then(response => response.json())
        // .then(json => console.log(json))
        .then(articlesResp => {
            // var vm = this;
            // vm.data.articles = articlesResp;
            this.articles = articlesResp.articles;
            
            // console.log(this.articles);
            // console.log(typeof this.articles)
        })
    },

})


// https://newsapi.org/v2/everything?q=bitcoin&apiKey=50dce6ab2c4f473d968a3208f0ec52ca